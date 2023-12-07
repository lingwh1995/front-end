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

        //给Vue的原型对象上挂载一个bus对象作为数据传输总线，可以用于实现兄弟组件之间传值
        Vue.prototype.bus = {isEnablePlugins: true}
    }
}