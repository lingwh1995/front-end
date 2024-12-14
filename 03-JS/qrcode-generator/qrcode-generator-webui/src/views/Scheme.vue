<template>
  <!-- 新增方案dialog开始 -->
  <el-dialog v-model="schemeDialogTableVisible" :title="dialogTitle" width="500">
    <el-form :model="scheme" :rules="rules" ref="schemeFormRef">
      <el-form-item label="方案名称" prop="schemeName" :label-width="formLabelWidth">
        <el-input v-model="scheme.schemeName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="方案备注" :label-width="formLabelWidth">
        <el-input v-model="scheme.schemeComments" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="启用状态" :label-width="formLabelWidth">
        <el-switch v-model="scheme.schemeStatus" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="schemeDialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddScheme" v-if="operateType == 'ADD'">
          保存
        </el-button>
        <el-button type="primary" @click="handleUpdateScheme" v-if="operateType == 'UPDATE'">
          更新
        </el-button>
      </div>
    </template>
  </el-dialog>
  <!-- 新增方案dialog结束 -->
  <el-row style="padding-left: 20px;padding-right: 20px;padding-top: 20px;">
    <el-col :span="2">
      <el-button type="success" plain @click="handleOpenAddSchemeDialog">新增方案</el-button>
    </el-col>
    <el-col :span="5">
      <el-form-item label="请输入方案名称：">
        <el-input v-model.lazy="conditions.schemeName" style="width: 240px" clearable placeholder="请输入方案名称" />
      </el-form-item>
    </el-col>
  </el-row>

  <el-row style="padding-left: 20px;padding-right: 20px;">
    <!-- 展示方案列表开始 -->
    <el-table :data="schemeList" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="height: 650px;">
      <el-table-column type="index" />
      <el-table-column property="schemeName" label="方案名称" />
      <el-table-column property="schemeComments" label="方案备注" />
      <el-table-column property="schemeStatus" :formatter="schemeStatusFormatter" label="启用状态" />
      <el-table-column prop="createTime" :formatter="dateFormatter" sortable label="创建时间" />
      <el-table-column prop="updateTime" :formatter="dateFormatter" sortable label="更新时间" />
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button link type="primary" @click="handleOpenEditSchemeDialog(scope.row)">
            编辑
          </el-button>
          <el-button link type="primary" @click.once="handleDeleteSchemeById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top:10px">
      <el-pagination v-model:current-page="pagingParameters.currentPage" v-model:page-size="pagingParameters.pageSize"
        :page-sizes="[5, 10, 20, 50]"
        layout="total, sizes, prev, pager, next, jumper" :total="pagingParameters.total"
        @size-change="handlePageSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 展示方案列表结束 -->
  </el-row>
</template>

<script>
import { reactive, ref, onMounted, watch } from "vue";
import { ElMessage } from "element-plus";
import { addScheme, getSchemesPagination, getSchemesBySchemeNamePagination, deleteSchemeById, updateScheme } from '@/api/scheme.js'
import _ from 'lodash'
//格式化日期插件
import dayjs from 'dayjs';

