<template>


  <el-row style="padding-left: 20px;padding-right: 20px;padding-top: 20px;">
    <el-col :span="2">
      <el-button type="success" plain @click="handleOpenAddTemplateDialog">新增模板</el-button>
    </el-col>
    <el-col :span="5">
      <el-form-item label="选择方案">
        <el-select v-model="conditions.schemeId" placeholder="请选择方案" @change="handleSchemeOptionsChange">
          <el-option v-for="(schemeOption, index) in schemeOptions" :key="index" :label="schemeOption.label"
            :value="schemeOption.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="5">
      <el-form-item label="选择规则">
        <el-select v-model="conditions.ruleId" placeholder="请选择条码生成规则" @change="handleRuleOptionsChange">
          <el-option v-for="(ruleOption, index) in ruleOptions" :key="index" :label="ruleOption.label"
            :value="ruleOption.value" :disabled="ruleOption.disabled">
            <span style="float: left">{{ ruleOption.label }}</span>
            <span style="
                float: right;
                color: var(--el-text-color-secondary);
                font-size: 13px;">
              <el-checkbox v-model="ruleOption.asDefault" @change="handleDefaultRuleChange(ruleOption.value)"
                label="设为默认规则" />
            </span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <!-- <el-col :span="5">
      <el-form-item label="请输入模板名称：">
        <el-input v-model.lazy="conditions.ruleName" style="width: 240px" clearable placeholder="请输入规则名称" />
      </el-form-item>
    </el-col> -->
  </el-row>

  <el-row style="padding-left: 20px;padding-right: 20px;">
    <!-- 展示模板列表开始 -->
    <el-table :data="templateList" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="height: 650px;">
      <el-table-column type="index" />
      <el-table-column property="schemeName" label="方案名称" />
      <el-table-column property="ruleName" label="规则" />
      <el-table-column property="templateName" label="规则" />
      <el-table-column property="templateType" :formatter="templateTypeFormatter" label="模板类型" />
      <el-table-column property="templateContent" label="模板内容" />
      <el-table-column property="templateStatus" :formatter="templateStatusFormatter" label="启用状态" />
      <el-table-column prop="createTime" :formatter="dateFormatter" sortable label="创建时间" />
      <el-table-column prop="updateTime" :formatter="dateFormatter" sortable label="更新时间" />
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button link type="primary" @click="handleOpenEditTemplateDialog(scope.row)">
            编辑
          </el-button>
          <el-button link type="primary" @click.once="handleDeleteTemplateById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px;">
      <el-pagination v-model:current-page="pagingParameters.currentPage" v-model:page-size="pagingParameters.pageSize"
        :page-sizes="[5, 10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pagingParameters.total"
        @size-change="handlePageSizeChange" @current-change="handleCurrentChange" />
    </div>
    <!-- 展示模板列表结束 -->
    <el-dialog v-model="addOrEditTemplateDialogVisible" title="新增模板" width="90%" top="100px">
      <div class="dialog">
        <AddOrEditTemplate :barCodesGeneratorDialogVisible="barCodesGeneratorDialogVisible" />
      </div>
    </el-dialog>
  </el-row>
