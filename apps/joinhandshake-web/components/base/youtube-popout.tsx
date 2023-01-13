import React, { useEffect, useState } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import { Transition, Dialog } from "@headlessui/react"

interface YoutubePopoutProps extends YouTubeProps {
  /** Content to display in trigger */
  children: React.ReactNode
  /** Mount opened or externally control open state */
  open: boolean
  /**
   * Options for YT player. Defaults to autoplay in playerVars
   * @see https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
   */
  opts: YouTubeProps["opts"]
}

export const YoutubePopout = ({
  children,
  open = false,
  opts = { playerVars: { autoplay: 1 } },
  ...youtubeProps
}: YoutubePopoutProps) => {
  const [openState, setOpenState] = useState(open)

  useEffect(() => {
    setOpenState(open)
  }, [open])

  return (
    <>
      <button onClick={() => setOpenState(true)}>{children}</button>
      <Transition
        show={openState}
        enter="transition-opacity"
        enterFrom="opacity-0"
        leave="transition-opacity"
        leaveTo="opacity-0"
      >
        <button
          type="button"
          className="fixed top-0 bottom-0 left-0 right-0 z-20 w-full bg-neutral-100 opacity-80"
        >
          close video
        </button>
        <Dialog
          onClose={() => setOpenState(false)}
          className="fixed top-1/2 left-1/2 z-30 w-[130vh] max-w-[90%] -translate-y-1/2 -translate-x-1/2"
        >
          <YouTube
            {...youtubeProps}
            opts={opts}
            iframeClassName="w-full aspect-video h-auto mx-auto"
          />
          <button
            type="button"
            className="mx-auto mt-6 block h-8 w-8"
            onClick={() => setOpenState(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              id="Layer_1"
              viewBox="0 0 32 32"
            >
              <title>CLOSE</title>
              <path
                fill="#fff"
                id="Path"
                d="M31.6,28.9c0.5,0.5,0.5,1.3,0,1.7l-1,1c-0.5,0.5-1.3,0.5-1.7,0L0.4,3.1c-0.5-0.5-0.5-1.3,0-1.7l1-1  c0.5-0.5,1.3-0.5,1.7,0L31.6,28.9z"
              />
              <path
                fill="#fff"
                id="Path_1_"
                d="M3.1,31.6c-0.5,0.5-1.3,0.5-1.7,0l-1-1c-0.5-0.5-0.5-1.3,0-1.7L28.9,0.4c0.5-0.5,1.3-0.5,1.7,0  l1,1c0.5,0.5,0.5,1.3,0,1.7L3.1,31.6z"
              />
            </svg>
          </button>
        </Dialog>
      </Transition>
    </>
  )
}
