'use client'

import { useEffect } from 'react'

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
  useEffect(() => {
    // Load Tenor's embed script if it hasn't been loaded yet
    if (!document.querySelector('script[src*="tenor.com/embed.js"]')) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.src = 'https://tenor.com/embed.js'
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className={className}>
      <div 
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
