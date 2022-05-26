import { Module } from 'vuex'

import { Coin, SupportedCoins } from '@/api/coinGecko/getCoins/types'
import { getCoins } from '@/api/coinGecko/getCoins'

interface LandingModuleState {
  coins: Coin[]
}

export const landingModule: Module<LandingModuleState, Record<string, unknown>> = {
  namespaced: true,
  state: () => ({
    coins: [] as Coin[]
  }),
  getters: {
    getCoins(state) {
      return state.coins
    }
  },
  mutations: {
    setCoins(state, coins: Coin[]) {
      state.coins = coins
    }
  },
  actions: {
    async getSupportedCoins({ commit }, supportedCoins: SupportedCoins[]) {
      const coins = await getCoins({
        per_page: (3).toString(),
        vs_currency: 'usd',
        ids: supportedCoins.join(',')
      })

      commit('setCoins', coins)
    }
  }
}
