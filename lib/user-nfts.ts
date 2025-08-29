import { sharkNFTs } from "./nft-data"

// 测试版本的用户NFT管理
export interface UserNFT {
  id: string
  tokenId: number
  sharkId: string
  mintedAt: number
  name: string
  image: string
  rarity: string
  attack: number
  defense: number
  speed: number
  special: string
}

function migrateUserNFTs(nfts: any[]): UserNFT[] {
  return nfts.map((nft) => {
    // 如果NFT已经有完整数据，直接返回
    if (nft.name && nft.image && nft.rarity && typeof nft.attack === "number") {
      return nft as UserNFT
    }

    // 否则从sharkNFTs数据中补充完整信息
    const sharkData = sharkNFTs.find((shark) => shark.id === Number.parseInt(nft.sharkId))

    if (!sharkData) {
      // 如果找不到对应的shark数据，使用默认值
      return {
        ...nft,
        name: "Unknown Shark",
        image: "/placeholder.svg?height=200&width=200",
        rarity: "Common",
        attack: 50,
        defense: 50,
        speed: 50,
        special: "None",
      } as UserNFT
    }

    return {
      ...nft,
      name: sharkData.name,
      image: sharkData.image,
      rarity: sharkData.rarity,
      attack: sharkData.attributes.attack,
      defense: sharkData.attributes.defense,
      speed: sharkData.attributes.speed,
      special: sharkData.attributes.special,
    } as UserNFT
  })
}

export function getUserNFTs(): UserNFT[] {
  if (typeof window === "undefined") return []

  const stored = localStorage.getItem("user-nfts")
  if (!stored) return []

  const rawNFTs = JSON.parse(stored)
  const migratedNFTs = migrateUserNFTs(rawNFTs)

  // 保存修复后的数据
  localStorage.setItem("user-nfts", JSON.stringify(migratedNFTs))

  return migratedNFTs
}

export function addUserNFT(sharkId: string): UserNFT {
  const userNFTs = getUserNFTs()
  const sharkData = sharkNFTs.find((shark) => shark.id === Number.parseInt(sharkId))

  if (!sharkData) {
    throw new Error(`Shark with id ${sharkId} not found`)
  }

  const newNFT: UserNFT = {
    id: `nft-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    tokenId: userNFTs.length + 1,
    sharkId,
    mintedAt: Date.now(),
    name: sharkData.name,
    image: sharkData.image,
    rarity: sharkData.rarity,
    attack: sharkData.attributes.attack,
    defense: sharkData.attributes.defense,
    speed: sharkData.attributes.speed,
    special: sharkData.attributes.special,
  }

  const updatedNFTs = [...userNFTs, newNFT]
  localStorage.setItem("user-nfts", JSON.stringify(updatedNFTs))

  return newNFT
}

export function getRandomSharkId(): string {
  const randomIndex = Math.floor(Math.random() * sharkNFTs.length)
  return sharkNFTs[randomIndex].id.toString()
}
