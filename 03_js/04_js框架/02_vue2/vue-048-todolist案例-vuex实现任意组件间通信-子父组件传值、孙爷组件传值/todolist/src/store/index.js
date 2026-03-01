/**
 * 演示vuex的完整使用流程
 *  dispatch -> actions -> mutations
 */

//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//使用vuex
Vue.use(Vuex)

//准备actions：用于响应组件中的动作
const actions = { }

//准备mutations：用于操作数据 {state}
const mutations = {
    //增加一个item
    ADD_ITEM(state,item){
        console.log('mutations中的ADD_ITEM被调用了',state,item)
        state.items.unshift(item)
    },
    //根据itemId删除item
    DELETE_ITEM(state,itemId){
        console.log('mutations中的DELETE_ITEM被调用了',state,itemId)
        state.items = state.items.filter((item) => {
            return itemId != item.id
          })
    },
    //根据itemId切换item的选中状态
    SWITCH_ITEM_CHECKED_STATE(state,itemId) {
        console.log('mutations中的SWITCH_ITEM_CHECKED_STATE被调用了',state,itemId)
        state.items.forEach((item) => {
            if(itemId == item.id) {
              item.completed = ! item.completed
            }
          })
    },
    //根据索引删除已经完成的item
    DELETE_COMPLETED_ITEMS(state,deletedItemIndexs) {
        state.items = state.items.filter((item,index) => {
            return deletedItemIndexs.indexOf(index) == -1
          })
    },
    //切换全部items的选中状态
    SWITCH_ITEMS_CHECKED_STATE(state,isChecked) {
        state.items.forEach(item => {
            item.completed = isChecked
          })
    }
}

//准备state：用于存储数据
const state = {
    items:[]
}
//准备getters用于加工state中的数据
//getters可以理解为 多组件 公共都可以使用的 计算属性computed
const getters = {

}
//创建并对外暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
    getters:getters
})
