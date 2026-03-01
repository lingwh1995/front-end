<template>
    <div class="header">
        <h1>{{info}}</h1>
    </div>
</template>

<script>
    //默认暴露
    export default {
        name:'Header',
        data() {
            return {
                info: 'HEADER'
            }
        }
    }
</script>

<style>
    .header {
        background-color: yellow;
        height: 100px;
        width: 100%;
    }
</style>