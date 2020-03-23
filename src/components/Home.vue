<template>
    <el-container class="home-container">
        <el-aside style="width: 90px">
            <div><img src="../assets/bird.png" alt="bird"></div>
        </el-aside>
        <el-main>Main</el-main>
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
}

.el-aside div{
    position: relative;
}

.el-aside div img{
    width: 55%;
    position: absolute;
    left: 50%;
    top: 24px;
    transform: translateX(-50%);
}
</style>
