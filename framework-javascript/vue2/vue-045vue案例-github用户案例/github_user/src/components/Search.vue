<template>
  <div>
    <section class="jumbotron">
      <h3 class="jumbotron-heading">Search Github Users</h3>
      <div>
        <input type="text" v-model="keyWord" placeholder="enter the name you search"/>&nbsp;
        <button @click="searchUsersByKeyWord">Search</button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {
      keyWord: ''
    }
  },
  methods: {
    searchUsersByKeyWord() {
      //todo  使用es6合并对象简化传参操作
      /**
       * $emit使用小技巧:语义化发射数据
       *    isFirst    是否首次访问当前页面
       *    isLoading  是否正在加载中
       *    isError    是否发生了错误
       *    errorMsg   具体的错误信息
       */
      //隐藏欢迎词
      this.$bus.$emit('get-page-show-behavior',{isFirst:false,isLoading:true,isError:false,errorMsg:''})
      this.$axios.get(`https://api.github.com/search/users?q=${this.keyWord}`).then(
        response =>{
          //把查询出来的所有用户发送给List页面
          this.$bus.$emit('get-users',response.data.items)
          //隐藏欢迎词 + 隐藏加载中
          this.$bus.$emit('get-page-show-behavior',{isFirst:false,isLoading:false,isError:false,errorMsg:''})
        },
        error => {
          //隐藏欢迎词 + 隐藏加载中 + 展示错误信息
          this.$bus.$emit('get-page-show-behavior',{isFirst:false,isLoading:false,isError:true,errorMsg:error.message})
          //清空List页面data中的users中的数据
          this.$bus.$emit('get-users',[])
        })
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
