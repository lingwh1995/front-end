export default {
    namespaced:true,
    //准备actions：用于响应组件中的动作
    actions: {
        //加法动作
        addBehavior(context,value) {
            console.log('actions中的addBehavior()被调用了')
            console.log(context,value)
            context.commit('addBehavior',value)
        },
        //减法动作
        subBehavior(context,value) {
            console.log('actions中的subBehavior()被调用了')
            console.log(context,value)
            context.commit('addDelayBehavior',value)
        },
        //延迟加法动作
        addDelayBehavior(context,value) {
            //这里的延迟操作要写在actions中，而不是写在mutations中
            setTimeout(() => {
                console.log('actions中的addDelayBehavior()被调用了')
                console.log(context,value)
                context.commit('addDelayBehavior',value)
            },1000)
        }
    },
    //准备mutations：用于操作数据 {state}
    mutations: {
        //测试 CountV3中的 [调用store(vuex)的mutations中的方法v3.0 - 数组式写法] 放开下面注释
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
        }
    },
    //准备state：用于存储数据
    state: {
        sum: 0,
        school: {
            schooName:'西安财经学院',
            schooAddress:'陕西省西安市长安区韦常南路',
        }
    },

    //准备getters用于加工state中的数据
    //getters可以理解为 多组件 公共都可以使用的 计算属性computed
    getters: {
        bigSum: state => state.sum * 10
    }
}