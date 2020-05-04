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
        <div style="display:none">
             <el-button :plain="true" @click="successCreate" id="successCreate">成功</el-button>
             <el-button :plain="true" @click="errorCreate" id="errorCreate">成功</el-button>
        </div>
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
        entitiesToUtf16(str) {
            return str.replace(/&#(\d+);/g, function (match, dec) {
                let H = Math.floor((dec - 0x10000) / 0x400) + 0xD800;
                let L = Math.floor(dec - 0x10000) % 0x400 + 0xDC00;
                return String.fromCharCode(H, L);
            });
        },
        //创建房间成功显示弹窗
        successCreate() {
            this.$message({
                showClose: true,
                message: '房间创建成功，自动跳转中...',
                type: 'success'
            });
        },
        //创建房间失败显示弹窗
        errorCreate() {
            this.$message({
                showClose: true,
                message: '房间创建失败，检查是否已创建过房间',
                type: 'error'
            });
        },
        //心跳
        heartbeat() {
            //每隔5s发送消息告诉浏览器还活着
            setInterval(()=>{
                this.$store.state.socket.emit('heartbeat',{
                    user_id:this.$store.state.oneself.id,
                    room:this.$store.state.roomInfo.roomId
                });
            },5000)
        }
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
                    if(this.$route.query.roomId=='1'||this.$route.query.roomId==undefined){
                        //加入默认房间
                        this.$store.state.socket.emit('join_default',{user_id:this.$store.state.oneself.id})
                    }else{
                        this.$store.state.socket.emit('join',{
                            user_name:this.$store.state.oneself.name,
                            room: this.$route.query.roomId
                        })
                    }
                },500)
            },100)
        });
        //监听加入默认房间是否成功
        this.$store.state.socket.on('join_default', data=>{
            this.$store.state.socket.emit('updateChatRecord',{
                url: data.roomid,
                admin: parseInt(data.roomid),
            });
            this.$store.state.socket.emit('updateRoom',{
                home_url: data.roomid,
                admin_id: parseInt(data.roomid),
            });
            //加入房间后发送心跳
            setTimeout(()=>{
                this.heartbeat();
            },50)
        })
        //监听加入普通房间是否成功
        this.$store.state.socket.on('join', data=>{
            if(data.key==1){
                this.$store.state.socket.emit('updateChatRecord',{
                url: data.roomid,
                admin: parseInt(data.roomid),
                });
                this.$store.state.socket.emit('updateRoom',{
                    home_url: data.roomid,
                    admin_id: parseInt(data.roomid),
                });
            }else{
                this.$message({
                    message:"加入房间失败(请检查房间url是否正确)，返回原房间中...",
                    type:'error'
                })
                //路由跳转
                setTimeout(()=>{
                    this.$router.push({path:'/home/chatroom',query:{roomId: this.$store.state.roomInfo.roomId}})
                },3000)
            }
            //加入房间后发送心跳
            setTimeout(()=>{
                this.heartbeat();
            },50)
        })
         //获得初始化信息
        this.$store.state.socket.on('init',(data)=>{
            this.$store.state.oneself.id=data.id;
            this.$store.state.oneself.name=data.name;
            this.$store.state.oneself.headPortrait=data.face+'?t='+(new Date()).getTime().toString();
            this.$store.state.oneself.intro=data.info;
            this.$store.state.oneself.country=data.country;
            this.$store.state.oneself.phone=data.phone;
            this.$store.state.oneself.email=data.email;
            this.$store.state.oneself.time=data.time;
            console.log(this.$store.state.oneself.headPortrait);
            
        })
        //断线
        this.$store.state.socket.on('disconnect', () =>{
            console.log('disconnect...');
            // 离开房间
            this.$store.state.socket.emit('leave',{
                room:this.$store.state.roomInfo.roomId,
                user_id:this.$store.state.oneself.id,
                user_name:this.$store.state.oneself.name
            })
        })
        
        //更新聊天记录
        this.$store.state.socket.on('updateChatRecord', res => {
            this.$store.state.chatRecord=[];
            for(let i=0;i<Object.keys(res.data).length;i++){
                // console.log(res.data[i].face);
                res.data[i].info=this.entitiesToUtf16(res.data[i].info)
                res.data[i].face+=('?t='+(new Date()).getTime().toString())
                this.$store.state.chatRecord[i]=res.data[i]
            }
        })
        //更新房间信息
        this.$store.state.socket.on('updateRoom', data => {
            this.$store.state.roomInfo.members=data.num;
            this.$store.state.roomInfo.roomId=data.room;
            this.$store.state.roomInfo.face=data.home_face+'?t='+(new Date()).getTime().toString();
            this.$store.state.roomInfo.name=data.home_name;
            this.$store.state.roomInfo.topic=data.home_topic;
            this.$store.state.roomInfo.url=data.room;
            this.$store.state.roomInfo.description=data.home_description;
        })
        //房间创建信息返回  
        this.$store.state.socket.on('create', data => {
            if(data.key==1){
                //显示创建成功信息
                document.getElementById('successCreate').click();
                //离开原先房间
                this.$store.state.socket.emit('leave',{
                    room:this.$store.state.roomInfo.roomId,
                    user_id:this.$store.state.oneself.id,
                    user_name:this.$store.state.oneself.name
                })
                //加入新的房间
                this.$store.state.socket.emit('join',{
                    room:this.$store.state.oneself.id,
                    user_name:this.$store.state.oneself.name,
                })
                //路由跳转
                setTimeout(()=>{
                    this.$router.push({path:'/home/chatroom',query:{roomId: this.$store.state.roomInfo.roomId}})
                },2000)
            }else{
                //显示创建失败信息
                document.getElementById('errorCreate').click();
            }
        })
        //更新人数
        this.$store.state.socket.on('Num', data =>{
            this.$store.state.roomInfo.members=data.num;
        })
        //判断改变个人信息是否成功
        this.$store.state.socket.on('updateUser', data =>{
            if(data.key==1){
                this.$store.state.oneself.id=data.id;
                this.$store.state.oneself.name=data.name;
                this.$store.state.oneself.headPortrait=data.face+'?t='+(new Date()).getTime().toString();
                this.$store.state.oneself.intro=data.info;
                this.$store.state.oneself.country=data.country;
                this.$store.state.oneself.phone=data.phone;
                this.$store.state.oneself.email=data.email;
                this.$store.state.oneself.time=data.time;
                this.$store.state.socket.emit('updateChatRecord',{
                    url: this.$store.state.roomInfo.roomId,
                    admin: parseInt(this.$store.state.roomInfo.roomId)
                });
                this.$message({
                    message:"更新个人信息成功",
                    type:'success'
                })
                console.log(this.$store.state.oneself.headPortrait);
            }else{
                this.$message({
                    message:"更新个人信息失败",
                    type:'error'
                })
            }
        }),
        //判断改变房间信息是否成功
        this.$store.state.socket.on('changeHome', data=>{
            if(data.key==1){
                //实时更新房间信息
                this.$store.state.socket.emit('updateRoom',{
                    home_url: this.$store.state.roomInfo.roomId,
                    admin_id: parseInt(this.$store.state.roomInfo.roomId),
                });
                this.$message({
                    message:"更新房间信息成功",
                    type:'success'
                })
            }else{
                this.$message({
                    message:"更新房间信息失败",
                    type:'error'
                })
            }
        })
        //接受删除信息加入默认房间
        this.$store.state.socket.on('DeleteRoom', data =>{
            // this.$store.state.socket.emit('join_default',{user_id:this.$store.state.oneself.id})
            this.$message({
                    type: 'info',
                    message: '所在房间已经被删除..前往默认房间中..'
            });
            setTimeout(()=>{ 
                this.$router.push({path:'/home/chatroom',query:{roomId: 1}})
            },2000)
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

.router-link-exact-active i , .router-link-active i{
    color: rgb(16,126,255);
}

</style>
