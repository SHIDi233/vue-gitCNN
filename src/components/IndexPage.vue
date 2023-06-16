<style src="./css/index.css"></style>
<template>
    <div>
        <div>
            <el-header height="120px">
        <header>
            <img src="./header/img/img_evening.jpg" width="1650" height="155" alt=""/>
            <nav>
                <div class="search">
                    <input type="text" value="请输入您的搜索内容">
                </div>
                <div class="download">
                    <a href="https://github.com/SHIDi233/DBMS/releases/tag/v0.1.16-win">下载客户端</a>
                </div>
                
                <div class="login">
                    <img src="./header/avator.jpg"/>
                </div>
                <div class="upload">
                    <a href="" @click="closeID">退出登录</a>
                </div>
            </nav>
            <div class="logo">
            </div>
        </header>
    </el-header>
    
        </div>
        <el-main>
            <router-view></router-view>
        </el-main>
        </div>
      
</template>
<script>
    export default {
        methods: {
            closeID(){
                localStorage.removeItem("CCNtoken");
                this.$router.push("../../login");
            }
        }
    }
</script>