export default {
  name: "Scheme",
  setup() {
    //scheme面板是否显示
    const schemeDialogTableVisible = ref(false)
    //面板标题
    const dialogTitle = ref('新增方案')
    //操作类型
    const operateType = ref('UPDATE')

    //表单项宽度
    const formLabelWidth = '140px'
    //表单引用，用于表单校验
    const schemeFormRef = ref(null)

    //方案实体模板
    const SCHEME_TEMPLATE = {
      //id
      id: null,
      //方案标识
      schemeId: null,
      //方案名称
      schemeName: null,
      //方案备注
      schemeComments: null,
      //方案启用状态
      schemeStatus: true,
      //创建时间
      createTime: null,
      //更新时间
      updateTime: null,
    }

    //方案实体
    const scheme = reactive(_.cloneDeep(SCHEME_TEMPLATE))

    //查询条件
    const conditions = reactive({
      schemeName: null
    })

    //封装分页参数
    const pagingParameters = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0
    })

    //查询出来的所有方案
    const schemeList = ref([])

    /**
     * 刷新方案列表
     */
    const refreshSchemeList = async () => {
      const response = await getSchemesPagination(pagingParameters)
      if (response.code == 200) {
        //设置列表数据
        schemeList.value = response.data.list
        //设置分页总页数
        pagingParameters.total = response.data.total
      } else {
        ElMessage({
          message: "查询方案列表失败",
          type: "error",
          plain: true,
        });
      }
    }
    

    onMounted(async () => {
      //初次打开页面时查询方案列表
      refreshSchemeList()
      //获取总条数
    })

    /**
     * 打开新增方案Dialog
     */
    const handleOpenAddSchemeDialog = () => {
      schemeDialogTableVisible.value = true
      dialogTitle.value = '新增方案'
      operateType.value = 'ADD'
    }

    /**
     * 真正执行保存方案的操作
     */
    const doHandleAddScheme = async () => {
      //执行保存操作
      const response = await addScheme(scheme)
      if (response.data.code === '200') {
        //提示保存成功
        ElMessage({
          message: "保存方案成功",
          type: "success",
          plain: true,
        });
        //关闭Dialog
        schemeDialogTableVisible.value = false
        //清除方案实体中的缓存数据
        const scheme_ = _.cloneDeep(SCHEME_TEMPLATE)
        Object.keys(scheme_).forEach(key => {
          scheme[key] = scheme_[key]
        });
        //刷新方案列表
        refreshSchemeList()
      } else {
        ElMessage({
          message: "保存方案失败",
          type: "error",
          plain: true,
        });
      }
    }
    /**
     * 新增方案
     */
    const handleAddScheme = () => {
      //表单校验
      schemeFormRef.value.validate((valid) => {
        if (valid) {
          doHandleAddScheme()
        }
      })
    }

    //删除方案
    const handleDeleteSchemeById = async (row) => {
      const response = await deleteSchemeById(row.id)
      if (response.data.code === '200') {
        ElMessage({
          message: "删除方案成功",
          type: "success",
          plain: true,
        });
        //刷新方案列表
        refreshSchemeList()
      } else {
        ElMessage({
          message: "删除方案失败",
          type: "error",
          plain: true,
        });
      }
    }

    //打开编辑方案Dialog
    const handleOpenEditSchemeDialog = (row) => {
      schemeDialogTableVisible.value = true
      operateType.value = 'UPDATE'
      dialogTitle.value = '编辑方案'
      Object.keys(row).forEach(key => {
        scheme[key] = row[key]
      })
      //单独处理方案启用状态
      scheme.schemeStatus = scheme.schemeStatus === '0' ? true : false
    }

    /**
     * 真正执行更新方案的操作
     */
    const doHandleUpdateScheme = async () => {
      //执行更新操作
      const response = await updateScheme(scheme)
      if (response.data.code === '200') {
        //提示更新成功
        ElMessage({
          message: "更新方案成功",
          type: "success",
          plain: true,
        });
        //关闭Dialog
        schemeDialogTableVisible.value = false
        //清除方案实体中的缓存数据
        const scheme_ = _.cloneDeep(SCHEME_TEMPLATE)
        Object.keys(scheme_).forEach(key => {
          scheme[key] = scheme_[key]
        });
        //刷新方案列表
        refreshSchemeList()
      } else {
        ElMessage({
          message: "更新方案失败",
          type: "error",
          plain: true,
        });
      }
    }

    /**
     * 更新方案信息
     */
    const handleUpdateScheme = () => {
      //表单校验
      schemeFormRef.value.validate((valid) => {
        if (valid) {
          doHandleUpdateScheme()
        }
      })
    }

    //调整pageSize大小
    const handlePageSizeChange = async () => {
      refreshSchemeList()
    }
    //调整currentChange大小
    const handleCurrentChange = async () => {
      refreshSchemeList()
    }

    //格式化方案启用状态
    const schemeStatusFormatter = (row, column, cellValue) => {
      return cellValue === '0' ? '启用' : '停用';
    }

    //定义表单校验规则
    const rules = reactive({
      schemeName: [
        { required: true, message: '请输入方案名称', trigger: 'blur' },
        { min: 1, max: 50, message: '规则名称的长度应该介于1到50之间', trigger: 'blur' },
      ],
    })

    //格式化日期
    const dateFormatter = (row, column, cellValue) => {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
    }

    watch(conditions, async (newValue, oldValue) => {
      if (newValue.schemeName.trim() == '') {
        refreshSchemeList()
      } else {
        const response = await getSchemesBySchemeNamePagination(pagingParameters, conditions)
        if (response.code == 200) {
          schemeList.value = response.data.list
        } else {
          ElMessage({
            message: "刷新查询方案列表失败",
            type: "error",
            plain: true,
          });
        }
      }
    })

    return {
      schemeDialogTableVisible,
      conditions,
      scheme,
      formLabelWidth,
      schemeList,
      handleAddScheme,
      handleDeleteSchemeById,
      pagingParameters,
      handlePageSizeChange,
      handleCurrentChange,
      schemeStatusFormatter,
      handleOpenEditSchemeDialog,
      dialogTitle,
      handleUpdateScheme,
      operateType,
      handleOpenAddSchemeDialog,
      rules,
      schemeFormRef,
      dateFormatter,
    };
  },
};
</script>

<style scoped></style>
