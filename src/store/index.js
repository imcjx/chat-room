import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    oneself:{
      id: '123456',
      name: 'Matthew Wiggins',
      headPortrait: "../assets/bird.png",
      intro: "Bootstrap is an open source toolkit fordeveloping web with HTML.",
      Country: 'China',
    },
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
