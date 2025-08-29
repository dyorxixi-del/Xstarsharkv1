"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sharkNFTs } from "@/lib/nft-data"

const opponents = sharkNFTs.slice(5, 10).map((shark, index) => ({
  ...shark,
  level: 6 + index * 3,
  hp: 110 + index * 40,
  power: shark.attributes.attack + shark.attributes.defense,
}))

interface OpponentFinderProps {
  selectedShark: any
  onOpponentFound: (opponent: any) => void
}

export function OpponentFinder({ selectedShark, onOpponentFound }: OpponentFinderProps) {
  const [isSearching, setIsSearching] = useState(true)
  const [foundOpponent, setFoundOpponent] = useState<any>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      // 根据玩家鲨鱼等级匹配合适的对手
      const suitableOpponents = opponents.filter((opp) => Math.abs(opp.level - selectedShark.level) <= 3)
      const randomOpponent = suitableOpponents[Math.floor(Math.random() * suitableOpponents.length)]
      setFoundOpponent(randomOpponent)
      setIsSearching(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [selectedShark])

  if (isSearching) {
    return (
      <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
        <div className="space-y-4">
          <div className="text-2xl">🔍</div>
          <h2 className="text-xl font-bold text-white">寻找对手中...</h2>
          <p className="text-gray-400">正在为你匹配合适的对手</p>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-400"></div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white text-center">找到对手！</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player Shark */}
        <Card className="bg-slate-800/60 border-green-500">
          <div className="p-4">
            <h3 className="text-green-400 font-bold mb-2">你的鲨鱼</h3>
            <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded mb-4 overflow-hidden">
              <img
                src={selectedShark.image || "/placeholder.svg"}
                alt={selectedShark.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="text-white font-bold">{selectedShark.name}</div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">等级</span>
                <span className="text-white">{selectedShark.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">攻击</span>
                <span className="text-yellow-400">{selectedShark.attributes.attack}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">生命值</span>
                <span className="text-red-400">{selectedShark.hp}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Opponent */}
        <Card className="bg-slate-800/60 border-red-500">
          <div className="p-4">
            <h3 className="text-red-400 font-bold mb-2">对手</h3>
            <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded mb-4 overflow-hidden">
              <img
                src={foundOpponent.image || "/placeholder.svg"}
                alt={foundOpponent.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-2">
              <div className="text-white font-bold">{foundOpponent.name}</div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">等级</span>
                <span className="text-white">{foundOpponent.level}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">攻击</span>
                <span className="text-yellow-400">{foundOpponent.attributes.attack}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">生命值</span>
                <span className="text-red-400">{foundOpponent.hp}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="text-center">
        <Button
          onClick={() => onOpponentFound(foundOpponent)}
          className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg"
        >
          开始战斗！
        </Button>
      </div>
    </div>
  )
}
