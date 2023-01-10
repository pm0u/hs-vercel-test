import React from "react"
import resolveConfig from "tailwindcss/resolveConfig"
import { Config } from "tailwindcss"

interface ThemeProviderProps {
  children: React.ReactNode
  config: Config
}

const ThemeContext = React.createContext<{ theme: Config } | undefined>(
  undefined
)

const ThemeProvider = ({ children, config }: ThemeProviderProps) => {
  const parsedConfig = resolveConfig(config)

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
