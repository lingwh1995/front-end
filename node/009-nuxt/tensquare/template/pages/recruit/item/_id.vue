<template>
    <div class="wrapper">
        <h1>我是详情页面</h1>
    </div>
</template>
<script>
export default {
    asyncData({ params }){
        console.log('进入了asyncData()方法......');
        console.log(params)
        return {

        }
    }
}
</script>>