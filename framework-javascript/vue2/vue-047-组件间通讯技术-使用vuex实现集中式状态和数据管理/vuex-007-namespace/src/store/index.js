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

import CountV1Options from './CountV1Options.js'
import CountV2Options from './CountV2Options.js'
import CountV3Options from './CountV3Options.js'

//创建并对外暴露store
export default new Vuex.Store({
    modules: {
        countV1:CountV1Options,
        countV2:CountV2Options,
        countV3:CountV3Options,
    }

})
