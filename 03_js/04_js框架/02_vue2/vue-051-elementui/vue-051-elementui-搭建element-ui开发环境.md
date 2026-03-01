# 1.完整引入
    修改main.js
        import ElementUI from 'element-ui';
        import 'element-ui/lib/theme-chalk/index.css';
        Vue.use(ElementUI)
# 2.按需引入
    1.执行 npm install babel-plugin-component -D
    2.修改vue.config.js(具体修改详见项目vue.config.js中的内容)
    3.修改main.js
    import {Button,Row} from "element-ui";
    //部分引入组件方式一
    /**
    const components = [
        {name:Button.name,component:Button},
        {name:Row.name,component:Row},
    ]
    components.forEach((component) => {
        //Vue.component：全局注册组件
        //特别注意：Vue.component()中注册的name是什么，使用时就用什么名字
        Vue.component(component.name,component.component)
    })
    */
    
    //部分引入组件方式二
    const components = [ Button,Row ]
        components.forEach((component) => {
        Vue.use(component)
    })
