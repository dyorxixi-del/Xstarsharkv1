import { MarketplaceHeader } from "@/components/marketplace-header"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { NFTGrid } from "@/components/nft-grid"
import { DashboardHeader } from "@/components/dashboard-header"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 text-white">
      <DashboardHeader />

      <main className="container mx-auto px-6 py-8">
        <MarketplaceHeader />
        <MarketplaceFilters />
        <NFTGrid />
      </main>
    </div>
  )
}
