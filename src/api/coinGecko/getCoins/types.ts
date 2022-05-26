export type SupportedCoins = 'ethereum' | 'bitcoin' | 'usd'
export type SupportedSymbols = 'eth' | 'btc' | 'usd'

export interface Coin {
  id: string
  symbol: SupportedSymbols
  name: string
  image: string
  current_price: number
}

export type BaseValue = 'usd'
