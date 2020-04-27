<template>
    <div class="container">
        <div class="profile-container">
            <h2>ProFile</h2>
            <el-input
                    placeholder="这个框没用..还原设计稿"
                    suffix-icon="el-icon-search"
                    v-model="searchSelfInfo">
            </el-input>
            <div class="personalInfo">
                <div class="portrait"><img src="../assets/bird.png"></div>
                <div>
                    <div class="name">{{$store.state.oneself.name}}</div>
                    <div class="intro">{{$store.state.oneself.intro}}</div>
                </div>
            </div>
            <div class="minorInfo">
                <ul>
                    <li><div><span>Country</span><br>{{$store.state.oneself.country}}</div><i class="el-icon-office-building"></i></li>
                    <li><div><span>Phone</span><br>{{$store.state.oneself.phone}}</div><i class="el-icon-phone-outline"></i></li>
                    <li><div><span>Email</span><br>{{$store.state.oneself.email}}</div><i class="el-icon-message"></i></li>
                    <li><div><span>Time</span><br>{{$store.state.oneself.time}}</div><i class="el-icon-timer"></i></li>
                </ul>
            </div>
        </div>
        <div class="setting-container">
            <header>
                <div>
                    <h3>Settings</h3> 
                    <span>Update your profile details</span>
                </div>
            </header>
            <div class="main">
                <div class="main-container">
                    <header>
                        <div>
                            <h4>Account</h4> 
                            <span>Update your profile details</span>
                        </div>
                    </header>
                    <ul>
                        <li>
                            <span style="color:rgb(143,143,155);font-weight:bold">Avator</span><br>
                            <label for="avatorFile">
                                <div for="avatorFile" style="color:rgb(179,184,191)" class="avator-container">
                                    <el-button icon="el-icon-picture-outline" circle></el-button>
                                    <div>You can upload jpg. gif or png files.<br>Max file size 3mb.</div>
                                </div>
                            </label>
                            <input type="file" id="avatorFile" style="display:none">
                        </li>
                        <li>
                            <span style="color:rgb(143,143,155);font-weight:bold">Name</span><br>
                            <el-input
                                v-model="modifyName"
                                :placeholder="this.$store.state.oneself.name"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <span style="color:rgb(143,143,155);font-weight:bold">Phone</span><br>
                            <el-input
                                v-model="modifyPhone"
                                :placeholder="this.$store.state.oneself.phone"
                                clearable>
                            </el-input>
                        </li>
                        <li>
                            <span style="color:rgb(143,143,155);font-weight:bold">Email</span><br>
                            <el-input
                                v-model="modifyEmail"
                                :placeholder="this.$store.state.oneself.email"
                                clearable>
                            </el-input>
                        </li>
                    </ul>
                    <footer class="modify">
                        <el-button type="primary">Modify</el-button>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            searchSelfInfo: '',
            modifyName:'',
            modifyEmail: '',
            modifyPhone: '',
        }
    },
    methods:{
        updatePersonInfo(){
            this.$store.state.socket.emit('updatePersonInfo',{
                user_face: this.$store.state.oneself.headPortrait,
                user_id: this.$store.state.oneself.id,
                user_phone: this.$store.state.oneself.phone,
                user_email: this.$store.state.oneself.email,
            })
            this.modifyName='';
            this.modifyEmail='';
            this.modifyPhone='';
        }
    },
    mounted(){
            // this.$store.state.socket.on('disconnect', function () {  //连接成功绑定的事件
            // console.log('disconnect...');
            // });  
    }
}
</script>

<style scoped>
.container{
    height: 100vh;
}

.profile-container{
    box-sizing: border-box;
    float: left;
    height: 100%;
    width: 28%;
    padding: 25px 15px;
}

.profile-container h2{
    margin-bottom: 15px;
}

.profile-container .el-input{
    box-sizing: border-box;
    margin-bottom: 15px;
}

