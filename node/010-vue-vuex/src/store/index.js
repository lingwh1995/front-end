import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/**
 * Vuex定义的方法触发方式:
 *      mutations:可以直接改变状态
 *          this.$store.commit('方法名')
 *          this.$store.commit('方法名',方法参数)
 *      actions:通过mutations来改变状态
 *          this.$store.dispatch('方法名')
 *          this.$store.dispatch('方法名',方法参数)
 * 注意:方法参数专业性的术语就称为载荷
 */
const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        },
        incrementByStep(state,x) {
            state.count+= x
        }
    },
    actions: {
        increment(context){
            context.commit('increment')
        },
        incrementByStep(context,x){
            context.commit('incrementByStep',x)
        }
    },
    getters: {
        //派生属性,根据state.count的值决定要返回什么值给用户
        remark(state) {
            let count = state.count
            if(count > 5){
                return '我已经大于5了'
            }else{
                return '通过观察我的变化来测试派生属性'
            }
        }
    }
})

export default store