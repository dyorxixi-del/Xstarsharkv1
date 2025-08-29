"use client"

import { Card } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { sharkNFTs, getRarityColor } from "@/lib/nft-data"
import Image from "next/image"

export function NFTPreview() {
  const [currentShark, setCurrentShark] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShark((prev) => (prev + 1) % sharkNFTs.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const displaySharks = [sharkNFTs[0], sharkNFTs[1], sharkNFTs[2]]

  return (
    <div className="flex justify-center items-center mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        {/* Card 1 */}
        <Card className="bg-gray-900/50 border-gray-700 p-0 overflow-hidden transform hover:scale-105 transition-transform">
          <div className="aspect-square flex flex-col items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-2 border-2 border-gray-600">
              <Image
                src={displaySharks[0].image || "/placeholder.svg"}
                alt={displaySharks[0].name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white font-bold text-sm">{displaySharks[0].name}</div>
            <div className={`text-xs ${getRarityColor(displaySharks[0].rarity).split(" ")[0]}`}>
              {displaySharks[0].rarity}
            </div>
          </div>
        </Card>

        {/* Card 2 - Center/Featured with rotation */}
        <Card className="bg-gray-900/50 border-gray-700 p-0 overflow-hidden transform hover:scale-105 transition-all duration-500 scale-110">
          <div className="aspect-square flex flex-col items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-2 border-2 border-yellow-400">
              <Image
                src={sharkNFTs[currentShark].image || "/placeholder.svg"}
                alt={sharkNFTs[currentShark].name}
                width={128}
                height={128}
                className="w-full h-full object-cover animate-pulse"
              />
            </div>
            <div className="text-white font-bold text-sm">{sharkNFTs[currentShark].name}</div>
            <div className={`text-xs ${getRarityColor(sharkNFTs[currentShark].rarity).split(" ")[0]}`}>
              {sharkNFTs[currentShark].rarity}
            </div>
          </div>
        </Card>

        {/* Card 3 */}
        <Card className="bg-gray-900/50 border-gray-700 p-0 overflow-hidden transform hover:scale-105 transition-transform">
          <div className="aspect-square flex flex-col items-center justify-center p-4">
            <div className="w-32 h-32 rounded-full overflow-hidden mb-2 border-2 border-gray-600">
              <Image
                src={displaySharks[2].image || "/placeholder.svg"}
                alt={displaySharks[2].name}
                width={128}
                height={128}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-white font-bold text-sm">{displaySharks[2].name}</div>
            <div className={`text-xs ${getRarityColor(displaySharks[2].rarity).split(" ")[0]}`}>
              {displaySharks[2].rarity}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
