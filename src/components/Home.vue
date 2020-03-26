<template>
    <el-container class="home-container">
        <el-aside style="width: 90px">
            <div><img src="../assets/bird.png" alt="bird"></div>
            <ul>
                <li><router-link to="/home/edit"><i class="el-icon-edit-outline"></i></router-link></li>
                <li><router-link to="/home/chatroom"><i class="el-icon-chat-square"></i></router-link></li>
                <li><router-link to="/home/personal"><i class="el-icon-user"></i></router-link></li>
            </ul>
            <i class="el-icon-setting"></i>
        </el-aside>
        <el-main><router-view></router-view></el-main>
    </el-container>
</template>

<script>
export default {
    
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
