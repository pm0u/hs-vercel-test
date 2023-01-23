import { useEffect, useState } from "react"

export const useUrl = () => {
  const [url, setUrl] = useState("")

  // useEffects only ever run client side so this will always be defined when run
  useEffect(() => {
    setUrl(window.location.origin + window.location.pathname)
  }, [])

  return {
    url,
  }
}
