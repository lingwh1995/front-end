<template>
    <div>
        <h1>我是父组件！</h1>
        <!-- 静态传递:通过自定义属性传递数据 -->
        <child message="我是子组件一"></child>
        <!-- 静态传递:通过自定义属性传递数据 -->
        <child :fullName="firstName+lastName"></child>
        <!-- 父组件调用子组件的方法 -->
        <child ref="childComponent"></child>
        <button @click="handleClick">测试父组件调用子组件的方法</button>
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
                firstName: 'ling',
                lastName : 'wh'
            }
        },
        methods: {
            handleClick() {
                console.log(this.$refs)
                // 父组件调用子组件中的方法
                this.$refs.childComponent.alertMsg('我是父组件传递给子组件的数据!')
                // 父组件调用子组件中的属性
                alert(this.$refs.childComponent.childProp)
            }
        },
        template:''
    }
</script>  