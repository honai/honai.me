/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = withTypescript({
  env: {
    CTF_SPACE_ID: '7q1ibtbymdj9',
    CTF_ACCESSTOKEN: '751eaa5a3ed1043c5b017aa036a0819b25148a73bb1c9121d70058c98e53c2f7'
  },
  webpack(config, options) {
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
    return config
  },
  target: 'serverless'
})
