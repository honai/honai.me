/* eslint-disable @typescript-eslint/no-var-requires */
const contentfulSdk = require('contentful')
const contentful = contentfulSdk.createClient({
  space: process.env.CTF_SPACE_ID,
  accessToken: process.env.CTF_ACCESSTOKEN
})

export default contentful
