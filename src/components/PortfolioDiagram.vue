<template>
  <Doughnut
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  Plugin
} from 'chart.js'
import { mapGetters } from 'vuex'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

export default defineComponent({
  name: 'PortfolioDiagram',
  components: {
    Doughnut
  },
  props: {
    chartDataValues: {
      default: () => [20, 40, 60],
      type: Array as PropType<number[]>
    },
    chartId: {
      type: String,
      default: 'doughnut-chart'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object as PropType<Partial<CSSStyleDeclaration>>,
      default: () => {}
    },
    plugins: {
      type: Array as PropType<Plugin<'doughnut'>[]>,
      default: () => []
    }
  },
  computed: {
    ...mapGetters({
      coins: 'landing/getCoins',
      USDBalance: 'portfolio/getUSDBalance',
      BTCBalance: 'portfolio/getBTCBalance',
      ETHBalance: 'portfolio/getETHBalance'
    }),
    chartData() {
      return {
        labels: ['Bitcoin', 'Ethereum', 'USD'],
        datasets: [
          {
            backgroundColor: ['#e8c029', '#676362', '#00D8FF'],
            data: this.chartDataValues
          }
        ]
      }
    }
  },
  setup() {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return {
      chartOptions
    }
  }
})
</script>
