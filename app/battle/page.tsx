import { BattleArena } from "@/components/battle-arena"
import { DashboardHeader } from "@/components/dashboard-header"

export default function BattlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">战斗竞技场</h1>
          <p className="text-gray-300">选择你的鲨鱼，挑战其他玩家！</p>
        </div>

        <BattleArena />
      </main>
    </div>
  )
}
