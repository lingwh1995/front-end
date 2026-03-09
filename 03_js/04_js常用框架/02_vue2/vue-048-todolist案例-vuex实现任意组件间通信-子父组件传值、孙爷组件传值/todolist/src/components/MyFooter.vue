<template>
  <div v-show="isShowFooter">
    <input type="checkbox" @change="switchItemsCheckedState" :checked="isChecked"/> 
    已完成{{alreadyCompleted}}/全部{{items.length}}
    <button @click="deleteCompletedItems">清除已完成任务</button>
  </div>
</template>

<script>
export default {
  name:'MyFooter',
  props: {
    items: Array,
  },
  computed: {
    alreadyCompleted() {
      //filter()实现 
      //return this.items.filter(item => item.completed == true).length
      //reduce()实现
      return this.items.reduce((prev,item) => prev + (item.completed ? 1 : 0),0)
    },
    isShowFooter() {
      return this.items.length >0
    },
    isChecked() {
      return this.items.length >0 && this.alreadyCompleted == this.items.length
    }
  },
  methods: {
    deleteCompletedItems() {
      let deletedItemIndexs = []
      this.items.forEach((item,index) => {
        if(item.completed == true) {
          deletedItemIndexs.push(index)
        }
      })
      //当子组件中的deleteCompletedItems()方法执行时会触发store(vuex)的mutations中的DELETE_COMPLETED_ITEMS()执行
      this.$store.commit('DELETE_COMPLETED_ITEMS',deletedItemIndexs)
    },
    switchItemsCheckedState(event) {
      //当子组件中的switchItemsCheckedState()方法执行时会触发store(vuex)的mutations中的SWITCH_ITEMS_CHECKED_STATE()执行
      this.$store.commit('SWITCH_ITEMS_CHECKED_STATE',event.target.checked)
    }
  },
}
</script>

<style>

</style>