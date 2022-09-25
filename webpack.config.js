const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: [
        'stability-sdk/src/js/generation_pb_service',
        'stability-sdk/src/js/generation_pb',
      ],
    }),
  ],

}