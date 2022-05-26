<template>
  <div class="wrapper">
    <div class="container">
      <CoinCard v-for="coin in coins" :key="coin.id" :coin="coin" :type="coin.symbol" />
      <CoinCard :coin="usd" :type="usd.symbol" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

import CoinCard from '@/components/CoinCard.vue'
import { Coin } from '@/api/coinGecko/getCoins/types'

export default defineComponent({
  name: 'CoverterView',
  data() {
    return {
      usd: {
        id: 'usd',
        name: 'USD',
        symbol: 'usd',
        image: '',
        current_price: 1
      } as Coin
    }
  },
  components: {
    CoinCard
  },
  computed: {
    ...mapGetters({
      coins: 'landing/getCoins'
    })
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
