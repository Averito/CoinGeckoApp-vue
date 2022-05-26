<template>
  <div class="coinPreview">
    <img v-if="image" class="coinImage" :src="image" :alt="id" />
    <p class="coinName">{{ name }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'CoinCardPreview',
  props: {
    id: {
      require: true,
      type: String as PropType<string>
    },
    name: {
      require: true,
      type: String as PropType<string>
    },
    image: {
      require: true,
      type: String as PropType<string>
    }
  }
})
</script>

<style lang="scss" scoped>
.coinPreview {
  min-width: 100px;
  padding: 10px 5px 5px 5px;
  border-radius: 8px;
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 0 0;
}

.coinImage {
  width: 50px;
  height: 50px;
}

.coinName {
  margin: 5px 0 10px 0;
  font-weight: bold;
}
</style>
