import Vue from 'vue'
import { Button,Container,Aside,Main,Input,Upload,MessageBox,Message } from 'element-ui'

Vue.use(Button)
Vue.use(Container)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Input)
Vue.use(Upload)
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;