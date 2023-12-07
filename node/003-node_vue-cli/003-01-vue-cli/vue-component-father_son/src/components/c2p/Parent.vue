<template>
    <div>
        <h1>我是父组件！</h1>
        <!-- 父组件调用子组件的方法 -->
        <child @handleEmit="handleEmit"></child>
    </div>
</template>
<script> 
    import Child from './Child.vue'
    export default {
        components: {
            Child
        },
        data() {
            return {
            }
        },
        methods: {
            handleEmit(param) {
                alert('我是父组件中的方法,传递过来的参数:' + param)
            }
        },
        template:''
    }
</script>  