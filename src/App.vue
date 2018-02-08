
<style>
html {
  height: 100%;
}

body {
  height: 100%;
}

#app {
  color: #2c3e50;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
</style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu'

export default {
  data () {
    return {
      datePicker: {
        value: '',
        options: {
          quickClose: true,
          format: 'YYYY/MM/DD'
        }
      },
      switchA: {
        checked: false,
        size: 'small'
      }
    }
  },
  components: {
    Menu
  },
  methods: {
  }
}
</script>

