"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { sharkNFTs } from "@/lib/nft-data"

interface SharkSelectorProps {
  onSharkSelected: (shark: any) => void
}

export function SharkSelector({ onSharkSelected }: SharkSelectorProps) {
  const playerSharks = sharkNFTs.slice(0, 5).map((shark, index) => ({
    ...shark,
    level: 5 + index * 3,
    hp: 100 + index * 50,
  }))

  return (
    <div>
      <h2 className="text-2xl font-bold text-white mb-4">选择你的战斗鲨鱼</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {playerSharks.map((shark) => (
          <Card
            key={shark.id}
            className="bg-slate-800/60 border-gray-600 overflow-hidden hover:scale-105 transition-transform"
          >
            <div className="aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
              <img src={shark.image || "/placeholder.svg"} alt={shark.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 right-2 bg-black/50 px-2 py-1 rounded text-xs">Lv.{shark.level}</div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-white text-sm mb-2">{shark.name}</h3>
              <div className="space-y-1 text-xs mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">攻击</span>
                  <span className="text-yellow-400">{shark.attributes.attack}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">生命值</span>
                  <span className="text-red-400">{shark.hp}</span>
                </div>
              </div>
              <Button
                onClick={() => onSharkSelected(shark)}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black text-xs"
              >
                选择战斗
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
