<template>
  <div class="wrapper">
    <div class="container">
      <PortfolioBalance />
      <PortfolioDiagram :chart-data-values="chartDataValues" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PortfolioBalance from '@/components/PortfolioBalance.vue'
import PortfolioDiagram from '@/components/PortfolioDiagram.vue'
import { mapGetters } from 'vuex'
import { Coin } from '@/api/coinGecko/getCoins/types'

export default defineComponent({
  name: 'PortfolioView',
  components: {
    PortfolioBalance,
    PortfolioDiagram
  },
  computed: {
    ...mapGetters({
      coins: 'landing/getCoins',
      USDBalance: 'portfolio/getUSDBalance',
      BTCBalance: 'portfolio/getBTCBalance',
      ETHBalance: 'portfolio/getETHBalance'
    }),
    BTCInUSD(): number {
      return this.coins.find((coin: Coin) => coin.symbol === 'btc')?.current_price * this.BTCBalance
    },
    ETHInUSD(): number {
      return this.coins.find((coin: Coin) => coin.symbol === 'eth')?.current_price * this.ETHBalance
    },
    summBalanceInUSD(): number {
      return this.BTCInUSD + this.ETHInUSD + this.USDBalance
    },
    chartDataValues(): number[] {
      const btcPercentage = (this.BTCInUSD / this.summBalanceInUSD) * 100
      const ethPercentage = (this.ETHInUSD / this.summBalanceInUSD) * 100
      const usdPercentage = (this.USDBalance / this.summBalanceInUSD) * 100

      return [btcPercentage, ethPercentage, usdPercentage]
    }
  }
})
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}

.container {
  width: min(100%, 1000px);
}
</style>
