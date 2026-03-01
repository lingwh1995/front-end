<template>
    <div class="content">
        <h1>{{info}}</h1>
    </div>
</template>

<script>
    //默认暴露
    export default {
        name:'Content',
        data() {
            return {
                info: 'Content'
            }
        }
    }
</script>

<style>
    .content {
        background-color: green;
        height: 500px;
        width: 100%;
    }
</style>