import React, { useEffect, useState } from "react"
import YouTube, { YouTubeProps } from "react-youtube"
import { Transition, Dialog } from "@headlessui/react"

interface YoutubePopoutProps extends YouTubeProps {
  /** Content to display in trigger */
  children: React.ReactNode
  /** Mount opened or externally control open state */
  open?: boolean
  /**
   * Options for YT player. Defaults to autoplay in playerVars
   * @see https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
   */
  opts?: YouTubeProps["opts"]
  /** Classes applied to trigger button wrapper */
  className?: string
  /** Override default play button icon (or provide null) */
  playIcon?: React.ReactNode | null
  /** Function run when dialog opens. Will be run every time */
  onModalOpen?: () => void
}

const defaultPlayButton = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 85 85"
    version="1.1"
    className="absolute top-1/2 left-1/2 h-legacy-20 w-legacy-20 -translate-x-1/2 -translate-y-1/2"
  >
    <title>Play</title>
    <g
      id="Designs"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g transform="translate(-1187.000000, -4238.000000)">
        <g
          id="Button-/-Play-Button"
          transform="translate(1187.000000, 4238.000000)"
        >
          <g id="Group-3">
            <circle id="Oval" fill="#FFFFFF" cx="42.5" cy="42.5" r="42.5" />
            <polygon
              id="Path-5"
              fill="#FB3325"
              transform="translate(48.000000, 43.500000) rotate(-270.000000) translate(-48.000000, -43.500000) "
              points="33 56.5 63 56.5 48 30.5"
            />
          </g>
        </g>
      </g>
    </g>
  </svg>
)

export const YoutubePopout = ({
  children,
  open = false,
  className = "",
  playIcon = defaultPlayButton,
  opts = { playerVars: { autoplay: 1 } },
  onModalOpen,
  ...youtubeProps
}: YoutubePopoutProps) => {
  const [openState, setOpenState] = useState(open)

  useEffect(() => {
    setOpenState(open)
    if (open && typeof onModalOpen === "function") {
      onModalOpen()
    }
  }, [open, onModalOpen])

  useEffect(() => {
    if (openState && typeof onModalOpen === "function") {
      onModalOpen()
    }
  }, [openState, onModalOpen])

  return (
    <>
      <button
        onClick={() => setOpenState(true)}
        className={`relative ${className}`}
      >
        {children}
        {playIcon}
      </button>
      <Transition
        show={openState}
        enter="transition-opacity"
        enterFrom="opacity-0"
        leave="transition-opacity"
        leaveTo="opacity-0"
      >
        <Dialog
          onClose={() => setOpenState(false)}
          className="fixed top-1/2 left-1/2 z-30 w-[130vh] max-w-[90%] -translate-y-1/2 -translate-x-1/2"
        >
          <button
            type="button"
            className="fixed top-1/2 left-1/2 h-screen w-screen -translate-y-1/2 -translate-x-1/2 bg-neutral-100 opacity-80"
            onClick={() => setOpenState(false)}
          >
            close video
          </button>
          <YouTube
            {...youtubeProps}
            opts={opts}
            iframeClassName="w-full aspect-video h-auto mx-auto z-10 relative"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 32 32"
            className="relative z-10 mx-auto mt-legacy-6 block h-legacy-8 w-legacy-8 cursor-pointer"
            onClick={() => setOpenState(false)}
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
        </Dialog>
      </Transition>
    </>
  )
}
