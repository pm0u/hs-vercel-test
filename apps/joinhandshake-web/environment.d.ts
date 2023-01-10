// declare ENV variables here

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SANITY_PROJECT_ID: string
      __NEXT_IMAGE_OPTS: {
        deviceSizes: number[]
        domains: any[]
        imageSizes: number[]
        loader: string | function
        remotePatterns: object[]
        unoptimized: boolean
        dangerouslyAllowSVG: boolean
      }
    }
  }
}

export {}
