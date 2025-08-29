"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BattleFieldProps {
  playerShark: any
  opponentShark: any
  onBattleComplete: () => void
}

export function BattleField({ playerShark, opponentShark, onBattleComplete }: BattleFieldProps) {
  const [playerHP, setPlayerHP] = useState(playerShark.hp)
  const [opponentHP, setOpponentHP] = useState(opponentShark.hp)
  const [battleLog, setBattleLog] = useState<string[]>([])
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [battleEnded, setBattleEnded] = useState(false)
  const [winner, setWinner] = useState<"player" | "opponent" | null>(null)

  const addToBattleLog = (message: string) => {
    setBattleLog((prev) => [...prev.slice(-4), message])
  }

  const playerAttack = () => {
    if (!isPlayerTurn || battleEnded) return

    const damage = Math.floor(Math.random() * 30) + 20
    const newOpponentHP = Math.max(0, opponentHP - damage)
    setOpponentHP(newOpponentHP)
    addToBattleLog(`${playerShark.name} 攻击造成 ${damage} 伤害！`)

    if (newOpponentHP <= 0) {
      setBattleEnded(true)
      setWinner("player")
      addToBattleLog(`${playerShark.name} 获得胜利！`)
      setTimeout(onBattleComplete, 2000)
    } else {
      setIsPlayerTurn(false)
    }
  }

  useEffect(() => {
    if (!isPlayerTurn && !battleEnded) {
      const timer = setTimeout(() => {
        const damage = Math.floor(Math.random() * 25) + 15
        const newPlayerHP = Math.max(0, playerHP - damage)
        setPlayerHP(newPlayerHP)
        addToBattleLog(`${opponentShark.name} 攻击造成 ${damage} 伤害！`)

        if (newPlayerHP <= 0) {
          setBattleEnded(true)
          setWinner("opponent")
          addToBattleLog(`${opponentShark.name} 获得胜利！`)
          setTimeout(onBattleComplete, 2000)
        } else {
          setIsPlayerTurn(true)
        }
      }, 1500)

      return () => clearTimeout(timer)
    }
  }, [isPlayerTurn, battleEnded, playerHP, opponentHP])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white text-center">战斗进行中</h2>

      {/* Battle Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Player Side */}
        <Card
          className={`bg-slate-800/60 ${winner === "player" ? "border-green-500" : winner === "opponent" ? "border-red-500/50" : "border-green-500"}`}
        >
          <div className="p-6">
            <h3 className="text-green-400 font-bold mb-4">你的鲨鱼</h3>
            <div
              className={`aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded mb-4 overflow-hidden ${isPlayerTurn && !battleEnded ? "animate-pulse" : ""}`}
            >
              <img
                src={playerShark.image || "/placeholder.svg"}
                alt={playerShark.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="text-white font-bold">{playerShark.name}</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">生命值</span>
                  <span className="text-red-400">
                    {playerHP}/{playerShark.hp}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(playerHP / playerShark.hp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Opponent Side */}
        <Card
          className={`bg-slate-800/60 ${winner === "opponent" ? "border-red-500" : winner === "player" ? "border-red-500/50" : "border-red-500"}`}
        >
          <div className="p-6">
            <h3 className="text-red-400 font-bold mb-4">对手</h3>
            <div
              className={`aspect-square bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center rounded mb-4 overflow-hidden ${!isPlayerTurn && !battleEnded ? "animate-pulse" : ""}`}
            >
              <img
                src={opponentShark.image || "/placeholder.svg"}
                alt={opponentShark.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-3">
              <div className="text-white font-bold">{opponentShark.name}</div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">生命值</span>
                  <span className="text-red-400">
                    {opponentHP}/{opponentShark.hp}
                  </span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(opponentHP / opponentShark.hp) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Battle Controls */}
      <div className="text-center">
        <Button
          onClick={playerAttack}
          disabled={!isPlayerTurn || battleEnded}
          className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 text-lg disabled:opacity-50"
        >
          {battleEnded ? "战斗结束" : isPlayerTurn ? "攻击！" : "对手回合..."}
        </Button>
      </div>

      {/* Battle Log */}
      <Card className="bg-slate-800/60 border-gray-600">
        <div className="p-4">
          <h3 className="text-white font-bold mb-3">战斗记录</h3>
          <div className="space-y-1 text-sm">
            {battleLog.map((log, index) => (
              <div key={index} className="text-gray-300">
                {log}
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
