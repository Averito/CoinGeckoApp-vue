<template>
  <div class="card">
    <img class="coinImage" :src="coin?.image" :alt="coin?.id" />
    <p class="cardName">{{ coin?.name }}</p>
    <p class="balance">{{ beautifulBalance }}</p>
    <input class="input" name="count" type="number" placeholder="Сумма" v-model="summ" />
    <div class="buttons">
      <VButton text="Положить" :on-click="topUpBalance({ count: summ, type: coin?.symbol })" />
      <VButton text="Снять" :on-click="withdrawBalance({ count: summ, type: coin?.symbol })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { mapMutations } from 'vuex'

import { Coin } from '@/api/coinGecko/getCoins/types'
import { TopUpBalancePayload, WithdrawBalancePayload } from '@/store/modules/portfolioModule/types'
import VButton from '@/components/VButton.vue'

export default defineComponent({
  name: 'PortfolioBalanceCard',
  components: {
    VButton
  },
  data() {
    return {
      summ: 0
    }
  },
  props: {
    coin: {
      require: true,
      type: Object as PropType<Coin>
    },
    balance: {
      require: true,
      type: Number as PropType<number>
    }
  },
  methods: {
    ...mapMutations({
      topUp: 'portfolio/topUpBalance',
      withdraw: 'portfolio/withdrawBalance'
    }),
    topUpBalance(payload: TopUpBalancePayload) {
      return () => this.topUp(payload)
    },
    withdrawBalance(payload: WithdrawBalancePayload) {
      return () => this.withdraw(payload)
    }
  },
  computed: {
    beautifulBalance() {
      return this.balance?.toFixed(4)
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(100% / 2);
  background: white;
  filter: brightness(0.8);
  border-radius: 8px;
  padding: 15px;

  &:not(:last-of-type) {
    margin: 0 10px 0 0;
  }
}

.balance {
  color: #42b983;
  margin: 0;
}

.cardName, .balance {
  font-size: 20px;
  font-weight: bold;
  margin: 5px 0;
}

.coinImage {
  width: 80px;
  height: 80px;
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button:not(:last-of-type) {
  margin: 0 0 5px 0;
}

.input {
  width: 50%;
  margin: 5px 0;

  &:focus {
    outline: none;
  }
}
</style>
