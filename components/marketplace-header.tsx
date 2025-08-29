"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SellModal } from "@/components/sell-modal"

export function MarketplaceHeader() {
  const [showSellModal, setShowSellModal] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">NFT 市场</h1>
          <p className="text-gray-300">买卖 StarSharks NFT，发现稀有收藏品</p>
        </div>
        <Button onClick={() => setShowSellModal(true)} className="bg-green-500 hover:bg-green-600 text-white px-6 py-3">
          出售我的 NFT
        </Button>
      </div>

      <SellModal isOpen={showSellModal} onClose={() => setShowSellModal(false)} />
    </>
  )
}
