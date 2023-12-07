<template>
  <div>
    <input type="checkbox"/>
    {{item.todo}}
    <button>删除</button>
  </div>
</template>

<script>
export default {
  name:'MyItem',
  props: ['item']
}
</script>

<style>

</style>