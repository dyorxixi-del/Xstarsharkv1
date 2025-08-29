"use client"

import { Card } from "@/components/ui/card"
import { useAccount } from "wagmi"

const achievements = [
  { id: 1, name: "首次铸造", description: "铸造你的第一个 StarShark", icon: "🎯", completed: true },
  { id: 2, name: "收藏家", description: "拥有 5 个不同的鲨鱼", icon: "📚", completed: true },
  { id: 3, name: "战斗新手", description: "赢得你的第一场战斗", icon: "⚔️", completed: true },
  { id: 4, name: "连胜王者", description: "连续赢得 10 场战斗", icon: "🔥", completed: false },
  { id: 5, name: "传奇猎手", description: "拥有一个传奇级鲨鱼", icon: "👑", completed: true },
  { id: 6, name: "市场大亨", description: "在市场上完成 50 笔交易", icon: "💰", completed: false },
]

export function Achievements() {
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">成就系统</h2>
        <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
          <p className="text-gray-400">连接钱包以查看你的成就</p>
        </Card>
      </div>
    )
  }

  const completedCount = achievements.filter((a) => a.completed).length

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">成就系统</h2>
        <div className="text-sm text-gray-400">
          已完成: {completedCount}/{achievements.length}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <Card
            key={achievement.id}
            className={`p-4 ${
              achievement.completed ? "bg-slate-800/60 border-yellow-500/50" : "bg-slate-800/30 border-gray-600"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`text-2xl ${achievement.completed ? "" : "grayscale opacity-50"}`}>
                {achievement.icon}
              </div>
              <div className="flex-1">
                <h3 className={`font-bold mb-1 ${achievement.completed ? "text-yellow-400" : "text-gray-400"}`}>
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-400">{achievement.description}</p>
                {achievement.completed && <div className="text-xs text-green-400 mt-2">✓ 已完成</div>}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
