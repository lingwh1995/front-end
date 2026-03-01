//创建应用于整个项目的路由器
import VueRouter from 'vue-router'
import Home  from "@/pages/Home.vue"
import Message from "@/pages/Message.vue"

// 获取原型对象push函数
const originalPush = VueRouter.prototype.push

// 获取原型对象replace函数
const originalReplace = VueRouter.prototype.replace

// 修改原型对象中的push函数
VueRouter.prototype.push = function push(location){
    return originalPush.call(this , location).catch(err=>err)
}

// 修改原型对象中的replace函数
VueRouter.prototype.replace = function replace(location){
    return originalReplace.call(this , location).catch(err=>err)
}


const router =  new VueRouter({
    routes:[
        {
            path: '/home',
            component: Home,
            meta:{
              title:'家'
            },
            children: [
                {
                    //注意: 这里的message前不要加 /
                    path: 'message',
                    component: Message,
                    meta:{
                        title:'消息'
                    },
                },
            ]
        }
    ]
})

export default router