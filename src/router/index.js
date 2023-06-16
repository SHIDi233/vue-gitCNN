
import Vue from "vue";
import VueRouter from 'vue-router'
import login from "../components/LoginPage.vue";
import register from "../components/RegisterPage.vue";
import index from "../components/IndexPage.vue";

import projectsBox from "../components/ProjectsBox.vue";
import projectPage from "../components/projectPage.vue";

import sp1 from "../components/FormUserPage.vue";
import sp2 from "../components/FormBranchPage.vue";
import sp3 from "../components/FormLivePage.vue";

import introPage from "../components/IntroPage.vue";
import msgPage from "../components/MsgPage.vue";
import codePage from "../components/codePage.vue";
import settingPage from "../components/SettingPage.vue";

import approvalPage from "../components/approvalPage.vue";
import FormWarePage from "../components/FormWarePage.vue";
import AllMsgPage from "../components/AllMsgPage.vue";
import AllApprovalPage from "../components/SysApprovalPage.vue";
//2.使用路由
Vue.use(VueRouter);

//3.创建VueRouter的实例
const router = new VueRouter({
    //tips:不想要 #（锚点）就添加下面代码
     mode:'history', 
    //4.配置路由的path和组件
    routes :[
        {
          path: "/",
          name:'login',
          component: login,
        },
        {
          path: "/login",
          name:'login',
          component: login,
        },
        {
          path: "/register",
          name:'register',
          component: register,
        },
        {
          path: "/home",
          name:'index',
          component: index,
          children:[{
            path: "projectsBox",
            name:'projectsBox',
            component:projectsBox,
            children:[
              
            ]
          },
          {
            path: "apply",
            name:'apply',
            component:FormWarePage,
          },
          {
            path:"approval/:type/:id/:sendTime/:senderName/:content",
            name:'approval',
            component:AllApprovalPage,
          },
          {
            path: "allmsg",
            name:'allmsg',
            component:AllMsgPage,
            children:
            [
              
            ]
          },
          {
            path:"projectPage/:id",
            name:"projectPage",
            component:projectPage,
            children:[
              {
                path: "code",
                name:'code',
                component:codePage,
              },
              {
                path: "msg",
                name:'msg',
                component:msgPage,
                children:[
                  
                ]
              },
              {
                path:"approval/:type/:id/:sendTime/:senderName/:content",
                name:'approval',
                component:approvalPage,
              },
              {
                path: "setting",
                name:'settings',
                component:settingPage,
              },
              {
                path: "intro",
                name:'intro',
                component:introPage,
              },
              {
                path: "A",
                name:'sp1',
                component: sp1,
              },
              {
                path: "B",
                name:'sp2',
                component: sp2,
              },
              {
                path: "C",
                name:'sp3',
                component: sp3,
              },
              
            ]
          },
        ]
        },
      ]
});

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


router.beforeEach((to, from, next) => {
  const token = window.localStorage.getItem('CCNtoken');
  // 有token
  if (token) {
    // 直接放行
    if(to.path === '/'){
      next({"path": "/home/projectsBox" })
    }
    else if(to.path === '/home/projectPage'){
      return next({ "path": "/home/projectPage/intro"})
    }
    else{
      next();
    }
    
  } else {  // 否则是没有
      if(to.path === '/home/projectPage'){
    return next({ "path": "/home/projectPage/intro"})
  }
    // 如果去的是登录页
    if (to.path === '/login' || to.path==='/register') {
      // 直接放行
      next();
    } else {
      return next({ "path": "/login" })
    }
  }
  next();
});
// 5.导入路由实例
export default router
