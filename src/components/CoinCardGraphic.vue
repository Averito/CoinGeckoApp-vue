<template>
  <div class="coinGraphic">
    <Line
      :chart-options="chartOptions"
      :chart-data="chartData"
      :chart-id="chartId"
      :plugins="plugins"
      :css-classes="cssClasses"
      :styles="styles"
      :width="width"
      :height="height"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale,
  Plugin
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  CategoryScale
)

export default defineComponent({
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    chartId: {
      type: String,
      default: 'line-chart'
    },
    chartDataValues: {
      default: () => [40, 39, 10, 40, 39, 80, 40],
      type: Array as PropType<number[]>
    },
    chartLabels: {
      default: () => ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      type: Array as PropType<string[]>
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
      type: Array as PropType<Plugin<'line'>[]>,
      default: () => []
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Цена в долларах',
            backgroundColor: '#f87979',
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

<style lang="scss" scoped>
.coinGraphic {
  min-width: 100px;
  padding: 10px 5px 5px 5px;
  border-radius: 8px;
  background-color: #eaeaea;
}
</style>
