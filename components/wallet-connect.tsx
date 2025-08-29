"use client"

import { useAccount, useConnect, useDisconnect } from "wagmi"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function WalletConnect() {
  const { address, isConnected } = useAccount()
  const { connect, connectors, isPending } = useConnect()
  const { disconnect } = useDisconnect()
  const [showConnectors, setShowConnectors] = useState(false)

  if (isConnected) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm text-cyan-400">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </div>
        <Button onClick={() => disconnect()} className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2">
          断开连接
        </Button>
      </div>
    )
  }

  return (
    <div className="relative">
      <Button
        onClick={() => setShowConnectors(!showConnectors)}
        className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-6"
        disabled={isPending}
      >
        {isPending ? "连接中..." : "连接钱包"}
      </Button>

      {showConnectors && (
        <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-gray-600 rounded-lg p-4 min-w-48 z-50">
          <div className="space-y-2">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                onClick={() => {
                  connect({ connector })
                  setShowConnectors(false)
                }}
                className="w-full bg-slate-700 hover:bg-slate-600 text-white justify-start"
                disabled={isPending}
              >
                {connector.name}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