</template>
<script>
import { watch, ref, reactive, onMounted, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import { getSchemesForSelectInput } from '@/api/scheme.js'
import { getRulesBySchemeIdForSelect } from "@/api/rule.js";
import { getTemplatesPagination,deleteTemplateById } from '@/api/template.js'
//导入格式化日期插件
import dayjs from 'dayjs';

import AddOrEditTemplate from '@/views/addOrEditTemplate.vue'

import { TemplateEnum_ } from '@/commons/enum.js'

export default {
  name: "Template",
  components: {
    AddOrEditTemplate: AddOrEditTemplate
  },
  setup() {
    //处理导入的枚举
    const TemplateEnum  = reactive(TemplateEnum_)

    const conditions = reactive({
      schemeId: null,
      ruleId: null,
    });
    //方案下拉框数据
    const schemeOptions = ref([])
    //规则下拉框数据
    const ruleOptions = ref([])

    //新增或者编辑模板弹窗是否打开
    const addOrEditTemplateDialogVisible = ref(false)

    //模板列表
    const templateList = ref([])

    //封装分页参数
    const pagingParameters = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0
    })


    //查询方案下拉框数据
    const getSchemesOptions = async () => {
      try {
        //从数据库查询方案名称下拉框需要用到的数据
        const getSchemesResponse = await getSchemesForSelectInput()
        //获取到了所有的方案列表
        const schemeList = getSchemesResponse.data
        //根据全部的方案列表数据封装方案名称下拉框需要用到的数据
        schemeList.forEach(scheme => {
          schemeOptions.value.push({ label: scheme.schemeName, value: scheme.schemeId })
        });
      } catch (error) {
        console.log(error)
      }
    }

    //监听方案下拉框数据的变化
    const handleSchemeOptionsChange = async () => {
      //先清空方案下拉框所有选项，再重新查询
      ruleOptions.value = [];
      try {
        //获取当前选中的方案id，并根据方案id查询该方案下所有的条码生成规则
        const getRulesBySchemeIdResponse = await getRulesBySchemeIdForSelect(conditions.schemeId);
        if(getRulesBySchemeIdResponse.code == 200) {
          //根据查询出来的数据封装条码生成规则下拉框需要的数据
          const rules = getRulesBySchemeIdResponse.data;
          rules.forEach((rule, index) => {
            ruleOptions.value.push({ label: rule.ruleName, value: rule.ruleId, asDefault: false });
          });
        }
      } catch (error) {
        console.log(error);
      }
    };

    const refreshTemplateList = async () => {
      const response = await getTemplatesPagination(conditions, pagingParameters)
      if (response.code == 200) {
        //设置列表数据
        templateList.value = response.data.list
        //设置分页总页数
        pagingParameters.total = response.data.total
        ElMessage({
          message: "刷新模板列表成功",
          type: "success",
          plain: true,
        });
      } else {
        ElMessage({
          message: "刷新模板列表失败",
          type: "error",
          plain: true,
        });
      }
    }

    //监听规则下拉框数据变化
    const handleRuleOptionsChange = (value) => {
      // ruleOptions.value.map(ruleOption => {
      //   ruleOption.value == value ? ruleOption.asDefault = true : ruleOption.asDefault = false
      // })
      //刷新条码列表
      //refreshBarCodesList()
    }

    onMounted(async () => {
      //查询所有的方案信息
      getSchemesOptions()
      //刷新模板列表
      refreshTemplateList()
    })

    //打开新增模板Dialog
    const handleOpenAddTemplateDialog = () => {
      addOrEditTemplateDialogVisible.value = true
    }

    //打开编辑模板Dialog
    const handleOpenEditTemplateDialog = (row) => {

    }

    //根据id删除模板
    const handleDeleteTemplateById = async(row) => {
      const response = await deleteTemplateById(row.id)
      if (response.status === 200) {
        ElMessage({
          message: "删除模板成功",
          type: "success",
          plain: true,
        });
        //刷新模板列表
        refreshTemplateList()
      } else {
        ElMessage({
          message: "删除模板失败",
          type: "error",
          plain: true,
        });
      }
    }
    
    //格式化显示模板启用状态
    const templateStatusFormatter = (row, column, cellValue) => {
      return cellValue === '0' ? '启用' : '停用';
    }

    //格式化显示模板类型
    const templateTypeFormatter = (row, column, cellValue) => {
      const TemplateEnumKeyList = Object.keys(TemplateEnum).filter(key => {
        return cellValue == TemplateEnum[key].CODE
      })
      return TemplateEnum[TemplateEnumKeyList[0]].DESC
    }

    //格式化日期
    const dateFormatter = (row, column, cellValue) => {
        return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
    }

    return {
      conditions,
      handleSchemeOptionsChange,
      handleRuleOptionsChange,
      schemeOptions,
      ruleOptions,
      addOrEditTemplateDialogVisible,
      handleOpenAddTemplateDialog,
      pagingParameters,
      handleOpenEditTemplateDialog,
      handleDeleteTemplateById,
      templateStatusFormatter,
      templateList,
      dateFormatter,
      templateTypeFormatter,
      TemplateEnum
    }
  }
}    
</script>
<style scoped>
.dialog {
  width: 100%;
  height: 700px;
}
</style>