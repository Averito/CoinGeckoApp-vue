<template>
  <button class="button" @click="onClick">
    {{ text }}
  </button>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VButton',
  props: {
    text: {
      require: true,
      type: String as PropType<string>
    },
    onClick: {
      require: false,
      default: () => {},
      type: Function as PropType<() => unknown>
    }
  }
})
</script>

<style lang="scss" scoped>
.button {
  border-radius: 4px;
  border: 1px solid #42b983;
  background: #42b983;
  color: white;
  cursor: pointer;
  padding: 5px 10px;
  transition: background-color 0.5s ease, color 0.5s ease;

  &:hover {
    background-color: transparent;
    color: #42b983;
  }
}
</style>
