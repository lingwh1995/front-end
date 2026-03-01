<<template>
  <div class="col-xs-offset-2 col-xs-8">
    <div class="page-header">
      <h2>Banner</h2>
      <!-- vue中使用编程式路由完成路由跳转 -->
      <button class="btn btn-default" active-class="active" @click="forward">前进</button>
      <button class="btn btn-default" active-class="active" @click="back">后退</button>
      <button class="btn btn-default" active-class="active" @click="go">测试go用法</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner',
  methods: {
    forward() {
      this.$router.forward()
    },
    back() {
      this.$router.back()
    },
    go() {
      this.$router.go(-2)
    }
  }
}
</script>

<style>

</style>