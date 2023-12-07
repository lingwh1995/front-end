<template>
    <div>
        <h3>{{message}}</h3>
        <h3>{{fullName}}</h3>
    </div>
</template>
<script>
export default {
    data() {
        return {
            childProp: '我是子组件的属性'
        }
    },
    props: ['message','fullName'],
    methods: {
        alertMsg(msg) {
            alert(msg);
        }
    }
}
</script>>