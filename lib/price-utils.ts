// 价格计算工具函数
export interface TokenPrice {
  price: number // USDT价格
  lastUpdated: number
}

// 模拟价格获取函数，将来可以连接到实际API
export async function getXSTPrice(): Promise<TokenPrice> {
  // 目前使用固定的初始价格 0.0001 USDT
  // 将来可以连接到实际的价格API
  return {
    price: 0.0001,
    lastUpdated: Date.now(),
  }
}

// 计算需要多少XST来达到目标USDT价值
export function calculateXSTAmount(targetUSDT: number, xstPrice: number): number {
  return Math.ceil(targetUSDT / xstPrice)
}

// 格式化价格显示
export function formatPrice(price: number): string {
  if (price < 0.001) {
    return price.toFixed(6)
  } else if (price < 1) {
    return price.toFixed(4)
  } else {
    return price.toFixed(2)
  }
}

// 格式化XST数量显示
export function formatXSTAmount(amount: number): string {
  return amount.toLocaleString()
}
