<template>
    <div class="container">
        <div class="main">
            <header>
                <div class="group-theme-info">
                    <div class="theme-photo"><img src="../assets/bird.png" alt="bird"></div>
                    <div class="theme-name">Bootstrap Themes</div><br>
                    <div class="theme-name">35members · HTML,CSS,and Javascript Help</div>
                </div>
                <div class="tools">

                </div>
            </header>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
.container{
    background-color: rgb(255,255,255);
}

.main header{
    padding: 24px;
    background-color: #bfa;

}

.group-theme-info div{
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
}

.theme-photo{
    float: left;
    width: 45px;
    height: 45px;
    margin-right: 10px;
    border-radius: 50%;
    overflow: hidden; 
}

.theme-photo img{
    width: 100%;
}
</style>