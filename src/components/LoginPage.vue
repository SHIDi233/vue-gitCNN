<style src="./css/login.css" scoped></style>
<template>
    <body>
      <div class="login">
          <div class="box">
              <p class="table">Git CCN</p>
              <br>
              <input id="account" type="text" placeholder="账号" value="" v-model="ac">
              <input id="pwd" type="password" placeholder="密码" value="" v-model="pw" >
              
              <a href="#" class="go" v-on:click="getValue">登录</a>
              <a href="#" class="go" v-on:click="register">注册</a>
              <br>
          </div>
      </div>
    </body>
</template>

<script>
    import axios from 'axios'
    import global from './GlobalPage.vue'
    const restweburl = global.ip;
    export default {
        data() {
            //message: 'Hello Vue.js!'
            return{
                ac:"",
                pw:""
            }
        },
        methods: {
            getValue: function () {
                // 获取message变量值将其转换成数组，逆转后再链接，再赋值给message
                // alert("登录");
                // var a = this.ac;
                // var p = this.pw;
                // alert(a);
                // alert(p);

                var params = new URLSearchParams();
                params.append('mail',this.ac);
                params.append('password',this.pw);

                axios.post(restweburl+'login', params).then(response => {
                    console.log(response.data)
                    // var obj = JSON.parse(response.data);
                    // console.log(obj)
                    if(response.data.code==1){
                        window.localStorage.setItem("CCNtoken",response.data.data);
                        // alert(window.localStorage.getItem("CCNtoken"));
                        this.$router.push('/home/projectsBox');
                    }
                    else{
                        alert("密码错误")
                    }
                }).catch(error => {
                    alert(error)
                    alert("请求失败")
                })
            },
            register: function () {
                // 获取message变量值将其转换成数组，逆转后再链接，再赋值给message
                // alert("注册");
                this.$router.push('/register')
            }
        }
    }
</script>
