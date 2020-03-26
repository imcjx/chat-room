<template>
    <div class="container">
        <header>Create Group</header>
        <div class="search">
            <el-input
                placeholder="Search for messages or users.."
                suffix-icon="el-icon-search">
            </el-input>
        </div>
        <label class="photo">
            <div class="photo-container">
                <span class="tip">Photo</span>
                <el-button icon="el-icon-picture-outline" circle></el-button>
                <div>You can upload jpg. gif or png files.</div>
                <div>Max file size 3mb.</div>
            </div>
        </label>
        <label >
            <div class="info">
                <span class="tip">Name</span>
                <el-input
                    v-model="GroupInfo.name"
                    placeholder="Group Name"
                    clearable>
                </el-input>
            </div>
        </label>
        <label>
            <div class="info">
                <span class="tip">Topic(optional)</span>
                <el-input
                    v-model="GroupInfo.topic"
                    placeholder="Group Topic"
                    clearable>
                </el-input>
            </div>
        </label>
        <label>
            <div class="info">
                <span class="tip">Description</span>
                <el-input
                    v-model="GroupInfo.description"
                    placeholder="Group Description"
                    clearable>
                </el-input>
            </div>
        </label>
        <div class="submit">
            <el-button type="primary" @click="subGroupInfo">Create group</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            GroupInfo:{
                photo: '',
                name: '',
                topic: '',
                description: '',
            }
        }
    },
    methods:{
        subGroupInfo(){
            console.log(`${this.GroupInfo.photo}+${this.GroupInfo.name}+${this.GroupInfo.topic}+${this.GroupInfo.description}`);     
        }
    }
}
</script>

<style scoped>
.container{
    padding: 30px 40px;
}

header{
    margin-bottom: 20px;
    font-size: 22px;
    font-weight: bold;
}

.el-input{
    margin-bottom: 4em;
}

.search >>> .el-input__inner{
    background-color: rgb(237,238,246);
}

.search .el-input{
    width: 96%;
}

.photo-container{
    position: relative;
    width: 50%;
    height: 9em;
    margin: 0 auto 3.5em;
    background-color: rgb(237,238,246);
    cursor: pointer;
    text-align: center;
    line-height: 1.6em;
    border-radius: 7px;
}

.tip{
    position: absolute;
    left: 0;
    top: 0;
    transform: translateY(-140%);
    color: rgb(143,143,155);
    font-weight: bold;
}

.photo-container > div{
    color: rgb(179,184,191);
}

.photo-container > .el-button{
    margin: 15px 0;
    background-color: rgb(1,118,255);
    color: rgb(255,255,255);
    font-size: 20px;
}

.photo-container > .el-button:hover{
    opacity: 0.7;
}

.info{
    position: relative;
    width: 50%;
    margin: 0 auto;
}

.info >>> .el-input__inner{
    background-color: rgb(237,238,246);
}

.submit{
    width: 22%;
    margin: 0 auto;
    
}

.submit .el-button{
    width: 100%;
    background-color: rgb(1,118,255);
}

.submit .el-button:hover{
    opacity: 0.7;
}
</style>