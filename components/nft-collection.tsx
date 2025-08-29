"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"
import { useState, useEffect } from "react"
import Link from "next/link"
import { getUserNFTs, type UserNFT } from "@/lib/user-nfts"

export function NFTCollection() {
  const { isConnected, address } = useAccount()
  const [userNFTs, setUserNFTs] = useState<UserNFT[]>([])
  const [loading, setLoading] = useState(true)

  const loadUserNFTs = () => {
    if (isConnected && address) {
      const nfts = getUserNFTs()
      setUserNFTs(nfts)
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUserNFTs()
  }, [isConnected, address])

  useEffect(() => {
    const handleNFTMinted = () => {
      loadUserNFTs()
    }

    window.addEventListener("nft-minted", handleNFTMinted)
    return () => window.removeEventListener("nft-minted", handleNFTMinted)
  }, [isConnected, address])

  if (!isConnected) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">我的鲨鱼收藏</h2>
        <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
          <p className="text-gray-400">连接钱包以查看你的 NFT 收藏</p>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">我的鲨鱼收藏</h2>
        <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
          <p className="text-gray-400">加载中...</p>
        </Card>
      </div>
    )
  }

  if (userNFTs.length === 0) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">我的鲨鱼背包</h2>
        <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
          <div className="space-y-4">
            <p className="text-gray-400 text-lg">你还没有任何 StarSharks NFT</p>
            <p className="text-gray-500 text-sm">开始铸造你的第一个鲨鱼NFT吧！</p>
            <Link href="/">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">立即铸造</Button>
            </Link>
          </div>
        </Card>
      </div>
    )
  }

  const validNFTs = userNFTs.filter((nft) => nft.name && nft.image && nft.rarity)

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">我的鲨鱼背包</h2>
        <Link href="/">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">铸造更多</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {validNFTs.map((userNFT) => {
          return (
            <Card
              key={userNFT.id}
              className="bg-slate-800/60 border-gray-600 overflow-hidden hover:scale-105 transition-transform"
            >
              <div className="aspect-square relative">
                <img
                  src={userNFT.image || "/placeholder.svg"}
                  alt={userNFT.name || "StarShark NFT"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 text-xs font-bold rounded ${
                      userNFT.rarity === "Legendary"
                        ? "bg-orange-500 text-white"
                        : userNFT.rarity === "Mythic"
                          ? "bg-purple-500 text-white"
                          : userNFT.rarity === "Epic"
                            ? "bg-pink-500 text-white"
                            : userNFT.rarity === "Rare"
                              ? "bg-blue-500 text-white"
                              : "bg-gray-500 text-white"
                    }`}
                  >
                    {userNFT.rarity}
                  </span>
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-white font-bold text-sm mb-1">{userNFT.name}</h3>
                <p className="text-gray-400 text-xs mb-2">#{userNFT.tokenId}</p>
                <div className="grid grid-cols-3 gap-1 text-xs">
                  <div className="text-center">
                    <div className="text-gray-400">攻击</div>
                    <div className="text-yellow-400 font-bold">{userNFT.attack || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">防御</div>
                    <div className="text-blue-400 font-bold">{userNFT.defense || 0}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-gray-400">速度</div>
                    <div className="text-green-400 font-bold">{userNFT.speed || 0}</div>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
