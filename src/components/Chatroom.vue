<template>
    <div class="container">
        <div :style="mainWidth" class="main clearfix">
            <header>
                <div class="group-theme-info clearfix">
                    <div class="theme-photo"><img :src="$store.state.roomInfo.face" alt="房间头像"></div>
                    <div class="theme-name">{{$store.state.roomInfo.name}}</div><br>
                    <div class="theme-name" style="color: rgb(178,184,190);">{{$store.state.roomInfo.members}}members · {{$store.state.roomInfo.topic}}</div>
                </div>
                <div class="tools">
                    <i class="el-icon-search" @click="toggleSearch"></i>
                    <i class="el-icon-s-custom" @click="unfold('share')"></i>
                    <i class="el-icon-s-operation" @click="submenuFlag=!submenuFlag;"></i>
                    <div v-show="submenuFlag" class="submenu" tabindex="2" @blur="disappear" style="z-index:999;">
                        <div style="margin-bottom: 15px;" @click="unfold('room')"><span>Mute</span><i class="el-icon-set-up"></i></div>
                        <div @click="deleteRoom"><span>Delete</span><i class="el-icon-delete"></i></div>
                    </div>
                </div>
            </header>
            <div v-show="searchFlag" :style="searchHeight" class="search-container">
                <el-input
                    placeholder="Search this chat"
                    suffix-icon="el-icon-search"
                    v-model="searchChatInfo">
                </el-input>
            </div>
            <div class="msg-container" :style="infoHeight">
                <ul>
                    <li style="z-index:10;" :key="index" v-for="(item,index) in search($store.state.chatRecord)" class="clearfix">
                        <div :class="[item.id==$store.state.oneself.id?'msg-self':'msg-others']">
                            <div class="portrait"><img :src="item.face" alt="头像"></div> 
                            <div class="msg"><span style="color: rgb(47,52,67);">{{item.name}}</span><br>{{item.info}}<br>{{item.time}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="msg-send">
                <input type="text" :placeholder="sendMsgTip" v-model="inputMsg">
                <div class="btns">
                    <i class="el-icon-picture-outline-round expression"></i>
                    <i class="el-icon-paperclip share" @click="copyUrl"></i>
                    <el-button @click="sendMsg" type="primary" icon="el-icon-s-promotion" circle></el-button>
                </div>
            </div>
        </div>
        <div v-show="rightFlag" :style="rightWidth" class="right">
            <header><i class="el-icon-arrow-left" @click="fold"></i></header>
            <div v-if="shareOrRoomFlag" class="roomInfo">
                <div class="container">
                    <div><img style="width: 100%;" :src="$store.state.roomInfo.face" alt=""></div>
                    <div>
                        <span style="display:inline-block;margin-bottom:8px;">{{$store.state.roomInfo.name}}</span><br>
                        <span style="display:inline-block;color: rgb(178, 184, 190);font-size:13px;">{{$store.state.roomInfo.members}}members · {{$store.state.roomInfo.topic}}</span>
                    </div>
                </div>
                <footer>
                    <label for="modifyPhotoFile">
                        <div class="photo-container">
                            <span class="tip">Photo</span>
                            <button><i class="el-icon-picture-outline"></i></button><br>
                            <span style="display:inline-block">{{modifyPhotoTips}}</span>
                        </div>
                    </label>
                    <input type="file" id="modifyPhotoFile" style="display:none" @change="checkFile">
                    <div class="info">
                        <span class="tip">Name</span>
                        <el-input
                            v-model="modifyRoom.name"
                            :placeholder="this.$store.state.roomInfo.name"
                            clearable>
                        </el-input>
                    </div>
                    <div class="info">
                        <span class="tip">Topic(optional)</span>
                        <el-input
                            v-model="modifyRoom.topic"
                            :placeholder="this.$store.state.roomInfo.topic"
                            clearable>
                        </el-input>
                    </div>
                    <div class="info">
                        <span class="tip">Description</span>
                        <el-input
                            v-model="modifyRoom.description"
                            style="background-color: rgb(237,238,246);"
                            type="textarea"
                            :rows="4"
                            :placeholder="this.$store.state.roomInfo.description">
                        </el-input>
                    </div>
                    <el-button type="primary" @click="modifyGroup">{{buttonInfo}}</el-button>
                </footer>
            </div> 
            <div v-else class="shareInfo">
                <div class="container">
                    <div class="roomTitle">
                        <div class="portrait"><img style="width: 100%;" :src="$store.state.roomInfo.name" alt=""></div>
                        <div>{{$store.state.roomInfo.name}}</div>
                        <a @click="copyUrl" style="display:inline-block;" href="javascripts:;">
                            link
                            <i class="el-icon-paperclip share"></i>
                        </a>
                    </div>
                    <div style="height:2px;width:100%;background-color:rgb(245,246,250)"></div>
                    <div class="roomIntro" style="color:rgb(178,184,196)">
                        {{$store.state.roomInfo.description}}
                    </div>
                </div>
                <footer>
                    <div class="shareContent">
                        <ul>
                            <li @click="share('qq')">QQ</li>
                            <li @click="share('qzone')">QQ空间</li>
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            mainWidth: {width: '100%'},
            rightWidth: {width: '0%'},
            submenuFlag: false,
            rightFlag: false,
            shareOrRoomFlag: false,
            //用户输入的聊天信息
            inputMsg: '',
            //用户输入的提示信息
            sendMsgTip: 'Type your message...',
            searchFlag: false,
            searchHeight: {height:"0vh"},
            infoHeight: {height:"76vh"},
            //搜索聊天记录
            searchChatInfo: '',
            buttonInfo: 'Modify',
            modifyPhotoTips:'You can upload jpg. gif or png files.Max file size 3mb.',
            modifyRoom:{
                name:'',
                topic:'',
                description:''
            }
        }
    },
    methods:{
        //删除房间
        deleteRoom(){
            //判断是否是房主
            if(this.$store.state.oneself.id!=this.$store.state.roomInfo.roomId){
                //不是房主
                this.$message({
                    message:"你没有权限！",
                    type:'error'
                })
            }else{
                this.open();
            }
        },
        //点击复制链接
        copyUrl(){
            let tmpInput=document.createElement('input');
            tmpInput.type="text";
            tmpInput.value=window.location.href;
            document.body.appendChild(tmpInput);
            tmpInput.select();
            document.execCommand("Copy");
            document.body.removeChild(tmpInput)
            this.$message({
                message:"复制链接成功！分享给你的好友吧！",
                type:'success'
            })
        },
        //检查文件上传的类型
        checkFile(){
            let file=document.getElementById('modifyPhotoFile').value;
            let type=file.substring(file.lastIndexOf('.')).toLowerCase();
            if(type=='.jpg'||type=='.gif'||type==".png"){
                this.modifyPhotoTips='Head image type meets the requirements'
            }else{
                this.modifyPhotoTips='Wrong head image type, need jpg. gif or png files'
            }
        },
        //修改房间信息
        modifyGroup(){
            if(this.modifyRoom.name.trim()==''||this.modifyRoom.topic.trim()==''
                ||this.modifyRoom.description.trim()==''||document.getElementById('modifyPhotoFile').value==''){
                    this.buttonInfo='Infomation empty!';
            }else{
                //获取头像
                let imgInput=document.getElementById('modifyPhotoFile').files[0];
                let fr=new FileReader();
                fr.readAsDataURL(imgInput);
                let that=this;
                //获取头像类型
                let file=document.getElementById('modifyPhotoFile').value;
                let type=file.substring(file.lastIndexOf('.')).toLowerCase();
                type=type.substr(1)
                fr.onload=function(){
                    that.$store.state.socket.emit('changeHome',{
                        tag: type,
                        home_face: this.result,
                        home_name: that.modifyRoom.name,
                        home_topic: that.modifyRoom.topic,
                        home_info: that.modifyRoom.description,
                        admin_id: parseInt(that.$store.state.oneself.id),
                        url: that.$store.state.oneself.id
                    });
                    
                }
                that.buttonInfo='Modify';
                that.modifyRoom.name='';
                that.modifyRoom.topic='';
                that.modifyRoom.description='';
            }
        },
        //分享
        share(type){
            //部署到线上可以，本地不行
            if(type=='qzone'){
                window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url='
                +window.location.href+'?sharesource=qzone&title=匿名聊天室&pics=图片地址&summary=一起来聊天吧');
            }else if(type=='qq'){
                window.open('http://connect.qq.com/widget/shareqq/index.html?url='
                +window.location.href+'?sharesource=qzone&title=匿名聊天室&pics=图片地址&summary=一起来聊天吧')// 测试：http://www.cnblogs.com/zxf100/
            }
        },
        //展开右侧内容
        unfold(str){
            this.mainWidth.width='80%';
            this.rightWidth.width='20%';
            this.rightFlag=true;
            this.shareOrRoomFlag=(str=='room'?true:false);
        },
        //折叠右侧内容
        fold(){
            this.mainWidth.width='100%';
            this.rightWidth.width='0%';
            this.rightFlag=false;
        },
        //二级菜单焦点失去时隐藏
        disappear(){
            this.submenuFlag=false;
        },
        //发送信息
        sendMsg(){
            if(this.inputMsg.trim()==""){
                this.sendMsgTip='Information cannot be empty'
            }else{
                this.$store.state.socket.emit('new_message',{
                    user_id: parseInt(this.$store.state.oneself.id),
                    user_name: this.$store.state.oneself.name,
                    message: this.inputMsg,
                    room: this.$store.state.roomInfo.url
                });
                setTimeout(()=>{
                    this.$store.state.socket.emit('updateChatRecord',{
                        url: this.$store.state.roomInfo.roomId,
                        admin: parseInt(this.$store.state.roomInfo.roomId)
                    });
                },50)
                this.sendMsgTip='Type your message...';
            }
            this.inputMsg='';
        },
        //搜索框的出现与隐藏
        toggleSearch(){
            this.searchFlag=!this.searchFlag;
            if(this.searchFlag){
                this.searchHeight.height="10vh";
                this.infoHeight.height="66vh";
            }else{
                this.searchHeight.height="0vh";
                this.infoHeight.height="76vh";
            }
        },
        //删除信息出现弹框
        open() {
            this.$confirm('此操作将永久删除该房间, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //发送删除信息
                this.$store.state.socket.emit('DeleteRoom',{room:this.$store.state.roomInfo.roomId})
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        //查询想要的信息
        search(arr){
            const newList=arr.filter(item => {
                if(item.info.includes(this.searchChatInfo)){
                    return item;
                }
            })
            return newList;
        },
        //路由变化加入房间
        routeChangeRoom(){
            console.log(this.$route.query.roomId);
            //离开原先房间
            this.$store.state.socket.emit('leave',{
                room:this.$store.state.roomInfo.roomId,
                user_id:this.$store.state.oneself.id,
                user_name:this.$store.state.oneself.name
            })
            //加入房间
            if(this.$route.query.roomId=='1'){
                this.$store.state.socket.emit('join_default',{user_id:this.$store.state.oneself.id})
            }else{
                this.$store.state.socket.emit('join',{
                    user_name:this.$store.state.oneself.name,
                    room: this.$route.query.roomId
                })
            }
        }
    },
    watch:{
        '$store.state.chatRecord': ()=>{
            setTimeout(()=>{
                let el=document.getElementsByClassName("msg-container")[0];
                el.scrollTop=el.scrollHeight;
            },10)
            // ↓只能定位到倒数第二个元素（数据更新了DOM还没渲染）
            // let el=document.getElementsByClassName("msg-container")[0];
            // el.scrollTop = el.scrollHeight;
        },
        //监听路由的变化，实现多房间
        '$route': 'routeChangeRoom'
    },
    mounted(){
        //页面一加载滚动条到底部
        setTimeout(()=>{
            let el=document.getElementsByClassName("msg-container")[0];
            el.scrollTop=el.scrollHeight;
        },10)
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
.clearfix:after {
   content:""; 
   display: block; 
   clear:both; 
}

.container{
    height: 100%;
    background-color: rgb(255,255,255);
    border-left: 5px solid rgb(245,246,250);
}

.search-container{
    position: relative;
    box-sizing: border-box;
    height: 10vh;
    padding: 0 10% 0 24px;
    border-bottom: 2px solid rgb(245,246,250);
    transition: all 0.9s ease;
}

.search-container .el-input{
    transform: translateY(-50%);
}

.search-container >>> .el-input__inner{
    position: absolute;
    top: 50%;
    background-color: rgb(237,238,246);
}

.msg-container{
    box-sizing: border-box;
    height: 76vh;
    padding: 0 0 3vh 24px;
    overflow: auto;
}

.msg-container ul{
    list-style: none;
}

.msg-container ul li{
    margin-bottom: 20px;
}

.msg-self{
    position: relative;
    float: right;
    box-sizing: border-box;
    margin-right: 10%;
    max-width: 40%;
    min-height: 55px;
}


.msg-others{
    box-sizing: border-box;
    position: relative;
    max-width: 40%;
    min-height: 55px;
}

.msg-others .portrait{
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 45px;
    height: 45px;
    border: 1px solid rgb(230, 230, 233);
    border-radius: 50%;
    overflow: hidden;
}

.msg-self .portrait{
    box-sizing: border-box;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 45px;
    height: 45px;
    border: 1px solid rgb(230, 230, 233);
    border-radius: 50%;
    overflow: hidden;
}

.portrait img{
    width: 100%;
}

.msg-self .msg , .msg-others .msg{
    margin-left: 55px;
    padding: 15px;
    word-break: break-all;
    line-height: 1.5em;
    color: rgb(178,184,190);
    font-size: 14px;
    font-weight: bold;
    border-radius: 10px;
    border-bottom-left-radius: 0;
    background-color: rgb(245,246,250);
} 

.msg-self .msg{
    margin-left: 0px;
    margin-right: 55px;
    color: rgb(255,255,255);
    border-radius: 10px;
    border-bottom-right-radius: 0;
    background-color: rgb(1,118,255);
}

.main{
    float: left;
    width: 100%;
    transition: all 0.5s ease;
}

.main header{
    position: relative;
    box-sizing: border-box;
    height: 12vh;
    border-bottom: 2px solid rgb(245,246,250);
    /* border-right: ; */
}

.group-theme-info{
    position: absolute;
    width: 50%;
    top: 50%;
    left: 24px;
    transform: translateY(-50%);
}

.group-theme-info div{
    float: left;
    font-size: 13px;
    font-weight: bold;
}

.theme-photo{
    box-sizing: border-box;
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden; 
    border: 1px solid rgb(230, 230, 233);
}

.theme-photo img{
    width: 100%;
}

.tools{
    position: absolute;
    right: 10%;
    top:50%;
    transform: translateY(-50%);
}

.tools > i{
    color: rgb(174,180,186);
}

.tools i{
    margin-left: 30px;
    font-size: 20px;
    cursor: pointer;
}

.tools > i:hover{
    color: rgb(16,126,255);
}

.tools .submenu{
    box-sizing: border-box;
    position: absolute; 
    right: 0;
    margin-top: 10px;
    padding: 20px 25px;
    color: rgb(137,138,149);
    border: 2px solid rgb(245,246,250);
    border-radius: 20px;
    background-color: rgb(255,255,255);
    outline: none;
}

.submenu div{
    display: flex;
    justify-content: space-between;
    cursor: pointer;
}

.submenu div:hover{
    background-color:rgb(245,246,250);
}

.msg-send{
    position: relative;
    box-sizing: border-box;
    height: 12vh;
    border-top: 2px solid rgb(245,246,250);
    padding-left: 24px;
}

.msg-send input[type="text"]{
    box-sizing: border-box;
    height: 100%;
    width: 75%;
    border: none;
    outline: none;
    font-size: 14px;
}

/*修改placeholder的字体颜色*/
input::-webkit-input-placeholder {
    color: rgb(178,184,190);
    font-weight: bold;
}

.msg-send .btns{
    position: absolute;
    top: 50%;
    right: 10%;
    transform: translateY(-50%);
}

.btns .expression , .btns .share{
    margin-right: 20px;
    font-size: 20px;
    color: rgb(174,180,186);
    cursor: pointer;
}

.btns .expression:hover , .btns .share:hover{
    color: rgb(16,126,255);
}

.btns .send{
    background-color: rgb(1,118,255);
}

.btns .send:hover{
    opacity: 0.8;
}

.right{
    box-sizing: border-box;
    float: right;
    border-left: 2px solid rgb(245,246,250);
    height: 100%;
    transition: all 0.5s ease;
}

.right header i{
    margin-left: 20px;
    line-height: 12vh;
    font-size: 20px;
    cursor: pointer;
    color: rgb(174,180,186);
}

.right header{
    box-sizing: border-box;
    height: 12vh;
    border-bottom: 2px solid rgb(245,246,250);
}

.roomInfo .container{
    box-sizing: border-box;
    height: 33vh;
    padding: 20px;
    border-left: none;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
}

.roomInfo .container div:nth-of-type(1){
    width: 70px;
    height: 70px;
    border-radius: 50%;
    margin: 0 auto 15px;
    overflow: hidden; 
    border: 1px solid rgb(230, 230, 233);
}

.right footer{
    box-sizing: border-box;
    height: 55vh;
    background-color: rgb(245,246,250);
    padding: 15px;
}

footer .photo-container{
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 12vh;
    margin: 0 auto 20px;
    padding: 10px;
    background-color: rgb(237,238,246);
    font-size: 10px;
    cursor: pointer;
    text-align: center;
    border-radius: 7px;
    overflow: hidden;
    border: 1px solid rgb(220,223,230);
}

footer .tip{
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-100%);
    color: rgb(143,143,155);
    font-weight: bold;
    font-size: 12px;
}

footer .photo-container > span{
    color: rgb(179,184,191);
    text-align: center;
}

footer .photo-container > button{
    width: 25px;
    height: 25px;
    border-radius: 50%;
    margin: 5px 0;
    padding: 5px;
    background-color: rgb(1,118,255);
    color: rgb(255,255,255);
    cursor: pointer;
    outline: none;
    border: none;
}

footer .photo-container:hover{
    opacity: 0.8;
    border-color: rgb(192,196,204);
}

footer .info >>> .el-input__inner{
    background-color: rgb(237,238,246);
    height: 4vh;
    font-size: 12px;
    margin-bottom: 20px;
}

footer .info >>> .el-textarea__inner{
    background-color: rgb(237,238,246);
    margin-bottom: 20px;
    resize: none;
}

footer .el-button{
    width: 100%;
    background-color:rgb(1,118,255);
}

footer .el-button:hover{
    opacity: 0.7;
}

.shareInfo .container{
    box-sizing: border-box;
    height: 33vh;
    padding: 20px;
    border-left: none;
    font-size: 14px;
    font-weight: bold;
    overflow: hidden;
}

.shareInfo .portrait{
    box-sizing: border-box;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden; 
    border: 1px solid rgb(230, 230, 233);
}

.shareInfo .roomTitle{
    box-sizing: border-box;
    position: relative;
    margin-bottom: 15px;
}

.shareInfo .roomTitle .portrait{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}

.shareInfo .roomTitle div:nth-of-type(2) , .shareInfo .roomTitle a{
    width: calc(100% - 50px);
    box-sizing: border-box;
    margin-left: 50px;
    white-space:nowrap; 
    overflow:hidden; 
    text-overflow:ellipsis;
}

.shareInfo .roomTitle a{
    font-size: 13px;
    color: rgb(163,164,173);
    text-decoration-line: none;
}

.shareInfo .roomTitle a:hover{
    text-decoration-line: underline;
}

.shareInfo .roomIntro{
    padding: 20px;
    text-align: center;
}

.shareInfo footer .shareContent{
    box-sizing: border-box;
    padding: 30px 20px;
    border-radius: 3px;
    background-color: rgb(255,255,255);
    color: rgb(157,164,172);
}

.shareInfo ul{
    list-style: none;
}

footer .shareContent li{
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    line-height: 2em;
    cursor: pointer;
}

footer .shareContent li:not(:last-child) { 
    border-bottom: 1px solid rgb(245,246,250); 
    
} 

footer .shareContent li:hover{
    background-color: rgb(245,246,250);
}
</style>