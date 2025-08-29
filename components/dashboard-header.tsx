"use client"

import { WalletConnect } from "@/components/wallet-connect"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function DashboardHeader() {
  const pathname = usePathname()

  return (
    <header className="border-b border-gray-700 bg-slate-900/80 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-3">
              <img src="/images/xstarsharks-logo.jpg" alt="XStarShark Logo" className="w-8 h-8 rounded-full" />
              <div className="text-2xl font-bold text-yellow-400">
                <span className="text-yellow-300">STAR</span>
                <span className="text-yellow-500">SHARKS</span>
              </div>
            </Link>
            <nav className="hidden md:flex space-x-6 text-sm">
              <Link
                href="/dashboard"
                className={`transition-colors ${pathname === "/dashboard" ? "text-yellow-400" : "hover:text-yellow-400"}`}
              >
                背包
              </Link>
              <Link
                href="/mining"
                className={`transition-colors ${pathname === "/mining" ? "text-yellow-400" : "hover:text-yellow-400"}`}
              >
                挖矿
              </Link>
              <div className="relative group">
                <span className="text-gray-500 cursor-not-allowed">战斗</span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  暂未开放
                </div>
              </div>
              <div className="relative group">
                <span className="text-gray-500 cursor-not-allowed">市场</span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  暂未开放
                </div>
              </div>
              <div className="relative group">
                <span className="text-gray-500 cursor-not-allowed">排行榜</span>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  暂未开放
                </div>
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <WalletConnect />
          </div>
        </div>
      </div>
    </header>
  )
}
