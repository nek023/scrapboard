/* eslint-disable @typescript-eslint/no-var-requires */
const CopyPlugin = require('copy-webpack-plugin')
const path = require('path')

const baseConfig = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  node: {
    __dirname: false,
    __filename: false,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new CopyPlugin({
      patterns: ['public'],
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}

const mainConfig = {
  ...baseConfig,
  target: 'electron-main',
  entry: {
    main: './src/main/index.ts',
  },
}

const rendererConfig = {
  ...baseConfig,
  target: 'electron-renderer',
  entry: {
    renderer: './src/renderer/index.tsx',
  },
}

module.exports = [mainConfig, rendererConfig]
