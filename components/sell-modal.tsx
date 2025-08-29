"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { sharkNFTs } from "@/lib/nft-data"
import { showGameNotification } from "@/components/game-notification"

interface SellModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SellModal({ isOpen, onClose }: SellModalProps) {
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [price, setPrice] = useState("")
  const [isListing, setIsListing] = useState(false)

  const userNFTs = sharkNFTs.slice(0, 3).map((shark, index) => ({
    ...shark,
    level: 5 + index * 3,
  }))

  if (!isOpen) return null

  const handleList = async () => {
    if (!selectedNFT || !price) return

    setIsListing(true)
    // 模拟上架过程
    setTimeout(() => {
      setIsListing(false)
      showGameNotification(`${selectedNFT.name} 已成功上架，价格 ${price} OKT`, "success")
      onClose()
      setSelectedNFT(null)
      setPrice("")
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-800 border-gray-600 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">出售 NFT</h2>
            <Button onClick={onClose} className="bg-transparent hover:bg-gray-700 text-gray-400 p-2">
              ✕
            </Button>
          </div>

          {!selectedNFT ? (
            <div>
              <h3 className="text-white font-bold mb-4">选择要出售的 NFT</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {userNFTs.map((nft) => (
                  <Card
                    key={nft.id}
                    className="bg-slate-700/60 border-gray-600 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => setSelectedNFT(nft)}
                  >
                    <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center overflow-hidden">
                      <img
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <h4 className="text-white font-bold text-sm">{nft.name}</h4>
                      <div className="text-xs text-gray-400 mt-1">
                        {nft.rarity} • Lv.{nft.level} • {nft.attributes.attack} 攻击
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-white font-bold mb-4">设置价格</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded mb-4 overflow-hidden">
                    <img
                      src={selectedNFT.image || "/placeholder.svg"}
                      alt={selectedNFT.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="text-white font-bold">{selectedNFT.name}</h4>
                  <div className="text-sm text-gray-400 mt-1">
                    {selectedNFT.rarity} • Lv.{selectedNFT.level} • {selectedNFT.attributes.attack} 攻击
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-bold mb-2">价格 (OKT)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full bg-slate-700 border border-gray-600 rounded px-3 py-2 text-white"
                      placeholder="输入价格"
                    />
                  </div>

                  <div className="text-sm text-gray-400">
                    <div className="flex justify-between">
                      <span>市场手续费 (2.5%)</span>
                      <span>{price ? (Number.parseFloat(price) * 0.025).toFixed(4) : "0"} OKT</span>
                    </div>
                    <div className="flex justify-between font-bold text-white mt-2">
                      <span>你将收到</span>
                      <span>{price ? (Number.parseFloat(price) * 0.975).toFixed(4) : "0"} OKT</span>
                    </div>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <Button
                      onClick={() => setSelectedNFT(null)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white"
                    >
                      返回
                    </Button>
                    <Button
                      onClick={handleList}
                      disabled={!price || Number.parseFloat(price) <= 0 || isListing}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      {isListing ? "上架中..." : "确认上架"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
