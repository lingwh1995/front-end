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
      this.$emit('delete-completed-items-bus',deletedItemIndexs)
    },
    switchItemsCheckedState(event) {
      this.$emit('switch-items-checked-state-bus',event.target.checked)
    }
  },
}
</script>

<style>

</style>