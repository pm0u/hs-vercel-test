import React from "react"
import resolveConfig from "tailwindcss/resolveConfig"
import { Config } from "tailwindcss"

interface ThemeProviderProps {
  children: React.ReactNode
  config: Config
}

// We can build this as needed, if it is helpful..
export interface ThemeConfig {
  theme: {
    screens: Record<string, string>
    // Custom
    [key: string]: any
  }
}

const ThemeContext = React.createContext<{ theme: ThemeConfig } | undefined>(
  undefined
)

const ThemeProvider = ({ children, config }: ThemeProviderProps) => {
  const parsedConfig = resolveConfig(config) as unknown as ThemeConfig

  return (
    <ThemeContext.Provider value={{ theme: parsedConfig }}>
      {children}
    </ThemeContext.Provider>
  )
}

const useTheme = () => {
  const context = React.useContext(ThemeContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider!")
  }
  return context
}

export { ThemeProvider, useTheme }
