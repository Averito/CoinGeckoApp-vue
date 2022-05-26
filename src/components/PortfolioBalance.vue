<template>
  <div>
    <div class="cards">
      <PortfolioBalanceCard :coin="coins[0]" :balance="BTCBalance" />
      <PortfolioBalanceCard :coin="coins[1]" :balance="ETHBalance" />
    </div>
    <PortfolioUSDBalance />
    <p class="usdGrade">
      Оценка портфеля по USD: ${{ usdGrade }}
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

import PortfolioBalanceCard from '@/components/PortfolioBalanceCard.vue'
import PortfolioUSDBalance from '@/components/PortfolioUSDBalance.vue'
import { Coin } from '@/api/coinGecko/getCoins/types'

export default defineComponent({
  name: 'PortfolioBalance',
  components: {
    PortfolioBalanceCard,
    PortfolioUSDBalance
  },
  computed: {
    ...mapGetters({
      coins: 'landing/getCoins',
      USDBalance: 'portfolio/getUSDBalance',
      BTCBalance: 'portfolio/getBTCBalance',
      ETHBalance: 'portfolio/getETHBalance'
    }),
    BTCToUSD(): number {
      return this.coins.find((coin: Coin) => coin.symbol === 'btc')?.current_price * this.BTCBalance
    },
    ETHToUSD(): number {
      return this.coins.find((coin: Coin) => coin.symbol === 'eth')?.current_price * this.ETHBalance
    },
    usdGrade(): number {
      return (this.BTCToUSD + this.ETHToUSD + this.USDBalance).toFixed(2)
    }
  }
})
</script>

<style lang="scss" scoped>
.cards {
  display: flex;
  margin: 0 0 10px 0;
}

.usdGrade {
  color: #42b983;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
}
</style>
