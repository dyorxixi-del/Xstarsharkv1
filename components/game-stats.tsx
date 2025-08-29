"use client"

import { Card } from "@/components/ui/card"
import { useAccount } from "wagmi"

export function GameStats() {
  const { isConnected } = useAccount()

  const userNFTCount = 0 // 暂时设为0，表示用户还没有MINT
  const hasNFTs = userNFTCount > 0

  if (!isConnected) {
    return (
      <div className="mb-8">
        <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
          <p className="text-gray-400">连接钱包以查看游戏统计</p>
        </Card>
      </div>
    )
  }

  if (!hasNFTs) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">游戏统计</h2>
        <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
          <div className="text-gray-400 space-y-2">
            <p className="text-lg">还没有鲨鱼NFT</p>
            <p className="text-sm">铸造你的第一个鲨鱼开始游戏吧！</p>
          </div>
        </Card>
      </div>
    )
  }

  const stats = [
    { label: "拥有的鲨鱼", value: userNFTCount.toString(), icon: "🎯" },
    { label: "战斗胜利", value: "0", icon: "⚔️" },
    { label: "总经验值", value: "0", icon: "⭐" },
    { label: "排名", value: "-", icon: "🏆" },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">游戏统计</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-slate-800/60 border-gray-600 p-6">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
