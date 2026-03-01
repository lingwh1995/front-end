<template>
    <div class="footer">
        <h1>{{info}}</h1>
    </div>
</template>

<script>
    //默认暴露
    export default {
        name:'Footer',
        data() {
            return {
                info: 'FOOTER'
            }
        }
    }
</script>

<style>
    .footer {
        background-color: red;
        height: 100px;
        width: 100%;
    }
</style>