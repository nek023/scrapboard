/* eslint-disable @typescript-eslint/no-var-requires */
const [mainConfig, rendererConfig] = require('./webpack.common.js')

const prodConfig = {
  mode: 'production',
}

module.exports = [
  {
    ...mainConfig,
    ...prodConfig,
  },
  {
    ...rendererConfig,
    ...prodConfig,
  },
]
