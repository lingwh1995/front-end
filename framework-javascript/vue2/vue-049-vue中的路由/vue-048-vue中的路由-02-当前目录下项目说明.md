1.vue-router-001-start       
    搭建好了vue-router的开发环境 
    + 企业开发中将组件分为路由组件和一般组件
2.vue-router-002-verify
    搭建好了vue-router的开发环境 
    + 企业开发中将组件分为路由组件和一般组件 
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器$routers
3.vue-router-003-nest-routes  
    搭建好了vue-router的开发环境 
    + 企业开发中将组件分为路由组件和一般组件 
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
4.vue-router-004-to-query  
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + 使用to + query 进行路由传参 + 使用 query 接收传递的参数(to传递参数的前两种写法:to的字符串写法 + to的对象写法)
5.vue-router-005-named-routes  
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + 使用to + query 进行路由传参 + 使用 query 接收传递的参数(to传递参数的前两种写法:to的字符串写法 + to的对象写法)
    + 给路由命名(这样使用路由时可以使用name代替path简化路径的传递)
6.vue-router-006-to-pathvariable
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + 路径传参[类似于SpringMVC的@PathVariable风格]:
        使用to的路径传参风格进行路由传参 + 使用 params 接收传递的参数(to传递参数的第三种写法:to的字符串写法 + to的对象写法)
7.vue-router-007-to-params
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + 使用to + params 进行路由传参 + 使用params接收传递的参数
8.vue-router-008-props
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + a.使用to + params 进行路由传参 + 使用props简化参数接收 
      b.使用to + query  进行路由传参 + 使用props简化参数接收
9.vue-router-009-programmatic-navigation
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + a.使用to + params 进行路由传参 + 使用props简化参数接收
      b.使用to + query  进行路由传参 + 使用props简化参数接收
    + vue编程式路由导航
10.vue-router-010-cache
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + a.使用to + params 进行路由传参 + 使用props简化参数接收
      b.使用to + query  进行路由传参 + 使用props简化参数接收
    + vue编程式路由导航
    + 使用<keep-alive></keep-alive>缓存路由组件
11.vue-router-011-cache-router-lifecycle
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + a.使用to + params 进行路由传参 + 使用props简化参数接收
      b.使用to + query  进行路由传参 + 使用props简化参数接收
    + vue编程式路由导航
    + 使用<keep-alive></keep-alive>缓存路由组件
    + 路由组件独有的两个生命周期(activated和deactivated)
12.vue-router-012-global-navigation-guards
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + a.使用to + params 进行路由传参 + 使用props简化参数接收
      b.使用to + query  进行路由传参 + 使用props简化参数接收
    + vue编程式路由导航
    + 使用<keep-alive></keep-alive>缓存路由组件
    + 路由组件独有的两个生命周期(activated和deactivated)
    + 全局导航守卫 beforeEach和afterEach (路由守卫:可以用于执行校验用户是否登陆了等操作)
13.vue-router-013-global-navigation-guards-meta
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + a.使用to + params 进行路由传参 + 使用props简化参数接收
      b.使用to + query  进行路由传参 + 使用props简化参数接收
    + vue编程式路由导航
    + 使用<keep-alive></keep-alive>缓存路由组件
    + 路由组件独有的两个生命周期(activated和deactivated)
    + 全局导航守卫 beforeEach和afterEach (路由守卫:可以用于执行校验用户是否登陆了等操作)
    + 路由元信息
14.vue-router-014-pre-route-guards
    搭建好了vue-router的开发环境
    + 企业开发中将组件分为路由组件和一般组件
    + 验证一个项目中有多个路由规则$router，但是只有一个路由器
    + 嵌套路由/多级路由
    + a.使用to + params 进行路由传参 + 使用props简化参数接收
      b.使用to + query  进行路由传参 + 使用props简化参数接收
    + vue编程式路由导航
    + 使用<keep-alive></keep-alive>缓存路由组件
    + 路由组件独有的两个生命周期(activated和deactivated)
    + 全局导航守卫 beforeEach和afterEach (路由守卫:可以用于执行校验用户是否登陆了等操作)
    + 路由元信息
    + 独享路由守卫 beforeEnter