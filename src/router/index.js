import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  // Index
  '/': {
    name: 'index',
    component: (resolve) => {
      require(['../views/index.vue'], resolve)
    }
  },
  '/editor': {
    name: 'editor',
    component: (resolve) => {
      require(['../views/editor.vue'], resolve)
    }
  }
})

export default router
