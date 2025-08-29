import { parseEther } from "viem"

export const XST_TOKEN = {
  address: "0x9876543210987654321098765432109876543210" as `0x${string}`,
  symbol: "XST",
  name: "XStarShark",
  decimals: 18,
  abi: [
    {
      inputs: [
        { name: "spender", type: "address" },
        { name: "amount", type: "uint256" },
      ],
      name: "approve",
      outputs: [{ name: "", type: "bool" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ name: "account", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        { name: "owner", type: "address" },
        { name: "spender", type: "address" },
      ],
      name: "allowance",
      outputs: [{ name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ] as const,
} as const

// StarSharks NFT Contract Configuration
export const STARSHARKS_CONTRACT = {
  address: "0x1234567890123456789012345678901234567890" as `0x${string}`,
  abi: [
    {
      inputs: [
        { name: "quantity", type: "uint256" },
        { name: "tokenAmount", type: "uint256" },
      ],
      name: "mintWithToken",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "totalSupply",
      outputs: [{ name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "maxSupply",
      outputs: [{ name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "mintPrice",
      outputs: [{ name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ] as const,
} as const

export const MINT_PRICE = parseEther("200000") // 200,000 XST per NFT (≈ 20 USDT at 0.0001 price)
export const MAX_SUPPLY = 2000

// XST Token Price Information
export const XST_PRICE_USDT = 0.0001 // Initial price: 0.0001 USDT per XST
export const MINT_PRICE_USDT = 20 // Fixed mint price: 20 USDT
