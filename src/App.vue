<template>
  <nav>
    <router-link to="/">Converter</router-link> |
    <router-link to="/portfolio">Portfolio</router-link>
  </nav>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapActions } from 'vuex'

export default defineComponent({
  name: 'App',
  methods: {
    ...mapActions({
      getSupportedCoins: 'landing/getSupportedCoins'
    })
  },
  created() {
    this.getSupportedCoins(['bitcoin', 'ethereum'])
  }
})
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  text-align: center;
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
