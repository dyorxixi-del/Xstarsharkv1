export interface SharkNFT {
  id: number
  name: string
  image: string
  rarity: "Common" | "Rare" | "Epic" | "Legendary"
  attributes: {
    attack: number
    defense: number
    speed: number
    special: string
  }
  description: string
}

export const sharkNFTs: SharkNFT[] = [
  {
    id: 1,
    name: "Punk Shark",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jhxNMJeW7HPvLkxFRr0Oc9KH6afrKD.png",
    rarity: "Epic",
    attributes: {
      attack: 85,
      defense: 70,
      speed: 90,
      special: "Mohawk Rage",
    },
    description:
      "A rebellious shark with a colorful mohawk and golden shades. Known for its fierce attitude and punk rock style.",
  },
  {
    id: 2,
    name: "Gentleman Shark",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dJcIhYcsFfHWGJZ6tbeRl1HODocMSh.png",
    rarity: "Rare",
    attributes: {
      attack: 75,
      defense: 85,
      speed: 65,
      special: "Monocle Focus",
    },
    description: "A sophisticated shark with impeccable manners and a golden monocle. Prefers civilized combat.",
  },
  {
    id: 3,
    name: "Royal Shark",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-kMKyvsj9woz8HVC8bh9x2HLaclF9sk.png",
    rarity: "Legendary",
    attributes: {
      attack: 95,
      defense: 90,
      speed: 80,
      special: "Divine Wings",
    },
    description: "The crowned ruler of the ocean depths, blessed with angelic wings and supreme power.",
  },
  {
    id: 4,
    name: "Cool Shark",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0KMXoWnikDaYxFpcb2mNIxJ5x07OqM.png",
    rarity: "Epic",
    attributes: {
      attack: 80,
      defense: 75,
      speed: 95,
      special: "VR Vision",
    },
    description: "A tech-savvy shark with VR goggles and street cred. Always ahead of the latest trends.",
  },
  {
    id: 5,
    name: "Pirate Shark",
    image: "/nfts/shark-pirate.png",
    rarity: "Rare",
    attributes: {
      attack: 90,
      defense: 70,
      speed: 75,
      special: "Treasure Hunt",
    },
    description: "A swashbuckling shark captain with an eye patch and treasure chest. Rules the seven seas.",
  },
  {
    id: 6,
    name: "Ninja Shark",
    image: "/nfts/shark-ninja.png",
    rarity: "Epic",
    attributes: {
      attack: 85,
      defense: 65,
      speed: 100,
      special: "Shadow Strike",
    },
    description: "A stealthy shark assassin trained in ancient martial arts. Strikes from the shadows.",
  },
  {
    id: 7,
    name: "Astronaut Shark",
    image: "/nfts/shark-astronaut.png",
    rarity: "Rare",
    attributes: {
      attack: 70,
      defense: 90,
      speed: 60,
      special: "Zero Gravity",
    },
    description: "An intergalactic explorer shark with a space helmet. Swims through the cosmos.",
  },
  {
    id: 8,
    name: "Wizard Shark",
    image: "/nfts/shark-wizard.png",
    rarity: "Legendary",
    attributes: {
      attack: 100,
      defense: 80,
      speed: 70,
      special: "Magic Tsunami",
    },
    description: "A mystical shark mage wielding ancient ocean magic. Master of water spells.",
  },
  {
    id: 9,
    name: "Cyber Shark",
    image: "/nfts/shark-cyberpunk.png",
    rarity: "Epic",
    attributes: {
      attack: 88,
      defense: 82,
      speed: 92,
      special: "Neon Pulse",
    },
    description: "A futuristic shark enhanced with cybernetic implants. Glows with neon energy.",
  },
  {
    id: 10,
    name: "Samurai Shark",
    image: "/nfts/shark-samurai.png",
    rarity: "Legendary",
    attributes: {
      attack: 98,
      defense: 95,
      speed: 75,
      special: "Katana Slash",
    },
    description: "An honorable warrior shark following the way of the samurai. Wields a legendary katana.",
  },
]

export const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "Common":
      return "text-gray-400 border-gray-400"
    case "Rare":
      return "text-blue-400 border-blue-400"
    case "Epic":
      return "text-purple-400 border-purple-400"
    case "Legendary":
      return "text-yellow-400 border-yellow-400"
    default:
      return "text-gray-400 border-gray-400"
  }
}
