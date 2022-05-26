<template>
  <div class="card">
    <div class="headCard">
      <CoinCardPreview :name="coin.name" :image="coin.image" :id="coin.id" />
      <CoinCardConverter :convert-type="converterType" :type="coin.symbol" :current-price="coin.current_price" />
    </div>
    <CoinCardGraphic v-if="!graphicHide" :chart-data-values="graphPrices" :chart-labels="graphLabels" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import moment from 'moment'

import { Coin, SupportedSymbols } from '@/api/coinGecko/getCoins/types'
import { getMarketChart } from '@/api/coinGecko/getMarketChart'
import CoinCardPreview from '@/components/CoinCardPreview.vue'
import CoinCardConverter from '@/components/CoinCardConverter.vue'
import CoinCardGraphic from '@/components/CoinCardGraphic.vue'

export default defineComponent({
  name: 'CoinCard',
  components: {
    CoinCardPreview,
    CoinCardConverter,
    CoinCardGraphic
  },
  data() {
    return {
      graphLabels: [] as string[],
      graphPrices: [] as number[]
    }
  },
  props: {
    coin: {
      require: true,
      type: Object as PropType<Coin>
    },
    type: {
      require: true,
      type: String as PropType<SupportedSymbols>
    }
  },
  computed: {
    converterType(): string[] {
      switch (this.type) {
        case 'eth':
          return ['usd', 'btc']
        case 'btc':
          return ['usd', 'eth']
        case 'usd':
        default:
          return ['btc', 'eth']
      }
    },
    graphicHide(): boolean {
      return this.type === 'usd'
    }
  },
  async created() {
    const graph = await getMarketChart({
      vs_currency: 'usd',
      days: (14).toString(),
      interval: 'daily'
    }, this.coin?.id as string)

    let { prices } = graph

    // Делаю обрезку потому что api сегодняшний день дублирует
    prices = prices.slice(0, prices.length - 1)
    this.graphLabels = prices.map(value => moment(value[0]).format('DD/MM'))
    this.graphPrices = prices.map(value => +value[1].toFixed(2))
  }
})
</script>

<style lang="scss" scoped>
.card:not(:last-of-type) {
  margin: 0 0 10px 0;
}

.headCard {
  display: flex;
  margin: 0 0 10px 0;
}
</style>
