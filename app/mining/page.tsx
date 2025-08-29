import { MiningInterface } from "@/components/mining-interface"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MiningPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `
          linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.9) 50%, rgba(15, 23, 42, 0.95) 100%),
          url('/images/deep-sea-background.png')
        `,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* 添加返回按钮 */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-slate-800/80 hover:bg-slate-700/80 text-white rounded-lg transition-colors backdrop-blur-sm border border-slate-600/50"
        >
          <ArrowLeft className="w-4 h-4" />
          返回主页
        </Link>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-blue-400/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-green-400/10 rounded-full blur-xl animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10">
        <div className="container mx-auto px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-yellow-300">NFT</span>
              <span className="text-yellow-500"> 质押挖矿</span>
            </h1>
            <p className="text-xl text-gray-300 mb-2">质押您的StarSharks NFT，赚取丰厚的XST奖励</p>
            <p className="text-lg text-yellow-400 font-semibold">超高收益率 - 每三天基本回本！</p>
          </div>

          <MiningInterface />
        </div>
      </div>
    </div>
  )
}
