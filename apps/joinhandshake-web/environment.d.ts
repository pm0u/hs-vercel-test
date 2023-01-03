// declare ENV variables here

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_PROJECT_ID: string
    }
  }
}

export {}
