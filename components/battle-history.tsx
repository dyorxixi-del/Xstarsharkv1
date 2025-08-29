"use client"

import { Card } from "@/components/ui/card"
import { useAccount } from "wagmi"

const battleHistory = [
  { id: 1, opponent: "DeepSeaKing", result: "win", reward: "+50 XP", time: "2小时前" },
  { id: 2, opponent: "OceanMaster", result: "win", reward: "+45 XP", time: "5小时前" },
  { id: 3, opponent: "SharkHunter", result: "loss", reward: "+10 XP", time: "1天前" },
  { id: 4, opponent: "AquaWarrior", result: "win", reward: "+60 XP", time: "2天前" },
  { id: 5, opponent: "TidalForce", result: "win", reward: "+55 XP", time: "3天前" },
]

export function BattleHistory() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">战斗历史</h2>
        <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
          <p className="text-gray-400">连接钱包以查看战斗历史</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-white mb-4">最近战斗</h2>

      <Card className="bg-slate-800/60 border-gray-600">
        <div className="p-4">
          <div className="space-y-3">
            {battleHistory.map((battle) => (
              <div
                key={battle.id}
                className="flex items-center justify-between py-3 border-b border-gray-700 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-3 h-3 rounded-full ${battle.result === "win" ? "bg-green-500" : "bg-red-500"}`}
                  ></div>
                  <div>
                    <div className="text-white font-medium">vs {battle.opponent}</div>
                    <div className="text-sm text-gray-400">{battle.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`font-medium ${battle.result === "win" ? "text-green-400" : "text-red-400"}`}>
                    {battle.result === "win" ? "胜利" : "失败"}
                  </div>
                  <div className="text-sm text-yellow-400">{battle.reward}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
