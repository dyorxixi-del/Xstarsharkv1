"use client"

import { useState, useEffect, useRef } from "react"
import { useAccount, useWriteContract, useWaitForTransactionReceipt, useReadContract } from "wagmi"
import { Button } from "@/components/ui/button"
import { STARSHARKS_CONTRACT, XST_TOKEN } from "@/lib/contracts"
import { getXSTPrice, calculateXSTAmount, formatPrice, formatXSTAmount } from "@/lib/price-utils"
import { parseEther } from "viem"
import { addUserNFT, getRandomSharkId } from "@/lib/user-nfts"
import { showGameNotification } from "@/components/game-notification"

export function MintSection() {
  const [mintQuantity, setMintQuantity] = useState(1)
  const [xstPrice, setXstPrice] = useState(0.0001) // 默认价格
  const [isLoadingPrice, setIsLoadingPrice] = useState(false)
  const [isPlayingVideo, setIsPlayingVideo] = useState(false)
  const [showMintedNFTs, setShowMintedNFTs] = useState(false)
  const [mintedNFTs, setMintedNFTs] = useState([])
  const videoRef = useRef(null)

  const { address, isConnected } = useAccount()
  const { writeContract, data: hash, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  })

  useEffect(() => {
    const fetchPrice = async () => {
      setIsLoadingPrice(true)
      try {
        const priceData = await getXSTPrice()
        setXstPrice(priceData.price)
      } catch (error) {
        console.error("获取价格失败:", error)
        // 保持默认价格
      } finally {
        setIsLoadingPrice(false)
      }
    }

    fetchPrice()
    // 每30秒更新一次价格
    const interval = setInterval(fetchPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  const { data: xstBalance } = useReadContract({
    ...XST_TOKEN,
    functionName: "balanceOf",
    args: address ? [address] : undefined,
  })

  const { data: allowance } = useReadContract({
    ...XST_TOKEN,
    functionName: "allowance",
    args: address ? [address, STARSHARKS_CONTRACT.address] : undefined,
  })

  const xstAmountPerNFT = calculateXSTAmount(20, xstPrice) // 20 USDT per NFT
  const totalXstAmount = xstAmountPerNFT * mintQuantity
  const totalXstAmountWei = parseEther(totalXstAmount.toString())

  const handleMint = async () => {
    if (!isConnected || !address) {
      showGameNotification("请先连接钱包才能进行铸造", "error")
      return
    }

    try {
      const newMintedNFTs = []
      for (let i = 0; i < mintQuantity; i++) {
        const sharkId = getRandomSharkId()
        console.log("[v0] 铸造NFT - 随机选择的sharkId:", sharkId)
        const nft = addUserNFT(sharkId)
        console.log("[v0] 铸造NFT - 保存的NFT数据:", nft)
        newMintedNFTs.push(nft)
      }
      setMintedNFTs(newMintedNFTs)

      setIsPlayingVideo(true)
      setShowMintedNFTs(false)

      if (videoRef.current) {
        videoRef.current.currentTime = 0
        videoRef.current.play()
      }
    } catch (error) {
      console.error("铸造失败:", error)
    }
  }

  const handleVideoEnded = () => {
    setIsPlayingVideo(false)
    setShowMintedNFTs(true)

    // 触发页面刷新以更新NFT显示
    window.dispatchEvent(new Event("nft-minted"))

    // 3秒后隐藏NFT展示
    setTimeout(() => {
      setShowMintedNFTs(false)
      setMintedNFTs([])
    }, 3000)
  }

  const incrementQuantity = () => {
    setMintQuantity(mintQuantity + 1)
  }

  const decrementQuantity = () => {
    if (mintQuantity > 1) setMintQuantity(mintQuantity - 1)
  }

  const userXstBalance = isConnected && address ? "10000000" : "0"

  return (
    <div className="text-center mb-12">
      {isConnected && address && (
        <div className="mb-4">
          <div className="inline-block bg-blue-600/20 border border-blue-400 px-4 py-2 rounded-lg mb-2">
            <span className="text-blue-400 font-medium text-sm">🧪 测试版本 - 免费试玩</span>
          </div>
        </div>
      )}

      {isConnected && address && (
        <div className="mb-6">
          <div className="inline-block bg-slate-800/60 border border-yellow-400 px-4 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <img src="/images/xstarsharks-logo.jpg" alt="XST" className="w-5 h-5 rounded-full" />
              <span className="text-yellow-400 font-medium">
                XST 余额: {formatXSTAmount(Number.parseFloat(userXstBalance))}
              </span>
              <Button
                onClick={() => window.open("https://dyorswap.org/home/?chainId=196", "_blank")}
                className="ml-3 bg-green-500 hover:bg-green-600 text-white text-xs px-3 py-1 h-auto"
              >
                购买 XST
              </Button>
            </div>
          </div>
        </div>
      )}

      {isConnected && address && (
        <div className="mb-6 text-cyan-400 text-sm">
          <div className="flex items-center justify-center gap-2">
            <img src="/images/xstarsharks-logo.jpg" alt="XST" className="w-4 h-4 rounded-full" />
            <span>XST 当前价格: ${formatPrice(xstPrice)} USDT</span>
            {isLoadingPrice && <span className="text-yellow-400">更新中...</span>}
          </div>
          <div>铸造价格永远额定为: $20 USDT</div>
          <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
            <img src="/images/xstarsharks-logo.jpg" alt="XST" className="w-3 h-3 rounded-full" />
            每个NFT需要: {formatXSTAmount(xstAmountPerNFT)} XST
          </div>
        </div>
      )}

      {isConnected && address && (
        <div className="mb-6">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <Button
              onClick={decrementQuantity}
              className="w-12 h-12 bg-slate-700 hover:bg-slate-600 text-white text-xl"
              disabled={mintQuantity <= 1}
            >
              -
            </Button>
            <div className="inline-block bg-slate-800/60 p-4 rounded-lg min-w-24">
              <div className="text-6xl font-bold text-white">x{mintQuantity}</div>
            </div>
            <Button
              onClick={incrementQuantity}
              className="w-12 h-12 bg-slate-700 hover:bg-slate-600 text-white text-xl"
            >
              +
            </Button>
          </div>

          <div className="text-yellow-400 text-lg mb-4 flex items-center justify-center gap-2">
            <img src="/images/xstarsharks-logo.jpg" alt="XST" className="w-5 h-5 rounded-full" />
            总价格: {formatXSTAmount(totalXstAmount)} XST (≈ ${20 * mintQuantity} USDT)
          </div>
        </div>
      )}

      {isPlayingVideo && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <div className="relative">
            <video ref={videoRef} className="max-w-full max-h-full" onEnded={handleVideoEnded} autoPlay muted>
              <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/84ba680a2cec868593ecdbf817255046_raw-jWHOPmrGz7na6fJHB5VRK1zbS4Zjdo.mp4" type="video/mp4" />
              您的浏览器不支持视频播放
            </video>
          </div>
        </div>
      )}

      {showMintedNFTs && mintedNFTs.length > 0 && (
        <div className="fixed inset-0 bg-black/80 z-40 flex items-center justify-center">
          <div className="bg-slate-800 p-8 rounded-lg border border-yellow-400 max-w-2xl">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">🎉 铸造成功！</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {mintedNFTs.map((nft, index) => (
                <div key={index} className="bg-slate-700 p-4 rounded-lg border border-gray-600">
                  <img
                    src={nft.image || "/placeholder.svg"}
                    alt={nft.name}
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      e.target.src = "/shark-nft.png"
                    }}
                  />
                  <div className="text-sm text-white font-medium">{nft.name}</div>
                  <div
                    className={`text-xs px-2 py-1 rounded mt-1 text-center ${
                      nft.rarity === "Legendary"
                        ? "bg-orange-500 text-white"
                        : nft.rarity === "Epic"
                          ? "bg-purple-500 text-white"
                          : nft.rarity === "Rare"
                            ? "bg-blue-500 text-white"
                            : "bg-gray-500 text-white"
                    }`}
                  >
                    {nft.rarity}
                  </div>
                  <div className="text-xs text-gray-300 mt-1">
                    攻击: {nft.attack} | 防御: {nft.defense}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-cyan-400">请前往背包查看您的新NFT！</p>
          </div>
        </div>
      )}

      {/* Mint Button */}
      <div className="space-y-4">
        <Button
          onClick={handleMint}
          disabled={!isConnected || !address || isPending || isConfirming || isLoadingPrice || isPlayingVideo}
          className={`px-8 py-3 text-lg font-medium ${
            isConnected && address
              ? "bg-yellow-500 hover:bg-yellow-600 text-black"
              : "bg-gray-600 hover:bg-gray-700 text-white"
          }`}
        >
          {isPlayingVideo
            ? "铸造中..."
            : isPending || isConfirming
              ? "铸造中..."
              : isConnected && address
                ? "免费铸造 StarSharks (测试)"
                : "请先连接钱包"}
        </Button>

        {/* Transaction Status */}
        {hash && (
          <div className="text-sm text-cyan-400">
            交易哈希: {hash.slice(0, 10)}...{hash.slice(-8)}
          </div>
        )}

        {isSuccess && <div className="text-green-400 text-lg font-medium">🎉 铸造成功！</div>}
      </div>
    </div>
  )
}
