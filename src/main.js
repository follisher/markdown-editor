import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import { RadonInstall } from 'radon-ui'
import router from './router/index'

Vue.use(VueRouter)

Vue.use(RadonInstall, {
  Modal: true
})

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })

router.start(App, 'app')

