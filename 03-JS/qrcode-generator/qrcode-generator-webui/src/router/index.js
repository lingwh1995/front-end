//创建应用于整个项目的路由器
import { createRouter, createWebHistory ,createWebHashHistory} from 'vue-router';

const routes = [
    {
        path:'/',           //这个表示的是根目录，即一进入的页面
        redirect:'/login'    //设置页面一进来就显示的页面，即重定向到goods组件，这里写的内容是对应组将的component的值
    },
    {
        path: '/login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/layout',
        component: () => import('@/views/Layout.vue'),
        children:[
            {
                path: '/barcodes-list',
                component: () => import('@/views/BarCodesList.vue')
            },
            {
                path: '/system/scheme',
                component: () => import('@/views/Scheme.vue')
            },
            {
                path: '/system/dict',
                component: () => import('@/views/Dict.vue')
            },
            {
                path: '/system/rule',
                component: () => import('@/views/Rule.vue')
            },
            {
                path: '/system/template',
                component: () => import('@/views/Template.vue')
            }
        ]
    },
  ]

  const router = createRouter({
    // 1. 使用传统url模式
    // history: createWebHistory(),
    // 2. 使用带#号的哈希模式
    history: createWebHashHistory(),
    routes,
  })
export default router




