<template>
  <div class="usdBalance">
    <strong>USD баланс: ${{ USDBalance }}</strong>
    <div class="editBalanceForm">
      <VButton text="+" :on-click="topUpBalance({ count: summ, type: 'usd' })" />
      <input class="input" name="count" type="number" placeholder="Сумма" v-model="summ" />
      <VButton text="-" :on-click="withdrawBalance({ count: summ, type: 'usd' })" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapGetters, mapMutations } from 'vuex'

import { TopUpBalancePayload, WithdrawBalancePayload } from '@/store/modules/portfolioModule/types'
import VButton from '@/components/VButton.vue'

export default defineComponent({
  name: 'PortfolioUSDBalance',
  components: {
    VButton
  },
  data() {
    return {
      summ: 0
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
    ...mapGetters({
      USDBalance: 'portfolio/getUSDBalance'
    })
  }
})
</script>

<style lang="scss" scoped>
.usdBalance {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  background: white;
  filter: brightness(0.8);
  border-radius: 8px;
  padding: 15px;
  width: 100%;
}

.editBalanceForm {
  display: flex;
}

.button {
  border-radius: 4px;
  border: 1px solid #42b983;
  background: #42b983;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
}

.input {
  width: min(100%, 100px);
  margin: 0 10px;
}
</style>
