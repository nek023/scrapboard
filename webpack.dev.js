/* eslint-disable @typescript-eslint/no-var-requires */
const [mainConfig, rendererConfig] = require('./webpack.common.js')

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
}

module.exports = [
  {
    ...mainConfig,
    ...devConfig,
  },
  {
    ...rendererConfig,
    ...devConfig,
  },
]
