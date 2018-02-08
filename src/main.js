import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import router from './router/index'

Vue.use(VueRouter)

/* eslint-disable no-new */
// new Vue({
//   el: 'body',
//   components: { App }
// })

router.start(App, 'app')

