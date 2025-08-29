"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAccount } from "wagmi"
import { SharkSelector } from "@/components/shark-selector"
import { BattleField } from "@/components/battle-field"
import { OpponentFinder } from "@/components/opponent-finder"

type BattleState = "selecting" | "finding" | "battling" | "result"

export function BattleArena() {
  const [battleState, setBattleState] = useState<BattleState>("selecting")
  const [selectedShark, setSelectedShark] = useState<any>(null)
  const [opponent, setOpponent] = useState<any>(null)
  const { isConnected } = useAccount()

  if (!isConnected) {
    return (
      <Card className="bg-slate-800/60 border-gray-600 p-8 text-center">
        <p className="text-gray-400">连接钱包以开始战斗</p>
      </Card>
    )
  }

  const handleSharkSelected = (shark: any) => {
    setSelectedShark(shark)
    setBattleState("finding")
  }

  const handleOpponentFound = (opponentData: any) => {
    setOpponent(opponentData)
    setBattleState("battling")
  }

  const handleBattleComplete = () => {
    setBattleState("result")
  }

  const resetBattle = () => {
    setSelectedShark(null)
    setOpponent(null)
    setBattleState("selecting")
  }

  return (
    <div className="space-y-6">
      {battleState === "selecting" && <SharkSelector onSharkSelected={handleSharkSelected} />}

      {battleState === "finding" && (
        <OpponentFinder selectedShark={selectedShark} onOpponentFound={handleOpponentFound} />
      )}

      {battleState === "battling" && (
        <BattleField playerShark={selectedShark} opponentShark={opponent} onBattleComplete={handleBattleComplete} />
      )}

      {battleState === "result" && (
        <div className="text-center space-y-4">
          <Card className="bg-slate-800/60 border-gray-600 p-8">
            <h2 className="text-3xl font-bold text-green-400 mb-4">战斗胜利！</h2>
            <p className="text-gray-300 mb-4">你获得了 50 经验值和 0.01 ETH 奖励</p>
            <Button onClick={resetBattle} className="bg-yellow-500 hover:bg-yellow-600 text-black">
              再次战斗
            </Button>
          </Card>
        </div>
      )}
    </div>
  )
}
