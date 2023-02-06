import { useEffect, useState } from "react"

const useClock = () => {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const timeUpdate = setInterval(() => {
      setTime(new Date().toLocaleTimeString())
    }, 500)

    return () => {
      clearInterval(timeUpdate)
    }
  }, [])

  return { time }
}

export { useClock }
