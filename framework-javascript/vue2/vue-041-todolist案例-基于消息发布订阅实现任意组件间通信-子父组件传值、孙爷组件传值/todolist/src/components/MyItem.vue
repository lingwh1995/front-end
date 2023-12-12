<template>
  <div class="item">
    <!-- 
      监控checkbox数据改变，这里有三种实现思路:
          1.@change事件：用于监控表单数据的变化
          2.@click时间：点击单选框之后，触发单击事件
          3.vue独有的v-model属性，利用v-model的双向数据流动特点来修改原数据的改变
              不太推荐第3种处理方式，因为vue规定props是只读的，这个操作有点违规
    -->
    <input type="checkbox" :checked="item.completed" @change="switchItemCheckedState(item.id)"/>
    <!-- <input type="checkbox" v-model="item.completed"/> -->
    <span v-show="! item.isEdit">{{item.todo}}</span>
    <input v-show="item.isEdit" @blur="handleBlur(item)" type="text" v-model="item.todo" ref="inputTodo"/>
    <button class="edit" @click="editItem(item)">编辑</button>
    <button class="delete" @click="deleteItem(item.id)">删除</button>
  </div>
</template>

<script>
export default {
  name:'MyItem',
  //下面这种写法无法接收到父组件传递的boolean类型的数据
  props: {
    item: Object,
  },
  methods: {
    switchItemCheckedState(itemId) {
      //当子组件中的switchItemCheckedState()方法执行时会触发子组件向消息订阅者发布一条消息
      PubSub.publish('switch-item-checked-state-pubsub',itemId)
    },
    deleteItem(itemId) {
      //当子组件中的deleteItem()方法执行时会触发子组件向消息订阅者发布一条消息
      PubSub.publish('delete-item-pubsub',itemId)
    },
    editItem(item) {
      if(item.hasOwnProperty('isEdit')){
        item.isEdit = true
      }else {
        this.$set(item,'isEdit',true)
      }
      this.$nextTick(() => {
        this.$refs.inputTodo.focus()
      })
    },
    //失去焦点时关闭修改状态
    handleBlur(item) {
      item.isEdit = false
    }
  },
}
</script>

<style scoped>
  .item {
    background: lightgray;
    display: flex;
    align-items: center;     /* 垂直居中 */
    width: 400px;
    margin-top: 1px;
  }
  .item .edit {
    background: skyblue;
    margin-left: auto;
  }
  .item .delete {
    background: gray;
    margin-left: auto;
  }
</style>