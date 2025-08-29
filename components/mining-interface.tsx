"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getUserNFTs, type UserNFT } from "@/lib/user-nfts"
import {
  getStakedNFTs,
  stakeNFT,
  unstakeNFT,
  calculateRewards,
  claimRewards,
  getMiningStats,
  getRarityMultiplier, // 添加getRarityMultiplier导入
  type StakedNFT,
} from "@/lib/mining-utils"
import { showGameNotification } from "@/components/game-notification"
import { useAccount } from "wagmi"
import Image from "next/image"

export function MiningInterface() {
  const { isConnected } = useAccount()
  const [userNFTs, setUserNFTs] = useState<UserNFT[]>([])
  const [stakedNFTs, setStakedNFTs] = useState<StakedNFT[]>([])
  const [miningStats, setMiningStats] = useState(getMiningStats())
  const [selectedTab, setSelectedTab] = useState<"stake" | "staked">("stake")

  useEffect(() => {
    if (isConnected) {
      loadData()
      const interval = setInterval(loadData, 5000) // 每5秒更新一次
      return () => clearInterval(interval)
    }
  }, [isConnected])

  const loadData = () => {
    const nfts = getUserNFTs()
    const validNFTs = nfts.filter((nft) => {
      // 只过滤掉没有完整数据的NFT
      return nft.name && nft.image && nft.rarity
    })
    setUserNFTs(validNFTs)
    setStakedNFTs(getStakedNFTs())
    setMiningStats(getMiningStats())
  }

  const handleStake = (nft: UserNFT) => {
    stakeNFT(nft)
    loadData()
  }

  const handleUnstake = (nftId: string) => {
    unstakeNFT(nftId)
    loadData()
  }

  const handleClaimRewards = (nftId: string) => {
    const rewards = claimRewards(nftId)
    showGameNotification(`成功领取 ${rewards.toFixed(2)} XST 奖励！`, "success")
    loadData()
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-white mb-4">请先连接钱包</h2>
        <p className="text-gray-400">连接钱包后即可开始NFT质押挖矿</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{miningStats.totalStaked}</div>
              <div className="text-sm text-gray-400">已质押NFT</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{miningStats.totalRewards.toFixed(2)}</div>
              <div className="text-sm text-gray-400">待领取奖励</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{miningStats.dailyRewards.toFixed(0)}</div>
              <div className="text-sm text-gray-400">每日收益 XST</div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{miningStats.apy}%</div>
              <div className="text-sm text-gray-400">年化收益率</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex space-x-4 border-b border-slate-700">
        <button
          onClick={() => setSelectedTab("stake")}
          className={`pb-2 px-1 ${selectedTab === "stake" ? "border-b-2 border-yellow-400 text-yellow-400" : "text-gray-400"}`}
        >
          质押NFT ({userNFTs.length})
        </button>
        <button
          onClick={() => setSelectedTab("staked")}
          className={`pb-2 px-1 ${selectedTab === "staked" ? "border-b-2 border-yellow-400 text-yellow-400" : "text-gray-400"}`}
        >
          已质押 ({stakedNFTs.length})
        </button>
      </div>

      {selectedTab === "stake" && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">选择要质押的NFT</h3>
          {userNFTs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">您还没有可质押的NFT</p>
              <p className="text-sm text-gray-500 mt-2">前往铸造页面获取您的第一个StarSharks NFT</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userNFTs.map((nft) => (
                <Card
                  key={nft.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-yellow-400/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                      <Image
                        src={nft.image || "/placeholder.svg"}
                        alt={nft.name || "StarShark NFT"}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-white">{nft.name || "Unknown Shark"}</h4>
                        <Badge
                          variant="outline"
                          className={`
                          ${nft.rarity === "Legendary" ? "border-orange-500 text-orange-400" : ""}
                          ${nft.rarity === "Mythic" ? "border-purple-500 text-purple-400" : ""}
                          ${nft.rarity === "Epic" ? "border-pink-500 text-pink-400" : ""}
                          ${nft.rarity === "Rare" ? "border-blue-500 text-blue-400" : ""}
                          ${nft.rarity === "Common" ? "border-gray-500 text-gray-400" : ""}
                        `}
                        >
                          {nft.rarity || "Common"}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div>
                          攻击: {nft.attack || 0} | 防御: {nft.defense || 0}
                        </div>
                        <div>速度: {nft.speed || 0}</div>
                        <div className="text-green-400">
                          每小时收益: {(3000 * getRarityMultiplier(nft.rarity || "Common")).toFixed(0)} XST
                        </div>
                      </div>
                      <Button onClick={() => handleStake(nft)} className="w-full bg-yellow-600 hover:bg-yellow-700">
                        质押挖矿
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {selectedTab === "staked" && (
        <div>
          <h3 className="text-xl font-bold text-white mb-4">已质押的NFT</h3>
          {stakedNFTs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">您还没有质押任何NFT</p>
              <p className="text-sm text-gray-500 mt-2">质押NFT开始赚取XST奖励</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stakedNFTs.map((nft) => {
                const rewards = calculateRewards(nft)
                const stakingDays = Math.floor((Date.now() - nft.stakedAt) / (1000 * 60 * 60 * 24))

                return (
                  <Card key={nft.id} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-4">
                      <div className="aspect-square relative mb-3 rounded-lg overflow-hidden">
                        <Image
                          src={nft.image || "/placeholder.svg"}
                          alt={nft.name || "StarShark NFT"}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <Badge className="bg-green-600">挖矿中</Badge>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-white">{nft.name || "Unknown Shark"}</h4>
                          <Badge
                            variant="outline"
                            className={`
                            ${nft.rarity === "Legendary" ? "border-orange-500 text-orange-400" : ""}
                            ${nft.rarity === "Mythic" ? "border-purple-500 text-purple-400" : ""}
                            ${nft.rarity === "Epic" ? "border-pink-500 text-pink-400" : ""}
                            ${nft.rarity === "Rare" ? "border-blue-500 text-blue-400" : ""}
                            ${nft.rarity === "Common" ? "border-gray-500 text-gray-400" : ""}
                          `}
                          >
                            {nft.rarity || "Common"}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>质押天数: {stakingDays} 天</div>
                          <div className="text-green-400 font-semibold">待领取: {rewards.toFixed(2)} XST</div>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => handleClaimRewards(nft.id)}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                            disabled={rewards < 1}
                          >
                            领取奖励
                          </Button>
                          <Button onClick={() => handleUnstake(nft.id)} variant="outline" className="flex-1">
                            取消质押
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
