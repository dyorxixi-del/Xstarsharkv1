import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { MintSection } from "@/components/mint-section"
import { NFTPreview } from "@/components/nft-preview"
import Link from "next/link"

export default function StarSharksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-80 z-0"
        style={{ backgroundImage: "url(/images/deep-sea-background.png)" }}
      ></div>

      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-cyan-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-blue-600/30 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-yellow-500/20 rounded-full blur-2xl animate-pulse delay-2000"></div>
      </div>

      <header className="relative z-10 flex items-center justify-between p-6 bg-black/20 backdrop-blur-sm">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-3">
            <img src="/images/xstarsharks-logo.jpg" alt="XStarShark Logo" className="w-10 h-10 rounded-full" />
            <div className="text-2xl font-bold text-yellow-400">
              <span className="text-yellow-300">STAR</span>
              <span className="text-yellow-500">SHARKS</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-6 text-sm">
            <a href="#" className="hover:text-yellow-400 transition-colors">
              首頁
            </a>
            <Link href="/dashboard" className="hover:text-yellow-400 transition-colors">
              仪表板
            </Link>
            <a href="#" className="hover:text-yellow-400 transition-colors">
              排行榜
            </a>
            <a href="#" className="text-yellow-400">
              檢查
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm"></div>
          <WalletConnect />
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12 bg-black/30 backdrop-blur-sm rounded-2xl p-8">
          <h1 className="text-6xl md:text-7xl font-bold text-yellow-400 mb-4 tracking-wider">SLACKING SHARKS</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-500 mb-8">MINT</h2>
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <NFTPreview />
        </div>

        <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 mb-8">
          <MintSection />
        </div>

        <div className="text-center mb-8 bg-black/20 backdrop-blur-sm rounded-2xl p-6">
          <Link href="/dashboard">
            <Button className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 text-lg font-medium">
              进入游戏仪表板
            </Button>
          </Link>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 bg-black/30 backdrop-blur-sm rounded-2xl p-8">
          <div>
            <h3 className="text-yellow-400 text-xl font-bold mb-4 flex items-center">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
              XStarShark (XST) - The Ultimate Card Battle Experience
            </h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              As the first game release in StarSharks series, XStarShark (XST) came as a card battle game. Each team
              consists of 3 sharks clash on the battlefield to compete for victory and rewards.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              XST showcases a variety of possibility of gameplay/strategies/NFT nurture experience: a card skill base
              with over 120 unique skills, up to 4 skills randomly carried by your NFT sharks, and every time sharks
              upgrading is accompanied by its status/skills shuffle.
            </p>
            <p className="text-gray-300 leading-relaxed mb-4">
              The first stage to take a glance at what the StarSharks have to offer!
            </p>
            <p className="text-yellow-400 font-bold text-center mt-6">There is no best shark, only best players.</p>
          </div>
        </div>
      </main>

      <footer className="relative z-10 mt-20 border-t border-gray-700 py-8 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img src="/images/xstarsharks-logo.jpg" alt="XStarShark Logo" className="w-8 h-8 rounded-full" />
              <div className="text-xl font-bold text-yellow-400">
                <span className="text-yellow-300">STAR</span>
                <span className="text-yellow-500">SHARKS</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex space-x-4">
                <a
                  href="https://x.com/XStarShark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  X (Twitter)
                </a>
                <a
                  href="https://github.com/candy79866/Xstarshark"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div>©2025 STARSHARKS(星鯊), 版權所有</div>
            <div className="flex space-x-4 mt-2 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">
                聯繫我們
              </a>
              <a href="#" className="hover:text-white transition-colors">
                反饋
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
