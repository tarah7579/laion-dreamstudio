/* eslint-disable */
import { grpc } from '@improbable-eng/grpc-web'
import { GenerationService } from '@/stability/js/generation_pb_service'
import {
  Request,
  Prompt,
  ImageParameters,
  SamplerParameters,
  TransformType,
  StepParameter,
  ClassifierParameters,
  Answer,
  ArtifactType,
} from '@/stability/js/generation_pb'
import uuid4 from 'uuid4'
import mime from 'mime'
import { EventEmitter } from 'events'
import TypedEmitter from 'typed-emitter'

import { diffusionMap, range } from './utils'

type DraftStabilityOptions = Partial<{
  debug: boolean
  requestId: string
  samples: number
  engine: 'stable-diffusion-v1'
  host: string
  seed: number
  width: number
  height: number
  diffusion: keyof typeof diffusionMap
  steps: number
  cfgScale: number
}>

type RequiredStabilityOptions = {
  apiKey: string
  prompt: string
}

type StabilityOptions = RequiredStabilityOptions &
  Required<DraftStabilityOptions>

type StabilityApi = TypedEmitter<{
  image: (data: { binary: string | Uint8Array }) => void
  end: (data: {
    isOk: boolean
    status: keyof grpc.Code
    code: grpc.Code
    message: string
    trailers: grpc.Metadata
  }) => void
}>

const withDefaults: (
  draftOptions: DraftStabilityOptions & RequiredStabilityOptions
) => StabilityOptions = (draft) => {
  if (!draft.prompt) throw new Error('Prompt is required')

  const requestId = draft.requestId ?? uuid4()
  return {
    ...draft,
    host: draft.host ?? 'https://grpc.stability.ai:443',
    engine: draft.engine ?? 'stable-diffusion-v1',
    requestId,
    seed: draft.seed ?? range(0, 4294967295),
    width: draft.width ?? 512,
    height: draft.height ?? 512,
    diffusion: draft.diffusion ?? 'k_lms',
    steps: draft.steps ?? 50,
    cfgScale: draft.cfgScale ?? 7,
    samples: draft.samples ?? 1,
    debug: Boolean(draft.debug),
  }
}

export const generate: (
  opts: DraftStabilityOptions & RequiredStabilityOptions
) => StabilityApi = (opts) => {
  const {
    host,
    engine,
    requestId,
    seed,
    width,
    height,
    diffusion,
    steps,
    cfgScale,
    samples,
    prompt: promptText,
    apiKey,
    debug,
  } = withDefaults(opts)

  if (!promptText) throw new Error('Prompt text is required')

  const api = new EventEmitter() as StabilityApi

  /** Build Request **/
  const request = new Request()
  request.setEngineId(engine)
  request.setRequestId(requestId)

  const prompt = new Prompt()
  prompt.setText(promptText)
  request.addPrompt(prompt)

  const image = new ImageParameters()
  image.setWidth(width)
  image.setHeight(height)
  image.setSeedList([seed])
  image.setSteps(steps)
  image.setSamples(samples)

  const transform = new TransformType()
  transform.setDiffusion(diffusionMap[diffusion])
  image.setTransform(transform)

  const step = new StepParameter()
  step.setScaledStep(0)

  const sampler = new SamplerParameters()
  sampler.setCfgScale(cfgScale)
  step.setSampler(sampler)

  image.addParameters(step)

  request.setImage(image)

  const classifier = new ClassifierParameters()
  request.setClassifier(classifier)
  /** End Build Request **/

  if (debug) {
    console.log(
      '[stability - request]',
      JSON.stringify(request.toObject(), null, 2)
    )
  }

  grpc.invoke(GenerationService.Generate, {
    request,
    host,
    metadata: new grpc.Metadata({ Authorization: `Bearer ${apiKey}` }),

    onEnd: (code, message, trailers) => {
      api.emit('end', {
        isOk: code === grpc.Code.OK,
        status: grpc.Code[code] as keyof grpc.Code,
        code,
        message,
        trailers,
      })
    },
    onMessage: (message: Answer) => {
      const answer = message.toObject()

      if (answer.artifactsList) {
        answer.artifactsList.forEach(
          ({ id, type, mime: mimeType, binary, seed: innerSeed }) => {
            if (type === ArtifactType.ARTIFACT_IMAGE) {
              api.emit('image', {
                binary
              })
            }
          }
        )
      }
    },
    debug,
  })

  return api
}