'use client'

import TenorGifEmbed from './TenorGifEmbed'

export default function BottomGifGallery() {
  const bottomGifs = [
    "12000056830083809658", // milk-mocha-milk-and-mocha-bear-popcorn
    "2456354674379385637",  // かみ太
    "12001693143160973743", // cat-eating-cat-noodle-noodle-cat
    "5502216684355563408"   // thiqng14
  ]

  return (
    <div className="mt-16 mb-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-700 mb-2">
          🎬 Cute Cooking Moments 🎬
        </h3>
        <p className="text-slate-600">Some adorable cooking friends to brighten your day!</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        {bottomGifs.map((gifId, index) => (
          <div key={gifId} className="text-center">
            <TenorGifEmbed 
              postId={gifId}
              aspectRatio="1"
              width="100%"
              className="rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  )
}