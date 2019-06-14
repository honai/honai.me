/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = withTypescript({
  env: {
    CTF_SPACE_ID: '7q1ibtbymdj9',
    CTF_ACCESSTOKEN: process.env.CTF_ACCESSTOKEN
  },
  webpack(config, options) {
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
    return config
  },
  target: 'serverless'
})
