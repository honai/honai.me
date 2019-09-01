/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require('@zeit/next-typescript')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')

module.exports = withTypescript({
  env: {
    CTF_SPACE_ID: process.env.CTF_SPACE_ID,
    CTF_ACCESSTOKEN: process.env.CTF_ACCESSTOKEN,
    GA_TRACKING_ID: 'UA-137251140-2'
  },
  webpack(config, options) {
    if (options.isServer) config.plugins.push(new ForkTsCheckerWebpackPlugin())
    return config
  },
  target: 'serverless'
})
