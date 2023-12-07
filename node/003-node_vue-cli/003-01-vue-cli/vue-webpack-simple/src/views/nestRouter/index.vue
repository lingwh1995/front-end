<template>
  <div class="me">
    <div class="tabs">
      <router-link :to="{name: 'collection'}">我的收藏</router-link>
      <router-link :to="{name: 'trace'}">我的足迹</router-link>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">

</script>
