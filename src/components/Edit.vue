<template>
    <div class="container">
        <header>Create Group</header>
        <div class="search">
            <el-input
                placeholder="这个框没啥用..还原设计稿..."
                suffix-icon="el-icon-search">
            </el-input>
        </div>
        <label for="photoFile" class="photo">
            <div class="photo-container">
                <span class="tip">Photo</span>
                <el-button icon="el-icon-picture-outline" circle></el-button>
                <div v-html="photoTips"></div>
            </div>
        </label>
        <input type="file" id="photoFile" style="display:none" @change="checkFile">
        <label>
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
            <el-button type="primary" @click="createGroup">{{buttonInfo}}</el-button>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            buttonInfo:'Create group',
            GroupInfo:{
                photo: '',
                name: '',
                topic: '',
                description: '',
            },
            photoTips:'You can upload jpg. gif or png files.<br>Max file size 3mb.'
        }
    },
    methods:{
        //检查文件上传的类型
        checkFile(){
            let file=document.getElementById('photoFile').value;
            let type=file.substring(file.lastIndexOf('.')).toLowerCase();
            if(type=='.jpg'||type=='.gif'||type==".png"){
                this.photoTips='Head image type meets the requirements'
            }else{
                this.photoTips='Wrong head image type, need jpg. gif or png files'
            }
        },
        //创建房间
        createGroup(){
            if(this.GroupInfo.name.trim()==''||this.GroupInfo.topic.trim()==''
            ||this.GroupInfo.description.trim()==''||document.getElementById('photoFile').value==''){
                 this.buttonInfo='Infomation empty!';
            }else{
                //获取头像
                let imgInput=document.getElementById('photoFile').files[0];
                let fr=new FileReader();
                fr.readAsDataURL(imgInput);
                let that=this;
                //获取头像类型
                let file=document.getElementById('photoFile').value;
                let type=file.substring(file.lastIndexOf('.')).toLowerCase();
                type=type.substr(1);
                fr.onload=function(){
                    console.log(this.result);
                    that.$store.state.socket.emit('create',{
                        tag: type,
                        home_face: this.result,
                        home_name: that.GroupInfo.name,
                        home_topic: that.GroupInfo.topic,
                        home_info: that.GroupInfo.description,
                        admin_id: parseInt(that.$store.state.oneself.id),
                        url: that.$store.state.oneself.id
                    });
                    that.buttonInfo='Create group';
                } 
            }
        }
    },
    mounted(){
    }
}
</script>

<style scoped>
.container{
    height: 100%;
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
    border: 1px solid rgb(220,223,230);
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

.photo-container:hover{
    transition: all 0.6s ease;
    border-color: rgb(192,196,204);
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