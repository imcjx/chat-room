<template>
    <div class="container">
        <div :style="mainWidth" class="main clearfix">
            <header>
                <div class="group-theme-info clearfix">
                    <div class="theme-photo"><img src="../assets/bird.png" alt="bird"></div>
                    <div class="theme-name">Bootstrap Themes</div><br>
                    <div class="theme-name" style="color: rgb(178,184,190);">35members · HTML,CSS,and Javascript Help</div>
                </div>
                <div class="tools">
                    <i class="el-icon-search"></i>
                    <i class="el-icon-s-custom"></i>
                    <i class="el-icon-s-operation" @click="submenuFlag=!submenuFlag;"></i>
                    <div v-show="submenuFlag" class="submenu" tabindex="2" @blur="disappear">
                        <div style="margin-bottom: 15px;" @click="unfold"><span>Mute</span><i class="el-icon-set-up"></i></div>
                        <div><span>Delete</span><i class="el-icon-delete"></i></div>
                    </div>
                </div>
            </header>
            <div class="msg-container">
                <ul>
                    <li :key="index" v-for="(item,index) in chatRecord" class="clearfix">
                        <div :class="[item.id==oneself.id?'msg-self':'msg-others']">
                            <div class="portrait"><img src="../assets/bird.png" alt="头像"></div> 
                            <div class="msg"><span style="color: rgb(47,52,67);">{{item.name}}</span><br>{{item.info}}</div>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="msg-send">
                <input type="text" placeholder="Type your message...">
                <div class="btns">
                    <i class="el-icon-picture-outline-round expression"></i>
                    <i class="el-icon-paperclip share"></i>
                    <el-button class="send" type="primary" icon="el-icon-s-promotion" circle></el-button>
                </div>
            </div>
        </div>
        <div v-show="rightFlag" :style="rightWidth" class="right">
            <header><i class="el-icon-arrow-left" @click="fold"></i></header>  
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
            oneself:{
                id: '123456',
                name: 'cjx',
                headPortrait: "",
            },
            chatRecord:[
                {id:"123",name:"张三",info:"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
                {id:"456",name:"李四",info:"今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
                {id:"456",name:"李四",info:"123456哈哈"},
                {id:"123456",name:"cjx",info:"今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子今天是个好日子"},
                {id:"123456",name:"cjx",info:"太难了太难了爷要晕了"}
            ]
        }
    },
    methods:{
        //展开右侧内容
        unfold(){
            this.mainWidth.width='80%';
            this.rightWidth.width='20%';
            this.rightFlag=true;
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
        }
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
</style>