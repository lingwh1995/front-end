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
const actions = {
    //加法动作
    addBehavior(context,value) {
        console.log('actions中的addBehavior()被调用了')
        console.log(context,value)
        context.commit('ADD',value)
    },
    //减法动作
    subBehavior(context,value) {
        console.log('actions中的subBehavior()被调用了')
        console.log(context,value)
        context.commit('SUB',value)
    },
    //延迟加法动作
    addDelayBehavior(context,value) {
        //这里的延迟操作要写在actions中，而不是写在mutations中
        setTimeout(() => {
            console.log('actions中的addDelayBehavior()被调用了')
            console.log(context,value)
            context.commit('ADDDELAY',value)
        },1000)
    }
}

//准备mutations：用于操作数据 {state}
const mutations = {
    //执行具体的加法操作
    ADD(state,value) {
        console.log('mutations中的ADD被调用了',state,value)
        state.sum += value
    },
    //执行具体的减法操作
    SUB(state,value) {
        console.log('mutations中的SUB被调用了',state,value)
        state.sum -= value
    },
    //执行具体的延迟加操作
    ADDDELAY(state,value) {
        console.log('mutations中的ADDDELAY被调用了',state,value)
        state.sum += value
    },

    //测试 CountV3中的 [调用store(vuex)的mutations中的方法v3.0 - 数组式写法] 放开下面注释
    /*
    //执行具体的加法操作
    addBehavior(state,value) {
        console.log('mutations中的ADD被调用了',state,value)
        state.sum += value
    },
    //执行具体的减法操作
    subBehavior(state,value) {
        console.log('mutations中的SUB被调用了',state,value)
        state.sum -= value
    },
    //执行具体的延迟加操作
    addDelayBehavior(state,value) {
        console.log('mutations中的ADDDELAY被调用了',state,value)
        state.sum += value
    },
    */
}
//准备state：用于存储数据
const state = {
    sum: 0,
    school: {
        schooName:'西安财经学院',
        schooAddress:'陕西省西安市长安区韦常南路',
    }
}
//准备getters用于加工state中的数据
//getters可以理解为 多组件 公共都可以使用的 计算属性computed
const getters = {
    bigSum(state) {
        return state.sum * 10
    }
}
//创建并对外暴露store
export default new Vuex.Store({
    actions:actions,
    mutations:mutations,
    state:state,
    getters:getters
})
