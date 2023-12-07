<template>
  <div>
    <br>
    <el-form :inline="true">
      <el-form-item label="姓名">
        <el-input v-model="searchMap.name" placeholder="请输入活动名称" />
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="searchMap.startTime"
          type="date"
          placeholder="选择开始日期"
        />
        <el-date-picker
          v-model="searchMap.endTime"
          type="date"
          placeholder="选择结束日期"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="fetchData">查询</el-button>
        <el-button type="primary" @click="dialogAddVisible = true">新增</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="summary"
        label="概述"
        min-width="25%"
      />
      <el-table-column
        prop="name"
        label="姓名"
        min-width="25%"
      />
      <el-table-column
        prop="address"
        label="地址"
        min-width="25%"
      />
      <el-table-column
        fixed="right"
        label="操作"
        min-width="25%"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClickDetail(scope.row)">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="fetchData"
      @current-change="fetchData"
    />
    <el-dialog
      title="新增"
      :visible.sync="dialogAddVisible"
      width="30%"
      :before-close="handleClose"
      @open="handleOpen"
    >
      <el-form ref="pojo" :model="pojo" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="pojo.name" />
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="pojo.address" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="savePojo">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import gatheringApi from '@/api/gathering.js'

export default {
  data() {
    return {
      tableData: [],
      total: 0,
      currentPage: 1,
      pageSize: 10,
      searchMap: {},
      dialogAddVisible: false,
      pojo: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 分页查询
    fetchData() {
      console.log('查询条件:' + this.searchMap)
      gatheringApi.getPageableList(this.currentPage, this.pageSize, this.searchMap)
        .then(response => {
          this.tableData = response.data.rows
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleClickDetail(row) {
      var id = row.id
      if (id !== '') {
        // 根据id查询数据,并且把查询到的数据显示到dialog页面
      }
      console.log(id)
    },
    savePojo() {
      gatheringApi.savePojo(this.pojo)
        .then(response => {
          var isflag = response.flag
          if (isflag) {
            this.fetchData
          }
          this.dialogVisible = false
        })
    },
    // 打开弹窗前回调
    handleOpen() {
      this.pojo = {}
    },
    // 关闭弹窗前回调
    handleClose() {
      this.fetchData()
      this.dialogAddVisible = false
    }
  }
}
</script>
