import type { UserNFT } from "./user-nfts"

export interface StakedNFT extends UserNFT {
  stakedAt: number
  lastRewardClaim: number
}

export interface MiningStats {
  totalStaked: number
  totalRewards: number
  dailyRewards: number
  apy: number
}

// 测试版本的质押NFT管理
export function getStakedNFTs(): StakedNFT[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("staked-nfts")
  return stored ? JSON.parse(stored) : []
}

export function stakeNFT(nft: UserNFT): void {
  const stakedNFTs = getStakedNFTs()
  const now = Date.now()

  const stakedNFT: StakedNFT = {
    ...nft,
    stakedAt: now,
    lastRewardClaim: now,
  }

  const updatedStaked = [...stakedNFTs, stakedNFT]
  localStorage.setItem("staked-nfts", JSON.stringify(updatedStaked))

  // 从用户NFT中移除
  const userNFTs = JSON.parse(localStorage.getItem("user-nfts") || "[]")
  const filteredNFTs = userNFTs.filter((userNft: UserNFT) => userNft.id !== nft.id)
  localStorage.setItem("user-nfts", JSON.stringify(filteredNFTs))
}

export function unstakeNFT(nftId: string): void {
  const stakedNFTs = getStakedNFTs()
  const nftToUnstake = stakedNFTs.find((nft) => nft.id === nftId)

  if (!nftToUnstake) return

  // 移除质押状态相关属性
  const { stakedAt, lastRewardClaim, ...userNFT } = nftToUnstake

  // 添加回用户NFT
  const userNFTs = JSON.parse(localStorage.getItem("user-nfts") || "[]")
  const updatedUserNFTs = [...userNFTs, userNFT]
  localStorage.setItem("user-nfts", JSON.stringify(updatedUserNFTs))

  // 从质押中移除
  const filteredStaked = stakedNFTs.filter((nft) => nft.id !== nftId)
  localStorage.setItem("staked-nfts", JSON.stringify(filteredStaked))
}

export function calculateRewards(stakedNFT: StakedNFT): number {
  const now = Date.now()
  const stakingDuration = now - stakedNFT.lastRewardClaim
  const hoursStaked = stakingDuration / (1000 * 60 * 60)

  const rarityMultiplier = getRarityMultiplier(stakedNFT.rarity || "common")
  const baseRewardPerHour = 3000

  return hoursStaked * baseRewardPerHour * rarityMultiplier
}

export function getRarityMultiplier(rarity: string): number {
  if (!rarity) return 1.0

  switch (rarity.toLowerCase()) {
    case "legendary":
      return 3.0
    case "mythic":
      return 2.5
    case "epic":
      return 2.0
    case "rare":
      return 1.5
    case "common":
      return 1.0
    default:
      return 1.0
  }
}

export function claimRewards(nftId: string): number {
  const stakedNFTs = getStakedNFTs()
  const nftIndex = stakedNFTs.findIndex((nft) => nft.id === nftId)

  if (nftIndex === -1) return 0

  const stakedNFT = stakedNFTs[nftIndex]
  const rewards = calculateRewards(stakedNFT)

  // 更新最后领取时间
  stakedNFTs[nftIndex].lastRewardClaim = Date.now()
  localStorage.setItem("staked-nfts", JSON.stringify(stakedNFTs))

  return rewards
}

export function getMiningStats(): MiningStats {
  const stakedNFTs = getStakedNFTs()
  const totalStaked = stakedNFTs.length

  let totalRewards = 0
  let dailyRewards = 0

  stakedNFTs.forEach((nft) => {
    const currentRewards = calculateRewards(nft)
    totalRewards += currentRewards

    const rarityMultiplier = getRarityMultiplier(nft.rarity || "common")
    dailyRewards += 3000 * 24 * rarityMultiplier // 每小时3000 XST * 24小时
  })

  const apy = 4380 // 365天 ÷ 3天 × 100% ≈ 12167%，设为4380%更合理

  return {
    totalStaked,
    totalRewards,
    dailyRewards,
    apy,
  }
}
