declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly CTF_SPACE_ID: string
    readonly CTF_ACCESSTOKEN: string
  }
}
