import { Module } from 'vuex'

import {
  BTCToETHPayload,
  BTCToUSDPayload, ETHToBTCPayload, ETHToUSDPayload,
  USDToETHPayload,
  PortfolioModuleState,
  TopUpBalancePayload, USDToBTCPayload,
  WithdrawBalancePayload
} from '@/store/modules/portfolioModule/types'

const insufficientFundsError = 'Недостаточно средств на балансе'
const successTransaction = 'Средства конвертированы успешно'

export const portfolioModule: Module<PortfolioModuleState, Record<string, unknown>> = {
  namespaced: true,
  state: () => ({
    USDBalance: 0,
    BTCBalance: 0,
    ETHBalance: 0
  }),
  getters: {
    getUSDBalance(state) {
      return state.USDBalance
    },
    getBTCBalance(state) {
      return state.BTCBalance
    },
    getETHBalance(state) {
      return state.ETHBalance
    }
  },
  mutations: {
    topUpBalance(state, payload: TopUpBalancePayload) {
      const { count, type } = payload

      if (count < 0) return

      switch (type) {
        case 'btc':
          state.BTCBalance += count
          break
        case 'eth':
          state.ETHBalance += count
          break
        case 'usd':
        default:
          state.USDBalance += count
      }
    },
    withdrawBalance(state, payload: WithdrawBalancePayload) {
      const { count, type } = payload

      if (count < 0) return

      switch (type) {
        case 'btc':
          state.BTCBalance -= (state.BTCBalance - count) < 0 ? 0 : count
          break
        case 'eth':
          state.ETHBalance -= (state.ETHBalance - count) < 0 ? 0 : count
          break
        case 'usd':
        default:
          state.USDBalance -= (state.USDBalance - count) < 0 ? 0 : count
      }
    },
    BTCToUSD(state, payload: BTCToUSDPayload) {
      const { btcPrice, btcCount } = payload

      if (btcCount > state.BTCBalance) {
        return alert(insufficientFundsError)
      }

      const usd = btcCount * btcPrice
      state.USDBalance += usd
      state.BTCBalance -= btcCount

      alert(successTransaction)
    },
    BTCToETH(state, payload: BTCToETHPayload) {
      const { btcPrice, btcCount, ethPrice } = payload

      if (btcCount > state.BTCBalance) {
        return alert(insufficientFundsError)
      }

      const eth = btcCount * btcPrice / ethPrice
      state.ETHBalance += eth
      state.BTCBalance -= btcCount

      alert(successTransaction)
    },
    ETHToUSD(state, payload: ETHToUSDPayload) {
      const { ethCount, ethPrice } = payload

      if (ethCount > state.ETHBalance) {
        return alert(insufficientFundsError)
      }

      const usd = ethCount * ethPrice
      state.USDBalance += usd
      state.ETHBalance -= ethCount

      alert(successTransaction)
    },
    ETHToBTC(state, payload: ETHToBTCPayload) {
      const { ethCount, ethPrice, btcPrice } = payload

      if (ethCount > state.ETHBalance) {
        return alert(insufficientFundsError)
      }

      const btc = ethCount * ethPrice / btcPrice
      state.BTCBalance += btc
      state.ETHBalance -= ethCount

      alert(successTransaction)
    },
    USDToBTC(state, payload: USDToBTCPayload) {
      const { usdCount, btcPrice } = payload

      if (usdCount > state.USDBalance) {
        return alert(insufficientFundsError)
      }

      const btc = usdCount / btcPrice
      state.BTCBalance += btc
      state.USDBalance -= usdCount

      alert(successTransaction)
    },
    USDToETH(state, payload: USDToETHPayload) {
      const { usdCount, ethPrice } = payload

      if (usdCount > state.USDBalance) {
        return alert(insufficientFundsError)
      }

      const eth = usdCount / ethPrice
      state.ETHBalance += eth
      state.USDBalance -= usdCount

      alert(successTransaction)
    }
  }
}
