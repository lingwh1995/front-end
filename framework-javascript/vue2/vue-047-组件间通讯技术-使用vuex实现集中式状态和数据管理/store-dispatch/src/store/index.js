/**
 * 演示dispatch的链式处理能力
 */

//引入Vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//使用vuex
Vue.use(Vuex)

//准备actions：用于响应组件中的动作
const actions = {
    step_1(context,value) {
        console.log('actions中的step_1()被调用了')
        console.log(context,value)
        console.log('dispatch的第1个步骤...')
        context.dispatch('step_2',value)
    },
    step_2(context,value) {
        console.log('actions中的step_2()被调用了')
        console.log(context,value)
        console.log('dispatch的第2个步骤...')
        context.dispatch('step_3',value)
    },
    step_3(context,value) {
        console.log('actions中的step_3()被调用了')
        console.log(context,value)
        console.log('dispatch的第3个步骤...')
        context.commit('NEXT',value)
    },
}

//准备mutations：用于操作数据 {state}
const mutations = {
    //执行具体的加法操作
    NEXT(state,value) {
        console.log('mutations中的NEXT被调用了',state,value)
        state.content = value.toUpperCase()
    }
}
//准备state：用于存储数据
const state = {
    content: ''
}

//创建并对外暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state
})
