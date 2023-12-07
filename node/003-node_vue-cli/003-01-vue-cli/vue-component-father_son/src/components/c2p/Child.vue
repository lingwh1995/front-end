<template>
    <div>
        <button @click="testEmit">测试子组件调用父组件中的方法</button>
    </div>
</template>
<script>
export default {
    data() {
        return {
           
        }
    },
    props: [],
    methods: {
        testEmit() {
            console.log('子组件中的方法已经被触发')
            this.$emit('handleEmit','123')
        }
    }
}
</script>>