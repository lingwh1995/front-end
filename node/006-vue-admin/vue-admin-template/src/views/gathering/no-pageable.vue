<template>
  <el-table
    :data="tableData"
    style="width: 100%"
  >
    <el-table-column
      prop="date"
      label="日期"
      min-width="33%"
    />
    <el-table-column
      prop="name"
      label="姓名"
      min-width="33%"
    />
    <el-table-column
      prop="address"
      label="地址"
      min-width="33%"
    />
  </el-table>
</template>

<script>
import gatheringApi from '@/api/gathering.js'

export default {
  data() {
    return {
      tableData1: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }],
      tableData: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
  // 非分页查询
    fetchData() {
      gatheringApi.getList()
        .then(response => {
          this.tableData = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>
