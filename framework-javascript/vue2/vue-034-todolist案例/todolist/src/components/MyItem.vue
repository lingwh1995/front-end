<template>
  <div>
    <input type="checkbox"/>
    {{item}}
    <button>删除</button>
  </div>
</template>

<script>
export default {
  name:'MyItem',
  props: {
    item: String
  }
}
</script>

<style>

</style>