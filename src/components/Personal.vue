<template>
    <div class="container">
        <div class="profile-container">
            <h2>ProFile</h2>
            <el-input
                    placeholder="Search for messages or users"
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
                    <li><div>Country</div><div>{{}}</div><i class=""></i></li>
                    <li><div>Country</div><div>{{}}</div><i class=""></i></li>
                    <li><div>Country</div><div>{{}}</div><i class=""></i></li>
                    <li><div>Country</div><div>{{}}</div><i class=""></i></li>
                </ul>
            </div>
        </div>
        <div class="setting-container">
            //？？？？
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            searchSelfInfo: '',
        }
    },
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
    background-color: orange;
}

.minorInfo ul li{
    box-sizing: border-box;
    height: 25%;
    padding: 10px 0;
}

.minorInfo ul li:not(:last-child){
    border-bottom: 1px solid rgb(245,246,250); 
}

.setting-container{
    box-sizing: border-box;
    float: right;
    height: 100%;
    width: 72%;
    background-color: orange;
    
}
</style>