import { DashboardHeader } from "@/components/dashboard-header"
import { NFTCollection } from "@/components/nft-collection"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-yellow-400 mb-2">我的背包</h1>
          <p className="text-gray-300">查看和管理你的 StarSharks NFT 收藏</p>
        </div>

        {/* NFT Collection */}
        <NFTCollection />
      </main>
    </div>
  )
}
