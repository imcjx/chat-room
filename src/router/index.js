import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Edit from '../components/Edit.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/', component: Home},
  {path:'/edit', component: Edit}
]

const router = new VueRouter({
  routes
})

export default router
