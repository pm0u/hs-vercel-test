declare global {
  interface TailwindColorObject {
    [key?: number]: string
    DEFAULT: string
  }

  interface PartialTailwindColorObject {
    [key?: number]: string
    DEFAULT?: string
  }
}

export {}
