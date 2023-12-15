import Vue from 'vue'
import Router from 'vue-router-start'
import GooldList from '@/views/GoodsList.vue'
import Title from '@/views/Title.vue'
import Photo from '@/views/Photo.vue'
import Page1 from '@/views/Page1.vue'
import Page2 from '@/views/Page2.vue'
import Page3 from '@/views/Page3.vue'
import Page4 from '@/views/Page4.vue'
import vueResourceHttp from '@/views/vue-resource-$http.vue'
import vueResourceResource from '@/views/vue-resource-$resource.vue'
import vueAxios from '@/views/vue-axios.vue'
// 嵌套路由,父路由不能用import导入
import Me from '@/views/nestRouter/index.vue'

Vue.use(Router)

export default new Router({
  /**
   * mode属性有两个值:
   *  hash:url中有#
   *    http://localhost:8088/#/goods/556/user/admin
   *  history:url中不包含#,看起来更像是传统的前后端不分离的项目
   *    http://localhost:8088/goods/556/user/admin
   */
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'root',
      components: {
        default: GooldList,
        title123: Title,
        photo: Photo
      }
    },
    {
      /**
       * 测试url: http://localhost:8088/#/goods/556/user/admin
       * 在打开页面中获取goodsId: {{$route.params.goodsId}}
       * 在打开页面中获取goodsId: {{$route.params.name}}
       */
      // path: '/goods/:goodsId/user/:name', //测试通过路由路径传值
      path: '/goods',
      name: 'GooldList',
      components: {
        default: GooldList,
        title123: Title,
        photo: Photo
      },
      /**
       * 嵌套路由
       */
      children: [
        {
          path: 'title',
          name: 'title',
          component: Title
        },
        {
          path: 'photo',
          name: 'photo',
          component: Photo
        }
      ]
    },
    {
      path: '/page1',
      name: 'page1',
      component: Page1
    },
    {
      path: '/page2',
      name: 'page2',
      component: Page2
    },
    {
      path: '/page3',
      name: 'page3',
      component: Page3
    },
    {
      path: '/page4/:goodsId',
      name: 'page4',
      component: Page4
    },
    {
      path: '/vue-resource-$http',
      name: 'vue-resource-$http',
      component: vueResourceHttp
    },
    {
      path: '/vue-resource-$resource',
      name: 'vue-resource-$resource',
      component: vueResourceResource
    },
    {
      path: '/vue-axios',
      name: 'vue-axios',
      component: vueAxios
    },
    {
      path: '/me',
      name: 'me',
      component: Me,
      children: [
        {
          // 以/开头的嵌套路径会被当作根路径，所以子路由上不用加/;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
          path: 'collection',
          name: 'collection',
          // component: resolve => require(['@/views/nestRouter/collection.vue'], resolve)
          component: () => import('@/views/nestRouter/collection.vue')
        },
        {
          path: 'trace',
          name: 'trace',
          component: () => import('@/views/nestRouter/trace.vue')
          // component: resolve => require(['@/views/nestRouter/trace.vue'], resolve)

        }
      ]
    }
  ]
})
