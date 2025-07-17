'use client'

import { useEffect, useRef } from 'react'

// Extend Window interface to include TenorEmbed
declare global {
  interface Window {
    TenorEmbed?: {
      init: () => void
    }
  }
}

interface TenorGifEmbedProps {
  postId: string
  aspectRatio?: string
  width?: string
  className?: string
}

export default function TenorGifEmbed({ 
  postId, 
  aspectRatio = "1", 
  width = "100%",
  className = "" 
}: TenorGifEmbedProps) {
  const embedRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Tenor's embed script if it hasn't been loaded yet
    const loadTenorScript = () => {
      return new Promise<void>((resolve) => {
        if (window.TenorEmbed) {
          resolve()
          return
        }

        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.async = true
        script.src = 'https://tenor.com/embed.js'
        script.onload = () => resolve()
        document.head.appendChild(script)
      })
    }

    loadTenorScript().then(() => {
      // Initialize Tenor embed after script loads
      if (window.TenorEmbed && embedRef.current) {
        window.TenorEmbed.init()
      }
    })
  }, [])

  return (
    <div className={className}>
      <div 
        ref={embedRef}
        className="tenor-gif-embed" 
        data-postid={postId}
        data-share-method="host" 
        data-aspect-ratio={aspectRatio}
        data-width={width}
      >
        <a href={`https://tenor.com/view/gif-${postId}`}>
          View GIF
        </a>
      </div>
    </div>
  )
}