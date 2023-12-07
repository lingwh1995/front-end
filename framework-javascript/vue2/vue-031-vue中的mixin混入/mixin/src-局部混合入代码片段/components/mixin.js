export const mixin = {
    methods: {
        show(param){
            alert(this.msg + ',调用当前方法的组件名称:' + param)
        }
    },
    mounted() {
        console.log('mounted...')
    }
}