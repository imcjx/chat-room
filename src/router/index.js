import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Edit from '../components/Edit.vue'
import Chatroom from '../components/Chatroom.vue'
import Personal from '../components/Personal.vue'

Vue.use(VueRouter)

const routes = [
  {path:'/', redirect:'/home'},
  {
    path:'/home', 
    component: Home,
    redirect: '/home/personal',
    children:[
      {path:'edit', component: Edit},
      {path:'chatroom', component: Chatroom, name:"chat"},
      {path:'personal', component: Personal}
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router




