<template>
  <div class="container">
    <input class="input" name="valueConvert" type="number" v-model="valueToConvert" />
    <VButton v-if="usdShow" text="USD" :on-click="onClickUSD" />
    <VButton v-if="btcShow" text="BTC" :on-click="onClickBTC" />
    <VButton v-if="ethShow" text="ETH" :on-click="onClickETH" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import VButton from '@/components/VButton.vue'
import { SupportedSymbols, Coin } from '@/api/coinGecko/getCoins/types'

export default defineComponent({
  name: 'CoinCardConverter',
  components: {
    VButton
  },
  data() {
    return {
      valueToConvert: 0
    }
  },
  props: {
    convertType: {
      require: true,
      type: Array as PropType<SupportedSymbols[]>
    },
    type: {
      require: true,
      type: String as PropType<SupportedSymbols>
    },
    currentPrice: {
      require: true,
      type: Number as PropType<number>
    }
  },
  methods: {
    ...mapMutations({
      USDToBTC: 'portfolio/USDToBTC',
      USDToETH: 'portfolio/USDToETH',
      BTCToUSD: 'portfolio/BTCToUSD',
      BTCToETH: 'portfolio/BTCToETH',
      ETHToUSD: 'portfolio/ETHToUSD',
      ETHToBTC: 'portfolio/ETHToBTC'
    }),
    onClickUSD() {
      if (this.valueToConvert < 0) return

      switch (this.type) {
        case 'eth':
          this.ETHToUSD({ ethCount: this.valueToConvert, ethPrice: this.ethPrice })
          break
        default:
          this.BTCToUSD({ btcCount: this.valueToConvert, btcPrice: this.btcPrice })
      }
    },
    onClickETH() {
      if (this.valueToConvert < 0) return

      switch (this.type) {
        case 'btc':
          this.BTCToETH({ btcCount: this.valueToConvert, btcPrice: this.btcPrice, ethPrice: this.ethPrice })
          break
        default:
          this.USDToETH({ usdCount: this.valueToConvert, ethPrice: this.ethPrice })
      }
    },
    onClickBTC() {
      if (this.valueToConvert < 0) return

      switch (this.type) {
        case 'eth':
          this.ETHToBTC({ ethCount: this.valueToConvert, ethPrice: this.ethPrice, btcPrice: this.btcPrice })
          break
        default:
          this.USDToBTC({ usdCount: this.valueToConvert, btcPrice: this.btcPrice })
      }
    }
  },
  computed: {
    ...mapGetters({
      coins: 'landing/getCoins',
      USDBalance: 'portfolio/getUSDBalance',
      BTCBalance: 'portfolio/getBTCBalance',
      ETHBalance: 'portfolio/getETHBalance'
    }),
    usdShow(): boolean {
      return (this.convertType as SupportedSymbols[]).includes('usd')
    },
    btcShow(): boolean {
      return (this.convertType as SupportedSymbols[]).includes('btc')
    },
    ethShow(): boolean {
      return (this.convertType as SupportedSymbols[]).includes('eth')
    },
    usdPrice(): number {
      return this.coins.find((coin: Coin) => coin.symbol === 'usd').current_price
    },
    btcPrice(): number {
      return this.coins.find((coin: Coin) => coin.symbol === 'btc').current_price
    },
    ethPrice(): number {
      return this.coins.find((coin: Coin) => coin.symbol === 'eth').current_price
    },
    currentBalance(): number {
      const currentCoin = this.coins.find((coin: Coin) => coin.symbol === this.type)
      switch (currentCoin.symbol) {
        case 'btc':
          return this.BTCBalance
        case 'eth':
          return this.ETHBalance
        case 'usd':
        default:
          return this.USDBalance
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  padding: 10px 5px 5px 5px;
  border-radius: 8px;
  background-color: #eaeaea;
}

.button {
  margin: 0 5px;
}

@media all and (max-width: 440px) {
  .input {
    width: 60%;
  }
}
</style>
