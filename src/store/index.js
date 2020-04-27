import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    socket:null,
    oneself:{
      id: '123456',
      name: 'Matthew Wiggins',
      headPortrait: "../assets/bird.png",
      intro: "Bootstrap is an open source toolkit fordeveloping web with HTML.",
      country: 'China',
      phone: '136XXXXXXXX',
      email: '850839565@qq.com',
      time: '21:07'
    },
    roomInfo:{
      roomId: '1',
      face: '',
      name: 'Bootstrap Themes',
      members: 35,
      topic: 'HTML,CSS,and Javascript Help',
      description: '感觉很烦，歪比歪比，外币八部',
      url: ''
    },
    chatRecord:[
      {face:'',time:'21:28',id:"123",name:"张三",info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
      {face:'',time:'21:28',id:"456",name:"李四",info:"今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
      {face:'',time:'21:28',id:"456",name:"李四",info:"123456哈哈"},
      {face:'',time:'21:28',id:"123456",name:"cjx",info:"今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
      {face:'',time:'21:28',id:"123456",name:"cjx",info:"太难了太难了爷要晕了"},
      {face:'',time:'21:28',id:"123",name:"张三",info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
      {face:'',time:'21:28',id:"456",name:"李四",info:"今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
      {face:'',time:'21:28',id:"456",name:"李四",info:"123456哈哈"},
      {face:'',time:'21:28',id:"123456",name:"cjx",info:"今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
      {face:'',time:'21:28',id:"123456",name:"cjx",info:"太难了太难了爷要晕了"}
    ],
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
