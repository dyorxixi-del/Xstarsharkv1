"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useAccount } from "wagmi"
import { PurchaseModal } from "@/components/purchase-modal"
import { sharkNFTs, getRarityColor } from "@/lib/nft-data"

export function NFTGrid() {
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const { isConnected } = useAccount()

  const marketplaceNFTs = sharkNFTs.map((shark, index) => ({
    ...shark,
    level: 3 + index * 2,
    price: (0.05 + index * 0.1).toFixed(2),
    seller: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
  }))

  const handlePurchase = (nft: any) => {
    setSelectedNFT(nft)
    setShowPurchaseModal(true)
  }

  if (!isConnected) {
    return (
      <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
        <p className="text-gray-400">连接钱包以浏览市场</p>
      </Card>
    )
  }

  return (
    <>
      <div className="mb-4">
        <p className="text-gray-400">找到 {marketplaceNFTs.length} 个 NFT</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {marketplaceNFTs.map((nft) => (
          <Card
            key={nft.id}
            className="bg-slate-800/60 border-gray-600 overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
              <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs">Lv.{nft.level}</div>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs border ${getRarityColor(nft.rarity)}`}>
                {nft.rarity}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white text-sm mb-2">{nft.name}</h3>
              <div className="space-y-1 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">攻击</span>
                  <span className="text-yellow-400">{nft.attributes.attack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">卖家</span>
                  <span className="text-gray-300">{nft.seller}</span>
                </div>
              </div>
              <div className="border-t border-gray-600 pt-3">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-xs">价格</span>
                  <span className="text-white font-bold">{nft.price} OKT</span>
                </div>
                <Button
                  onClick={() => handlePurchase(nft)}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm"
                >
                  立即购买
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <PurchaseModal nft={selectedNFT} isOpen={showPurchaseModal} onClose={() => setShowPurchaseModal(false)} />
    </>
  )
}
