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
                    <i class="el-icon-s-operation"></i>
                </div>
            </header>
            <div class="msg-container">
                <button @click="fold">折叠</button>
                <button @click="unfold">展开</button>
            </div>
            <div class="msg-send"><input type="text"></div>
        </div>
        <div :style="rightWidth" class="right">

        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            mainWidth: {width: '100%'},
            rightWidth: {width: '0%'}
        }
    },
    methods:{
        //展开右侧内容
        unfold(){
            this.mainWidth.width='80%';
            this.rightWidth.width='20%';
        },
        //折叠右侧内容
        fold(){
            this.mainWidth.width='100%';
            this.rightWidth.width='0%';
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
    height: 70vh;
}

.msg-send{
    height: 18vh;
}

.right{
    float: right;
    height: 100%;
    /* width: 20%; */
    background-color: chartreuse;
    transition: all 0.5s ease;
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

.tools i{
    margin-left: 30px;
    font-size: 20px;
    color: rgb(174,180,186);
    cursor: pointer;
}

.tools i:hover{
    color: rgb(16,126,255);
}

</style>