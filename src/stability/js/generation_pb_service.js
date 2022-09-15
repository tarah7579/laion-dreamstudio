// package: gooseai
// file: generation.proto

const generation_pb = require("./generation_pb");
const grpc = require("@improbable-eng/grpc-web").grpc;

const GenerationService = (function () {
  // eslint-disable-next-line
  function GenerationService() {}
  GenerationService.serviceName = "gooseai.GenerationService";
  return GenerationService;
}());

GenerationService.Generate = {
  methodName: "Generate",
  service: GenerationService,
  requestStream: false,
  responseStream: true,
  requestType: generation_pb.Request,
  responseType: generation_pb.Answer
};

exports.GenerationService = GenerationService;

function GenerationServiceClient(serviceHost, options) {
  this.serviceHost = serviceHost;
  this.options = options || {};
}

GenerationServiceClient.prototype.generate = function generate(requestMessage, metadata) {
  let listeners = {
    data: [],
    end: [],
    status: []
  };
  const client = grpc.invoke(GenerationService.Generate, {
    request: requestMessage,
    host: this.serviceHost,
    metadata: metadata,
    transport: this.options.transport,
    debug: this.options.debug,
    onMessage: function (responseMessage) {
      listeners.data.forEach(function (handler) {
        handler(responseMessage);
      });
    },
    onEnd: function (status, statusMessage, trailers) {
      listeners.status.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners.end.forEach(function (handler) {
        handler({ code: status, details: statusMessage, metadata: trailers });
      });
      listeners = null;
    }
  });
  return {
    on: function (type, handler) {
      listeners[type].push(handler);
      return this;
    },
    cancel: function () {
      listeners = null;
      client.close();
    }
  };
};

exports.GenerationServiceClient = GenerationServiceClient;
