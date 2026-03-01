# 1.vue自定义插件和使用自定义插件的过程
## 1.1.编写插件plugins.js
    export default {
        //注意：要给install()设置一个参数，这个参数就是Vue对象
        install(Vue) {
            console.log('插件被调用了...')
            //定义一个全局自定义指令
            Vue.directive('big',
                function(element,binding) {
                    console.log(element instanceof HTMLElement)
                    console.log(binding.value)
                    //实现(将n值放大10倍)功能
                    element.innerText = binding.value * 10
                })

            //注册全局过滤器
            Vue.filter('toUpperCase',function(value){
                return value.toUpperCase()
            })

            //配置全局混入
            Vue.mixin({
                methods: {
                    show(param){
                        alert('调用当前方法的组件名称:' + param)
                    }
                },
                mounted() {
                    console.log('mounted...')
                }
            })

            //给Vue的原型对象上挂载一个属性
            Vue.prototype.isUsePlugins = 'Vue插件已经开始执行了...'
        }
    }
## 1.2.在main.js中引入插件
    import plugins from './plugins'

## 1.3.在main.js中应用插件
    Vue.use(plugins)

# 2.vue自定义插件接收参数
## 2.1.接收内置参数Vue
    定时插件时可以接受到一个默认的内置参数：Vue对象
    export default {
        install(Vue) {
        }
    }
## 2.接收应用插件时传递的参数
    //传递参数
    Vue.use(plugins,'XXX')
    //接收参数
    export default {
        install(Vue,param) {
            console.log(param)
        }
    }