.profile-container >>> .el-input__inner{
    background-color: rgb(237,238,246);
}

.personalInfo{
    box-sizing: border-box;
    height: 30%;
    padding: 15px 30px;
    margin-bottom: 15px;
    border-radius: 8px;
    line-height: 1.6em;
    background-color: #fff;
    text-align: center;
    overflow: auto;
}

.personalInfo .portrait{
    box-sizing: border-box;
    width: 65px;
    height: 65px;
    margin: 0 auto 10px auto;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid rgb(230, 230, 233);
}

.personalInfo .portrait img{
    width: 100%;
}

.personalInfo .name{
    font-size: 13px;
    font-weight: bold;
    margin-bottom: 8px;
}

.personalInfo .intro{
    font-size: 12px;
    font-weight: bold;
    color: rgb(187,191,197);
}

.minorInfo{
    box-sizing: border-box;
    height: 50%;
    padding: 30px 15px;
    background-color: #fff;
    border-radius: 8px;
} 

.minorInfo ul{
    box-sizing: border-box;
    height: 100%;
    list-style: none;
}

.minorInfo ul li{
    position: relative;
    box-sizing: border-box;
    height: 25%;
    padding: 10px 0;
}

.minorInfo ul li:not(:last-child){
    border-bottom: 2px solid rgb(245,246,250); 
}

.minorInfo ul i{
    position: absolute;
    right: 5%;
    top: 50%;
    transform: translateY(-50%);
    font-size: 1.3em;
    color: rgb(161,162,171);
}

.minorInfo ul div{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(161,162,171);
}

.minorInfo ul span{
    font-size: 0.9em;
    color: rgb(187,191,197);
}



.setting-container{
    box-sizing: border-box;
    float: right;
    height: 100%;
    width: 72%;
    background-color: #fff;   
}

.setting-container header{
    position: relative;
    box-sizing: border-box;

    height: 11vh;
    border-bottom: 2px solid rgb(245,246,250);
}

.setting-container header div{
    position: absolute;
    left: 3%;
    top: 50%;
    transform: translateY(-50%);
}

.setting-container header span{
    font-size: 0.9em;
    color: rgb(161,162,171);
}

.main .main-container{
    position: relative;
    box-sizing: border-box;
    height: calc(65vh - 25px);
    width: 40%;
    margin: 25px auto 0;

}

.main-container header{
     border: 1px solid rgb(245,246,250);
     border-bottom: none;
}

.main-container ul{
    height: 100%;
    box-sizing: border-box;
    padding: 15px;
    list-style: none;
    border: 1px solid rgb(245,246,250);
}

.main-container ul li{
    line-height: 1.6em;
    border-bottom: 1px solid rgb(245,246,250);
}

.main-container ul li:nth-of-type(1){
    box-sizing: border-box;
    height: 40%;
    padding-bottom: 10px;
}

.main-container .avator-container{
    box-sizing: border-box;
    height: calc(100% - 1.6em);
    padding: 10px;
    border-radius: 8px;
    text-align: center;
    background-color: rgb(237,238,246);
    border: 1px solid rgb(220,223,230);
    cursor: pointer;
}

.main-container .avator-container:hover{
    transition: all 0.3s ease;
    border-color: rgb(192,196,204);
    opacity: 0.7;
}

.avator-container > .el-button{
    background-color: rgb(1,118,255);
    color: rgb(255,255,255);
}

.main-container ul li:not(:first-child){
    box-sizing: border-box;
    height: 20%;
    padding: 10px 0;
}

.main-container li >>> .el-input__inner{
    background-color: rgb(237,238,246);
}

.main-container footer{
    position: relative;
    background-color: red;
}

.main-container footer .el-button{
    position: absolute;
    width: 75%;
    top: 20px;
    left: 50%;
    background-color: rgb(1,113,245);
    transform: translateX(-50%);
}

.main-container footer .el-button:hover{
    opacity: 0.7;
}
</style>