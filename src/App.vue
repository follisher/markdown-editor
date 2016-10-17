
<style src="radon-ui/dist/static/css/dist.css"></style>
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
    <rd-notification></rd-notification>
  </div>
</template>

<script>
import Menu from './components/Menu'
import { rdDatepicker, rdSwitch } from 'radon-ui'

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
    rdDatepicker,
    rdSwitch,
    Menu
  },
  methods: {
    test () {
      this.$Modal.confirm('aa', 'test', () => {
        console.log('ok')
      },
      () => {
        console.log('cancel')
      })
    }
  }
}
</script>

