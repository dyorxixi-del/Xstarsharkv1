"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"
import { showGameNotification } from "@/components/game-notification"

interface PurchaseModalProps {
  nft: any
  isOpen: boolean
  onClose: () => void
}

export function PurchaseModal({ nft, isOpen, onClose }: PurchaseModalProps) {
  const [isPurchasing, setIsPurchasing] = useState(false)

  if (!isOpen || !nft) return null

  const handlePurchase = async () => {
    setIsPurchasing(true)
    // 模拟购买过程
    setTimeout(() => {
      setIsPurchasing(false)
      showGameNotification("购买成功！NFT 已添加到你的收藏中。", "success")
      onClose()
    }, 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="bg-slate-800 border-gray-600 max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">确认购买</h2>
            <Button onClick={onClose} className="bg-transparent hover:bg-gray-700 text-gray-400 p-2">
              ✕
            </Button>
          </div>

          <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded mb-4 overflow-hidden">
            <img src={nft.image || "/placeholder.svg"} alt={nft.name} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-3 mb-6">
            <h3 className="text-white font-bold text-lg">{nft.name}</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">稀有度</span>
                <span className="text-white">{nft.rarity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">等级</span>
                <span className="text-white">{nft.level}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">攻击</span>
                <span className="text-yellow-400">{nft.attributes.attack}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">卖家</span>
                <span className="text-gray-300">{nft.seller}</span>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-600 pt-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">总价格</span>
              <span className="text-white font-bold text-xl">{nft.price} OKT</span>
            </div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={onClose} className="flex-1 bg-gray-600 hover:bg-gray-700 text-white">
              取消
            </Button>
            <Button
              onClick={handlePurchase}
              disabled={isPurchasing}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              {isPurchasing ? "购买中..." : "确认购买"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
