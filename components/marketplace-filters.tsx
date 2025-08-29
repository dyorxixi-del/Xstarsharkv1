"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useState } from "react"

export function MarketplaceFilters() {
  const [selectedRarity, setSelectedRarity] = useState<string>("all")
  const [priceRange, setPriceRange] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("newest")

  const rarities = [
    { value: "all", label: "全部稀有度" },
    { value: "common", label: "普通" },
    { value: "rare", label: "稀有" },
    { value: "epic", label: "史诗" },
    { value: "legendary", label: "传奇" },
    { value: "mythic", label: "神话" },
  ]

  const priceRanges = [
    { value: "all", label: "全部价格" },
    { value: "0-100", label: "0 - 100 OKT" },
    { value: "100-500", label: "100 - 500 OKT" },
    { value: "500-1000", label: "500 - 1000 OKT" },
    { value: "1000+", label: "1000+ OKT" },
  ]

  const sortOptions = [
    { value: "newest", label: "最新上架" },
    { value: "oldest", label: "最早上架" },
    { value: "price-low", label: "价格从低到高" },
    { value: "price-high", label: "价格从高到低" },
    { value: "rarity", label: "稀有度" },
  ]

  return (
    <Card className="bg-slate-800/60 border-gray-600 p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Rarity Filter */}
        <div>
          <h3 className="text-white font-bold mb-3">稀有度</h3>
          <div className="space-y-2">
            {rarities.map((rarity) => (
              <Button
                key={rarity.value}
                onClick={() => setSelectedRarity(rarity.value)}
                variant={selectedRarity === rarity.value ? "default" : "outline"}
                className={`w-full justify-start text-sm ${
                  selectedRarity === rarity.value
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {rarity.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div>
          <h3 className="text-white font-bold mb-3">价格范围</h3>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <Button
                key={range.value}
                onClick={() => setPriceRange(range.value)}
                variant={priceRange === range.value ? "default" : "outline"}
                className={`w-full justify-start text-sm ${
                  priceRange === range.value
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {range.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <h3 className="text-white font-bold mb-3">排序方式</h3>
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <Button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                variant={sortBy === option.value ? "default" : "outline"}
                className={`w-full justify-start text-sm ${
                  sortBy === option.value
                    ? "bg-yellow-500 text-black"
                    : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                }`}
              >
                {option.label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
