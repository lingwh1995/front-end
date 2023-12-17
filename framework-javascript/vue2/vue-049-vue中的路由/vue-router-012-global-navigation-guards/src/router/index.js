//创建应用于整个项目的路由器
import VueRouter from 'vue-router'
import About from "@/pages/About.vue"
import Home  from "@/pages/Home.vue"
import News from "@/pages/News.vue"
import Message from "@/pages/Message.vue"
import MessageDetail from "@/pages/MessageDetail.vue";
import NewsDetail from "@/pages/NewsDetail.vue";

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
            path: '/about',
            component: About
        },
        {
            path: '/home',
            component: Home,
            children: [
                {
                    //注意: 这里的news前不要加 /
                    path: 'news',
                    component: News,
                    children: [
                        {
                            name:'news_detail_',
                            path: 'news_detail',
                            component: NewsDetail,

                            //props第三种写法:函数式写法，可以获取query和params传递的参数
                            props($route) {
                                return {
                                    id: $route.query.id,
                                    content: $route.query.content
                                }
                            }
                        }
                    ]
                },
                {
                    //注意: 这里的message前不要加 /
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name:'message_detail_',
                            path: 'message_detail/:id/:content',
                            component: MessageDetail,

                            //props第一种写法:该对象中所有的key-value都会以props的形式传给Detail组件
                            //props:{id:'xxx',content:'yyy'},

                            //props的第二种写法：值为布尔值，若布尔值为真，就会把该路由组件收到的所有的params参数，以props形式传给Detail组件
                            //但是这种写法只支持使用params传参，不支持使用query进行传参
                            props:true,
                        }
                    ]
                }
            ]
        }
    ]
})

//路由守卫
router.beforeEach((to,from,next) => {
    console.log(to,from)
})
export default router