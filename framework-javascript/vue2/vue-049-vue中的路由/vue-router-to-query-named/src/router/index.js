//创建应用于整个项目的路由器
import VueRouter from 'vue-router'
import About from "@/pages/About.vue"
import Home  from "@/pages/Home.vue"
import News from "@/pages/News.vue"
import Message from "@/pages/Message.vue"
import Detail from "@/pages/Detail.vue";

export default new VueRouter({
    routes:[
        {
            name:'about_',
            path: '/about',
            component: About
        },
        {
            name:'home_',
            path: '/home',
            component: Home,
            children: [
                {
                    name:'news_',
                    //注意: 这里的news前不要加 /
                    path: 'news',
                    component: News
                },
                {
                    name:'message_',
                    //注意: 这里的message前不要加 /
                    path: 'message',
                    component: Message,
                    children: [
                        {
                            name:'detail_',
                            path: 'detail',
                            component: Detail
                        }
                    ]
                }
            ]
        }
    ]
})