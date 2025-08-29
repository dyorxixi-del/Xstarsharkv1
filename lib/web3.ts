import { createConfig, http } from "wagmi"
import { injected, metaMask, walletConnect } from "wagmi/connectors"
import { defineChain } from "viem"

const okxChain = defineChain({
  id: 66,
  name: "OKC",
  nativeCurrency: {
    decimals: 18,
    name: "OKT",
    symbol: "OKT",
  },
  rpcUrls: {
    default: { http: ["https://exchainrpc.okex.org"] },
  },
  blockExplorers: {
    default: { name: "OKLink", url: "https://www.oklink.com/okc" },
  },
})

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo-project-id"

export const config = createConfig({
  chains: [okxChain],
  connectors: [injected(), metaMask(), walletConnect({ projectId })],
  transports: {
    [okxChain.id]: http(),
  },
})
