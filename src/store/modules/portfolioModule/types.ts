export interface PortfolioModuleState {
  USDBalance: number
  BTCBalance: number
  ETHBalance: number
}

export type Balace = 'usd' | 'btc' | 'eth'

export interface TopUpBalancePayload {
  type: Balace,
  count: number
}

export type WithdrawBalancePayload = TopUpBalancePayload

export interface BTCToETHPayload {
  btcCount: number
  btcPrice: number
  ethPrice: number
}

export type BTCToUSDPayload = Omit<BTCToETHPayload, 'ethPrice'>

export interface ETHToBTCPayload {
  ethCount: number
  ethPrice: number
  btcPrice: number
}

export type ETHToUSDPayload = Omit<ETHToBTCPayload, 'btcPrice'>

export interface USDToBTCPayload {
  usdCount: number
  btcPrice: number
}

export interface USDToETHPayload {
  usdCount: number
  ethPrice: number
}
