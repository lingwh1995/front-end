<template>
  <div style="margin-left: 2.5%;">
    <div class="pageHeader">方案名称：{{ currentSelectdRowData.schemeName }}</div>
    <div class="pageHeader">规则名称：{{ currentSelectdRowData.ruleName }}</div>
    <div class="pageHeader">生成数量：{{ currentSelectdRowData.batchAmount }}</div>
    <div class="pageHeader">生成时间：{{ dateFormatter(currentSelectdRowData.createTime) }}</div>
  </div>
  <div style="clear:left;height: 20px;" />
  <div style="height: 80%;">
    <ul class="infinite-list" style="height: 100%;overflow:scroll">
      <li v-for="(barCodesforPage, index) in barCodesValueForUserListCurrentGenerate" :key="index"
        class="infinite-list-item">
        {{ barCodesforPage }}</li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, watch } from "vue";
//格式化日期插件
import dayjs from 'dayjs';

export default {
  name: 'BarCodesHistoryGeneratePreview',
  props: {
    barCodesHistoryGeneratorDialogVisible: Boolean,
    currentSelectdRowData: Object
  },
  setup(props) {
    //存放每个批次色生成的所有条码的数组
    const batchBarCodesList = ref([])
    //存放每个批次生成的所有条码的数组(用于页面展示)
    const barCodesValueForUserListCurrentGenerate = ref([])
    //监听父组件传递过来的 barCodesGeneratorDialogVisible的变化，通过这个来确定弹窗是否是打开状态
    //每次弹窗关闭时清空历史生成记录数组
    watch(() => props.barCodesHistoryGeneratorDialogVisible, (val) => {
      //重新给这个对象赋值
      batchBarCodesList.value = JSON.parse(props.currentSelectdRowData.barCodesValue)
      //每次弹窗关闭时清空历史生成记录数组
      if (!val) {
      }
    })

    onMounted(() => {
      //页面挂载时给这个数组赋初始值
      batchBarCodesList.value = JSON.parse(props.currentSelectdRowData.barCodesValue)
    })


    //监控batchBarCodesList这个数组的元素发生的变化
    watch(batchBarCodesList, (newValue, oldValue) => {
      //每次展示之前清除上一次的数据
      barCodesValueForUserListCurrentGenerate.value = []
      batchBarCodesList.value.forEach(barCodeValue => {
        let barCodeValue_ = []
        Object.keys(barCodeValue).forEach(key => {
          let barCodeValuePart = ''
          barCodeValue[key].forEach(barCodeValueField => {
            barCodeValuePart += barCodeValueField.formItemFieldValue
          })
          barCodeValuePart = key + ':' + barCodeValuePart
          barCodeValue_.push(barCodeValuePart)
        })
        barCodesValueForUserListCurrentGenerate.value.push(barCodeValue_.join(';'))
      })
    })

    //格式化日期
    const dateFormatter = (value) => {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    }

    return {
      batchBarCodesList,
      barCodesValueForUserListCurrentGenerate,
      dateFormatter
    }
  },

};
</script>
<style scoped>
/**表单项长度 */
.form-item-width {
  width: 60%;
}

.infinite-list {
  height: 500px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  line-height: 30px;
  background: #F2F3F5;
  margin: 10px;
  font-size: 20px;
  font-family: 'SimHei';
  color: black;
  width: 95%;
  margin: 0 auto;
}

.infinite-list .infinite-list-item+.list-item {
  margin-top: 10px;
}

.pageHeader {
  width: 50%;
  float: left;
  height: 30px;
  line-height: 30px;
  font-size: 20px;
  font-family: 'SimHei';
  color: black;
}
</style>