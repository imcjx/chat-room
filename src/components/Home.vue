<template>
    <el-container class="home-container">
        <el-aside style="width: 90px">
            <div><img src="../assets/bird.png" alt="bird"></div>
            <ul>
                <li><router-link to="/home/edit"><i class="el-icon-edit-outline"></i></router-link></li>
                <li><router-link :to="{path:'/home/chatroom',query:{roomId: this.$store.state.roomInfo.roomId}}"><i class="el-icon-chat-square"></i></router-link></li>
                <li><router-link to="/home/personal"><i class="el-icon-user"></i></router-link></li>
            </ul>
            <i class="el-icon-setting"></i>
        </el-aside>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>

<script>
// import io from 'socket.io-client';
export default {
    data(){
        return{
            
        }
    },
    methods:{
        test(){

        }
        //判断新老用户
        // judUser(){
        //     let id=JSON.parse(localStorage.getItem('id'));
        //     return (id==null?0:1);
        // }
    },
    mounted(){ 
        this.$store.state.socket=io('http://47.94.81.206:80/');
        this.$store.state.socket.on('connect', ()=>{  //连接成功绑定的事件
            console.log('connect...');
            //加入初始房间
            setTimeout(()=>{
                //初始化信息
                this.$store.state.socket.emit('init');
                setTimeout(()=>{
                    //加入默认房间
                    this.$store.state.socket.emit('join_default',{user_id:this.$store.state.oneself.id})

                },500)
            },100)
        });
        //监听加入默认房间是否成功
        this.$store.state.socket.on('join_default', data=>{
            this.$store.state.socket.emit('updateChatRecord',{
                url: `room=${data.roomid}`,
                admin: parseInt(data.roomid),
            });
            this.$store.state.socket.emit('updateRoom',{
                home_url: `room=${data.roomid}`,
                admin_id: parseInt(data.roomid),
            });
        })
        //监听加入普通房间是否成功
        this.$store.state.socket.on('join', data=>{
            this.$store.state.socket.emit('updateChatRecord',{
                url: `room=${data.roomid}`,
                admin: parseInt(data.roomid),
            });
            this.$store.state.socket.emit('updateRoom',{
                home_url: `room=${data.roomid}`,
                admin_id: parseInt(data.roomid),
            });
        })
         //获得初始化信息
        this.$store.state.socket.on('init',(data)=>{
            this.$store.state.oneself.id=data.id;
            this.$store.state.oneself.name=data.name;
            this.$store.state.oneself.headPortrait=data.face;
            this.$store.state.oneself.intro=data.info;
            this.$store.state.oneself.country=data.country;
            this.$store.state.oneself.phone=data.phone;
            this.$store.state.oneself.email=data.email;
            this.$store.state.oneself.time=data.time;
        })
        //断线
        this.$store.state.socket.on('disconnect', () =>{
            console.log('disconnect...');
        })
        
        //更新聊天记录
        this.$store.state.socket.on('updateChatRecord', data => {
            console.log('更新聊天记录，返回值：');
            console.log(data);
            this.$store.state.chatRecord=data;
        })
        //更新房间信息
        this.$store.state.socket.on('updateRoom', data => {
            console.log(data);
            this.$store.state.roomInfo.members=data.num;
            this.$store.state.roomInfo.roomId=data.admin;
            this.$store.state.roomInfo.face=data.home_face;
            this.$store.state.roomInfo.name=data.home_name;
            this.$store.state.roomInfo.topic=data.home_topic;
            this.$store.state.roomInfo.url=data.room
            this.$store.state.roomInfo.description=data.home_description
        })
        
    }
}
</script>

<style scoped>
.el-container{
    height: 100%;
}

.el-main{
    background-color: rgb(245,246,250);
    padding: 0;
}

.el-aside{
    position: relative;
}

.el-aside div img{
    width: 55%;
    position: absolute;
    left: 50%;
    top: 24px;
    transform: translateX(-50%);
}

.el-aside ul{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    list-style: none;
}

.el-aside li{
    margin: 30px 0;
}

.router-link-active{
    color: rgb(16,126,255);
}

.el-aside i{
    font-size: 22px;
    font-weight: bold;
    color: rgb(174,180,186);
    cursor: pointer;
}

.el-aside > i{
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
}

.el-aside i:hover{
    color: rgb(16,126,255);
}

</style>
