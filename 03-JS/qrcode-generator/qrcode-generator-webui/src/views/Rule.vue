<template>
  
  <el-row style="padding-left: 20px;padding-right: 20px;padding-top: 20px;">
    <el-col :span="2">
      <el-button type="success" plain style="float: left" @click="handleOpenAddRuleDialog">新增规则</el-button>
    </el-col>
    <el-col :span="5">
      <el-form-item label="请输入规则名称：">
        <el-input v-model.lazy="conditions.ruleName" style="width: 240px" clearable placeholder="请输入规则名称" />
      </el-form-item>
    </el-col>
  </el-row>

  <!-- 规则列表开始-->
  <el-row style="padding-left: 20px;padding-right: 20px;">
    <el-table :data="ruleList" style="width: 100%;height: 650px;" :cell-style="{ textAlign: 'center' }"
      :header-cell-style="{ textAlign: 'center' }">
      <el-table-column type="index" />
      <el-table-column prop="ruleName" label="规则名称" />
      <el-table-column prop="ruleNumber" label="规则编号" />
      <el-table-column prop="scheme.schemeName" label="所属方案" />
      <el-table-column prop="ruleStatus" :formatter="ruleStatusFormatter" label="规则状态" />
      <el-table-column prop="ruleComments" label="规则备注" />
      <el-table-column prop="createTime" :formatter="dateFormatter" sortable label="创建时间" />
      <el-table-column prop="updateTime" :formatter="dateFormatter" sortable label="更新时间" />
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button link type="primary" @click="handleOpenEditRuleDialog(scope.row)">
            编辑
          </el-button>
          <el-button link type="primary" @click.once="handleDeleteRuleById(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <el-pagination v-model:current-page="pagingParameters.currentPage" v-model:page-size="pagingParameters.pageSize"
        :page-sizes="[5, 10, 20, 50]" layout="total, sizes, prev, pager, next, jumper" :total="pagingParameters.total"
        @size-change="handlePageSizeChange" @current-change="handleCurrentChange" />
    </div>
  </el-row>
  <!-- 规则列表结束-->

  <!-- 新增规则/修改规则弹出层开始 -->
  <el-dialog v-model="addOrEditRuleDialogVisible" :title="addOrEditRuleDialogTitle" width="80%" style="height: 700px"
    :before-close="handleCloseDialo">
    <el-form :model="rule" label-width="auto" :rules="rules" ref="ruleFormRef">
      <el-row>
        <el-col :span="11">
          <el-form-item label="规则名称" prop="ruleName">
            <el-input v-model="rule.ruleName" />
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="规则编号" prop="ruleNumber">
            <el-input v-model="rule.ruleNumber" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="11">
          <el-form-item label="方案名称" prop="schemeId">
            <el-select v-model="rule.schemeId" placeholder="请选择方案名称" @change="handleSchemeChange">
              <el-option v-for="(schemeOption, index) in schemeOptions" :key="index" :label="schemeOption.label"
                :value="schemeOption.value" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2"></el-col>
        <el-col :span="11">
          <el-form-item label="规则状态" prop="ruleStatus">
            <el-switch v-model="rule.ruleStatus" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="规则备注" prop="ruleComments">
            <el-input v-model="rule.ruleComments" type="textarea" placeholder="请输入规则备注" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="center" style="margin: 10px;">编辑规则字段信息</el-divider>
      <el-tabs v-model="currentEditableTabIndex" type="card" editable class="demo-tabs" @edit="handleTabsEdit">
        <el-tab-pane v-for="editableTab in editableTabs" :key="editableTab.name" :label="editableTab.title"
          :name="editableTab.name">
          <el-row>
            <el-col :span="4">
              <el-button type="primary" :disabled="addRuleFieldButtonIsEnable" @click="handleAddRuleField">新增规则字段</el-button>
            </el-col>
            <el-col :span="8">
              <el-form :model="editableTab" label-width="auto" :rules="editableTabRules" ref="editableTabFormRef">
                <el-form-item :label="editableTab.barCodeNamePlaceholder" prop="barCodeName">
                  <el-input v-model="editableTab.barCodeName" size="small" />
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-table size="small" :data="editableTab.ruleFieldListForEachTab" :style="editableTabStyle"
                :header-row-style="{ 'height': '10px', 'line-height': '10px' }" :cell-style="{ textAlign: 'center' }"
                :header-cell-style="{ textAlign: 'center' }">
                <el-table-column type="index" />
                <el-table-column label="字段类型">
                  <template #default="scope">
                    <el-select v-model="scope.row.ruleFieldType" placeholder="请选择字段类型" size="small"
                      @change="handleRuleFieldTypeChange(scope.$index)">
                      <el-option v-for="(ruleFieldTypeSelectOption, index) in ruleFieldTypeSelectOptions"
                        :key="ruleFieldTypeSelectOption.value" :label="ruleFieldTypeSelectOption.label"
                        :value="ruleFieldTypeSelectOption.value" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="固定常量">
                  <template #default="scope">
                    <el-input v-model="scope.row.fixedConstant" size="small"
                      :disabled="scope.row.disabledState.fixedConstant" />
                  </template>
                </el-table-column>
                <!-- <el-table-column label="自定算法">
                  <template #default="scope">
                    <el-select v-model="scope.row.dropDownSelectOption" placeholder="请选择" size="small"
                      :disabled="scope.row.disabledState.dropDownSelectOption">
                      <el-option label="随机数算法" value="randomNumber" />
                      <el-option label="自定算法二" value="00000002" />
                    </el-select>
                  </template>
                </el-table-column> -->
                <el-table-column label="级联选择">
                  <template #default="scope">
                    <el-cascader size="small" style="width:100%;" :options="cascaderOptions"
                      v-model="scope.row.cascaderSelectedOptions" filterable :show-all-levels="false"
                      @change="handleCascaderChange(scope.$index)" placeholder="选择或搜索" clearable
                      :disabled="scope.row.disabledState.cascaderSelectedOptions" auto-width ref="cascaderRef" />
                  </template>
                </el-table-column>
                <el-table-column label="日期类型">
                  <template #default="scope">
                    <el-select v-model="scope.row.dateFormatSelectOption" placeholder="请选择日期格式" size="small"
                      :disabled="scope.row.disabledState.dateFormatSelectOption">
                      <el-option label="YYMM" value="YYMM" />
                      <!-- YY2023中的23， WS Week Sequence 周序列号 -->
                      <el-option label="YYWS" value="YYWS" />
                      <el-option label="YYYY-MM-DD" value="YYYY-MM-DD" />
                      <el-option label="YYYY-MM-DD HH:MM:SS" value="YYYY-MM-DD HH:MM:SS" />
                      <!-- <el-option
                        v-for="(dateFormatSelectOption,index) in dateFormatSelectOptions"
                        :key="index"
                        :label="dateFormatSelectOption.label"
                        :value="dateFormatSelectOption.value"
                        :disabled="dateFormatSelectOption.disabled"
                      /> -->
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column label="自增序列">
                  <el-table-column label="序列进制">
                    <template #default="scope">
                      <el-radio-group v-model="scope.row.autoIncrementSequence.binary" size="small" is-button
                        :disabled="scope.row.disabledState.autoIncrementSequence.binary">
                        <el-radio-button label="10" value="10" />
                        <el-radio-button label="16" value="16" />
                      </el-radio-group>
                    </template>
                  </el-table-column>
                  <el-table-column label="起始序号">
                    <template #default="scope">
                      <el-input-number size="small" :min="1" controls-position="right" style="width:100%"
                        v-model="scope.row.autoIncrementSequence.startSequence"
                        :disabled="scope.row.disabledState.autoIncrementSequence.startSequence" />
                    </template>
                  </el-table-column>
                  <el-table-column label="增长步长">
                    <template #default="scope">
                      <el-input-number size="small" v-model.number="scope.row.autoIncrementSequence.step" :min="0"
                        controls-position="right" style="width:100%"
                        :disabled="scope.row.disabledState.autoIncrementSequence.step" />
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="补齐策略">
                  <el-table-column label="启用补齐">
                    <template #default="scope">
                      <el-switch v-model="scope.row.fillStrategy.enable" size="small"
                        :disabled="scope.row.disabledState.fillStrategy.enable" />
                    </template>
                  </el-table-column>
                  <el-table-column label="补齐方向">
                    <template #default="scope">
                      <el-radio-group v-model="scope.row.fillStrategy.direction" size="small" is-button
                        :disabled="scope.row.disabledState.fillStrategy.direction">
                        <el-radio-button label="左" value="l" />
                        <el-radio-button label="右" value="r" />
                      </el-radio-group>
                    </template>
                  </el-table-column>
                  <el-table-column label="补齐长度">
                    <template #default="scope">
                      <el-input-number size="small" v-model="scope.row.fillStrategy.length" :min="0"
                        controls-position="right" style="width:100%"
                        :disabled="scope.row.disabledState.fillStrategy.length" />
                    </template>
                  </el-table-column>
                  <el-table-column label="补齐字符">
                    <template #default="scope">
                      <el-input v-model="scope.row.fillStrategy.character" size="small"
                        :disabled="scope.row.disabledState.fillStrategy.character" />
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column label="重置策略">
                  <template #default="scope">
                    <el-select v-model="scope.row.resetStrategySelectOption" placeholder="请选择自增序列重置策略" size="small"
                      :disabled="scope.row.disabledState.resetStrategySelectOption">
                      <el-option label="每周重置" value="EW" />
                    </el-select>
                  </template>
                </el-table-column>
                <!--
                <el-table-column label="移动位置">
                  <template v-slot="scope">
                    <el-button link type="primary" @click="handleOpenEditProductDrawer(scope.row)">
                      上
                    </el-button>
                    <el-button link type="primary" @click="handleOpenEditProductDrawer(scope.row)">
                      下
                    </el-button>
                  </template>
                </el-table-column>
                -->
                <el-table-column label="操作">
                  <template v-slot="scope">
                    <el-button link type="primary" @click="handleDeleteRuleField(scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" v-if="currentUpdateType == 'ADD'" @click="handleAddRule">保存</el-button>
                <el-button type="primary" v-if="currentUpdateType == 'UPDATE'" @click="handleUpdateRule">更新</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-dialog>
  <!-- 新增规则/修改规则弹出层结束 -->
</template>

<script>
import { watch, reactive, ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  CaretBottom,
  CaretTop,
} from "@element-plus/icons-vue";

import { getDictsForTreeBySchemeIdAndLevelForCascader } from '@/api/dict.js'
import { addRule, getRulesPagination, updateRule, getRulesByRuleNamePagination, deleteRuleById } from '@/api/rule.js'
import { getSchemesForSelectInput } from '@/api/scheme.js'

import { RuleFieldTypeEnum_ } from '@/commons/enum.js'
import { deepClone } from '@/commons/utils.js'
//格式化日期插件
import dayjs from 'dayjs';

export default {
  name: "Rule",
  components: {
    CaretBottom,
    CaretTop,
  },

  setup() {
    //导入枚举并重命名枚举
    const RuleFieldTypeEnum = RuleFieldTypeEnum_

    //新增/更新规则Dialog是否开启
    const addOrEditRuleDialogVisible = ref(false);
    //新增/更新规则Dialog标题
    const addOrEditRuleDialogTitle = ref('新增规则');
    const currentUpdateType = ref('UPDATE')
    //新增规则按钮是否可以
    const addRuleFieldButtonIsEnable = ref(true)

    const editableTabStyle = reactive({
      width: '100%',
      'pointer-events': 'none',
      'height': "300px",
      overflow: scroll,
    })

    //页面上用的所有模板
    const TEMPLATE = {
      //规则实体模板
      RULE_TEMPLATE: {
        ruleName: "",
        ruleNumber: "",
        schemeId: "",
        ruleStatus: true,
        ruleComments: "",
        //用于封装所有的规则字段信息
        ruleFieldList: []
      },
      //字段类型对象模板，在这里定义了字段类型对象模板后，其他的地方可以直接引用这个模板(主要是每次新增的时候)
      RULE_FIELD_TEMPLATE: {
        //字段类型
        ruleFieldType: '',
        //固定常量
        fixedConstant: '',
        //下拉选择
        dropDownSelectOption: '',
        //级联选择
        cascaderSelectedOptions: '',
        //日期类型
        dateFormatSelectOption: '',
        //补齐策略
        fillStrategy: {
          //启用补齐
          enable: null,
          //补齐方向
          direction: null,
          //补齐长度
          length: null,
          //补齐字符
          character: null
        },
        //自增序列
        autoIncrementSequence: {
          //进制
          binary: null,
          //步长
          step: null,
          //起始序列
          startSequence: null,
        },
        //重置策略
        resetStrategySelectOption:null,
        //是否可用
        disabledState: {
          fixedConstant: true,
          dropDownSelectOption: true,
          cascaderSelectedOptions: true,
          dateFormatSelectOption: true,
          autoIncrementSequence: {
            binary: true,
            step: true,
            startSequence: true
          },
          resetStrategySelectOption:true,
          fillStrategy: {
            enable: true,
            direction: true,
            length: true,
            character: true
          }
        }
      }
    }


    //保存规则所有相关信息: 规则基本信息 + 规则字段信息
    const rule = reactive(deepClone(TEMPLATE.RULE_TEMPLATE));

    //规则列表数据
    const ruleList = ref([])

    //封装分页参数
    const pagingParameters = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0
    })

    let tabIndex = ref(1)
    //控制第一次打开tab时，从第几个tab页中开始显示内容，如果不设置，打开后第一个tab标签页中内容为空
    const currentEditableTabIndex = ref(1)
    const editableTabs = ref([
      {
        title: '条码1生成规则',
        name: 1,
        //条码名称表达式
        barCodeNamePlaceholder: `请输入条码1名称`,
        //条码名称
        barCodeName: '',
        //存储每一个tab页中所有的ruleField
        ruleFieldListForEachTab: [deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)]
      }
    ])

    //级联选择器可选项
    const cascaderOptions = ref([])
    //字段类型下拉框选择器
    const ruleFieldTypeSelectOptions = ref([])
    //日期类型下拉框选择器数据
    const dateFormatSelectOptions = ref([])

    //方案选择下拉框的Option
    const schemeOptions = ref([])

    //级联选择器ref
    const cascaderRef = ref(null)
    //表单ref
    const ruleFormRef = ref(null)

    const conditions = reactive({
      ruleName: ''
    })

    //定义表单校验规则
    const rules = reactive({
      ruleName: [
        { required: true, message: '请输入规则名称', trigger: 'blur' },
        { min: 1, max: 30, message: '规则名称的长度应该介于1到30之间', trigger: 'blur' },
      ],
      // ruleNumber: [
      //   { required: true, message: '请输入规则编号', trigger: 'blur' },
      //   { min: 1, max: 10, message: '规则编号的长度应该介于1到10之间', trigger: 'blur' },
      // ],
      schemeId: [
        { required: true, message: '请选择方案名称', trigger: 'blur' },
      ],
      ruleStatus: [
        { required: true },
      ],
      //TODO
      // barCodeName: [
      //   { required: true, message: `请输入条码名称`, trigger: 'blur' },
      //   { min: 1, max: 30, message: '条码名称的长度应该介于1到30之间', trigger: 'blur' },
      // ]
    })


    /**
     * 刷新方案列表
     */
    const refreshRuleList = async () => {
      const response = await getRulesPagination(pagingParameters)
      if (response.code== 200) {
        //设置列表数据
        ruleList.value = response.data.list
        //设置分页总页数
        pagingParameters.total = response.data.total
      } else {
        ElMessage({
          message: "查询规则列表失败",
          type: "error",
          plain: true,
        });
      }
    }

    const refreshSchemeOptions = async () => {
      //每次刷新数据前先清空原来的方案名称用到的options
      schemeOptions.value = []

      //从数据库查询方案名称下拉框需要用到的数据
      const response = await getSchemesForSelectInput()
      if (response.data.code == '200') {
        //获取到了所有的方案列表
        const schemeList = response.data.data
        //根据全部的方案列表数据封装方案名称下拉框需要用到的数据
        schemeList.forEach(scheme => {
          schemeOptions.value.push({ label: scheme.schemeName, value: scheme.schemeId })
        });
      } else {
        ElMessage({
          message: '查询方案列表失败',
          type: "error",
          plain: true,
        });
      }
    }

    onMounted(async () => {
      //页面打开时刷新规则列表
      refreshRuleList()
      //从枚举中获取数据,封装字段类型下拉框
      Object.keys(RuleFieldTypeEnum).forEach(key => {
        if (RuleFieldTypeEnum[key]['NAME'] != '条码名称' && RuleFieldTypeEnum[key]['NAME'] != '下拉选择') {
          ruleFieldTypeSelectOptions.value.push({ label: RuleFieldTypeEnum[key]['NAME'], value: RuleFieldTypeEnum[key]['CODE'] })
        }
      })
    })

    /**
     * targetName 当前选中标签的name值
      */
    const handleTabsEdit = (targetName, action) => {
      if (action === 'add') {
        const newTabIndex = editableTabs.value.length + 1
        const editableTab = {
          title: `条码${newTabIndex}生成规则`,
          //条码名称表达式
          barCodeNamePlaceholder: `请输入条码${newTabIndex}名称`,
          //条码名称
          barCodeName: '',
          name: newTabIndex,
          ruleFieldListForEachTab: [deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)]
        }
        editableTabs.value.push(editableTab)
        currentEditableTabIndex.value = newTabIndex
      } else if (action === 'remove') {
        //删除前先删除editableTabs中的数据
        editableTabs.value = editableTabs.value.filter((editableTab) => editableTab.name !== targetName)
        //再根据现有数据进行重新排序
        editableTabs.value.forEach((editableTab, index) => {
          editableTab.title = `条码${index + 1}生成规则`
          //条码名称表达式
          editableTab.barCodeNamePlaceholder = `请输入条码${index + 1}名称`,
            //条码名称
            editableTab.barCodeName = '',
            editableTab.name = index + 1
        })
        //这个值要在targetName和当前标签页总数量中取最小值，不然当只有一个标签页的时候，点击了删除按钮后，tab页中不会展示任何内容
        currentEditableTabIndex.value = Math.min(targetName, editableTabs.value.length)
      }
    }

    //新增规则字段
    const handleAddRuleField = () => {
      editableTabs.value[currentEditableTabIndex.value - 1].ruleFieldListForEachTab.push(deepClone(TEMPLATE.RULE_FIELD_TEMPLATE));
    };

    /**
     * 校验条码名称是否符合规范
     * @param {*} rule
     * @param {*} value
     * @param {*} callback
     */
    const validateEdiTableBarCodeName = (rule, value, callback) => {
      const pattern = /[A-Za-z0-9]+/
      if (value.length < 0 || value.length > 30) {
        callback(new Error('条码名称的长度应该介于1到30之间'));
      }
      if (!pattern.test(value)) {
        callback(new Error('条码名称只能由英文和数组组成'));
      } else {
        callback();
      }
    };

    const editableTabRules = reactive({
      barCodeName: [
        { required: true, message: '请输入条码名称', trigger: 'blur' },
        { validator: validateEdiTableBarCodeName, trigger: 'blur' },
      ],
    })

    //表单引用
    const editableTabFormRef = ref(null)

    //校验表单
    const validateForm = async () => {
      //校验所有的Tab页中的条码名称有没有输入
      const validateResultListAsync = []
      //对editableTabs中barCodeName进行表单校验
      editableTabs.value.forEach((editableTab, index) => {
        const validateResult = editableTabFormRef.value[index].validate((valid) => {
          if (!valid) {
            ElMessage({
              message: `请检查[条码${index + 1}生成规则]中条码名称是否规范`,
              type: "error",
              plain: true,
            });
          }
          return valid
        })
        validateResultListAsync.push(validateResult)
      })
      //最终表单校验结果
      let validate = true
      for (let i = 0; i < validateResultListAsync.length; i++) {
        const validateResult = await validateResultListAsync[i]
        validate = validate && validateResult
      }
      // ===> 表单校验不通过直接返回，结束当前操作
      if (!validate) {
        return validate
      }

      //存放规则字段是否是否选择了具体类型的错误
      const ruleFieldIsSelectedErrorMessages = [];
      //存放规则字段选择了具体类型后是否设置了值
      const ruleFieldSelectedIsSettingValueErrorMessages = [];

      // ===> 表单校验通过后继续执行后续操作
      //清空rule.ruleFieldList的值
      rule.ruleFieldList = []

      //拿到了所有tab页中所有类型为级联选择的且选择了值的ruleField，存放在栈中
      const cascaderSelectLabels = []
      cascaderSelectLabels.push(cascaderRef.value.forEach(cascaderRef => {
        if(cascaderRef.getCheckedNodes().length != 0) {
          cascaderSelectLabels.push(cascaderRef.getCheckedNodes()[0].label)
        }
      }))
      //先遍历所有的标签页
      editableTabs.value.forEach((editableTab, editableTabIndex) => {
        //再遍历每一个标签页中所有的ruleField
        editableTab.ruleFieldListForEachTab.forEach((element, ruleFieldIndex) => {
          let ruleField = {}
          //校验输入值的格式为数字组成
          const numberPattern = /[1-9][0-9]*/
          //校验输入值的是否由数字和英文字母组成
          const numberAndEnglishCharaterPattern = /[A-Za-z0-9]/
          switch (element.ruleFieldType) {
            //如果是固定常量
            case RuleFieldTypeEnum.FIXED_CONSTANT.CODE:
              //判断固定常量的值是否为空
              if (element.fixedConstant.trim() == '') {
                const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[${RuleFieldTypeEnum.FIXED_CONSTANT.NAME}]是否设置了具体的值`
                ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
              }
              //当启用了补齐策略时判断固定常量的补齐策略的值是否设置正确
              if (element.fillStrategy.enable) {
                if (!numberPattern.test(element.fillStrategy.length)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐长度]是否设置了正确格式的值，只支持支数字`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (element.fillStrategy.character.length != 1) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (!numberAndEnglishCharaterPattern.test(element.fillStrategy.character)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
              }
              ruleField = {
                ruleFieldCategoryCode: RuleFieldTypeEnum.FIXED_CONSTANT.CODE,
                ruleFieldCategoryName: RuleFieldTypeEnum.FIXED_CONSTANT.NAME,
                ruleFieldName: RuleFieldTypeEnum.FIXED_CONSTANT.NAME,
                ruleFieldValue: element.fixedConstant,
                //补齐策略所有子选项信息
                ruleFieldFillStrategy: JSON.stringify(element.fillStrategy),
                //重置策略
                ruleFieldResetStrategy: element.resetStrategySelectOption,
                ruleFieldAssociationTabIndex: editableTabIndex
              }
              break;
            //如果是下拉选择
            case RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE:
              //判断下拉选择是否进行了选择
              if (element.dropDownSelectOption.trim() == '') {
                const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[${RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.NAME}]是否选择了具体的值`
                ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
              }
              //当启用了补齐策略时判断下拉选择的补齐策略的值是否设置正确
              if (element.fillStrategy.enable) {
                if (!numberPattern.test(element.fillStrategy.length)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐长度]是否设置了正确格式的值，只支持支数字`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (element.fillStrategy.character.length != 1) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (!numberAndEnglishCharaterPattern.test(element.fillStrategy.character)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
              }
              ruleField = {
                ruleFieldCategoryCode: RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE,
                ruleFieldCategoryName: RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.NAME,
                ruleFieldName: element.dropDownSelectOption,
                ruleFieldValue: element.dropDownSelectOption,
                //补齐策略所有子选项信息
                ruleFieldFillStrategy: JSON.stringify(element.fillStrategy),
                //重置策略
                ruleFieldResetStrategy: element.resetStrategySelectOption,
                ruleFieldAssociationTabIndex: editableTabIndex
              }
              break;
            //如果是级联选择
            case RuleFieldTypeEnum.CASCADER_SELECT_INPUT.CODE:
              //判断级联选择是否进行了选择
              if (element.cascaderSelectedOptions.length == 0) {
                const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[${RuleFieldTypeEnum.CASCADER_SELECT_INPUT.NAME}]是否选择了具体的值`
                ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                break;
              }
              //当启用了补齐策略时判断级联选择的补齐策略的值是否设置正确
              if (element.fillStrategy.enable) {
                if (!numberPattern.test(element.fillStrategy.length)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐长度]是否设置了正确格式的值，只支持支数字`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (element.fillStrategy.character.length != 1) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (!numberAndEnglishCharaterPattern.test(element.fillStrategy.character)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                break;
              }
              const ruleFieldValue = {
                cascaderOptionValue: element.cascaderSelectedOptions,
                cascaderOptionLabel: cascaderSelectLabels.shift()
              }
              ruleField = {
                ruleFieldCategoryCode: RuleFieldTypeEnum.CASCADER_SELECT_INPUT.CODE,
                ruleFieldCategoryName: RuleFieldTypeEnum.CASCADER_SELECT_INPUT.NAME,
                ruleFieldName: ruleFieldValue.cascaderOptionLabel,
                ruleFieldValue: JSON.stringify(ruleFieldValue),
                //补齐策略所有子选项信息
                ruleFieldFillStrategy: JSON.stringify(element.fillStrategy),
                //重置策略
                ruleFieldResetStrategy: element.resetStrategySelectOption,
                ruleFieldAssociationTabIndex: editableTabIndex
              }
              break;
            //如果是日期类型
            case RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.CODE:
              //判断日期类型是否进行了选择
              if (element.dateFormatSelectOption.trim() == '') {
                const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[${RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.NAME}]是否选择了具体的值`
                ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
              }
              //当启用了补齐策略时判断日期类型的补齐策略的值是否设置正确
              if (element.fillStrategy.enable) {
                if (!numberPattern.test(element.fillStrategy.length)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐长度]是否设置了正确格式的值，只支持支数字`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (element.fillStrategy.character.length != 1) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (!numberAndEnglishCharaterPattern.test(element.fillStrategy.character)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
              }
              ruleField = {
                ruleFieldCategoryCode: RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.CODE,
                ruleFieldCategoryName: RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.NAME,
                ruleFieldName: '日期类型',
                ruleFieldValue: element.dateFormatSelectOption,
                //补齐策略所有子选项信息
                ruleFieldFillStrategy: JSON.stringify(element.fillStrategy),
                //重置策略
                ruleFieldResetStrategy: element.resetStrategySelectOption,
                ruleFieldAssociationTabIndex: editableTabIndex
              }
              break;
            //如果是自增序列
            case RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.CODE:
              //判断自增序列是否设置值且格式是否正确的值
              if (!numberPattern.test(element.autoIncrementSequence.startSequence) || !numberPattern.test(element.autoIncrementSequence.step)) {
                const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[${RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.NAME}-起始序号/增长步长]是否设置了正确格式的值，只支持数字`
                ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
              }

              //当启用了补齐策略时判断自增序列的补齐策略的值是否设置正确
              if (element.fillStrategy.enable) {
                if (!numberPattern.test(element.fillStrategy.length)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐长度]是否设置了正确格式的值，只支持支数字`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (element.fillStrategy.character.length != 1) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
                if (!numberAndEnglishCharaterPattern.test(element.fillStrategy.character)) {
                  const ruleFieldSelectedIsSettingValueErrorMessage = `请检查[条码${editableTabIndex + 1}生成规则]中序号为[${ruleFieldIndex + 1}]的规则字段[补齐策略-补齐字符]是否设置了正确格式的值，只支持支英文和数字，且长度为1`
                  ruleFieldSelectedIsSettingValueErrorMessages.push(ruleFieldSelectedIsSettingValueErrorMessage)
                }
              }
              ruleField = {
                ruleFieldCategoryCode: RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.CODE,
                ruleFieldCategoryName: RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.NAME,
                ruleFieldName: '进制',
                //autoIncrementSequence所有子选项的信息
                ruleFieldValue: JSON.stringify(element.autoIncrementSequence),
                //补齐策略所有子选项信息
                ruleFieldFillStrategy: JSON.stringify(element.fillStrategy),
                //重置策略
                ruleFieldResetStrategy: element.resetStrategySelectOption,
                ruleFieldAssociationTabIndex: editableTabIndex
              }
              break;
            default:
              //当用户只新增了规则字段，但是没有给这个规则字段设置具体的信息，程序就会走到这里
              ruleFieldIsSelectedErrorMessages.push({ editableTabIndex: editableTabIndex, fileTypeIndex: ruleFieldIndex })
              break;
          }
          //设置逻辑删除状态
          rule.ruleFieldList.push(ruleField)
        })

        //获取当前条码的名称,并封装到一个ruleField中
        const ruleFieldStoreTableName = {
          ruleFieldCategoryCode: RuleFieldTypeEnum.BAR_CODE_NAME.CODE,
          ruleFieldCategoryName: '-----',
          ruleFieldName: '规则名称',
          ruleFieldValue: editableTab.barCodeName,
          //补齐策略所有子选项信息
          ruleFieldFillStrategy: '-----',
          ruleFieldAssociationTabIndex: editableTabIndex
        }
        //把存储当前tab编辑的规则名称的ruleField放入ruleFieldList中
        rule.ruleFieldList.push(ruleFieldStoreTableName)
      })

      //校验所有tab页中的规则字段是否都进行选择了，有时会出现新增了规则字段，但是这个字段什么信息都没有
      if (ruleFieldIsSelectedErrorMessages.length > 0) {
        for (let i = 0; i < ruleFieldIsSelectedErrorMessages.length; i++) {
          ElMessage({
            message: `请检查[条码${ruleFieldIsSelectedErrorMessages[i].editableTabIndex + 1}生成规则]中序号为[${ruleFieldIsSelectedErrorMessages[i].fileTypeIndex + 1}]的字段类型选项是否选择了具体的类型`,
            type: "error",
            plain: true,
          });
          return false
        }
        return false
      }

      //校验所有tab页中的规则字段选择后是否设置具体值了，有时会出现选择了规则字段类型，但是没有设置的值
      if (ruleFieldSelectedIsSettingValueErrorMessages.length > 0) {
        for (let i = 0; i < ruleFieldSelectedIsSettingValueErrorMessages.length; i++) {
          ElMessage({
            message: `${ruleFieldSelectedIsSettingValueErrorMessages[i]}`,
            type: "error",
            plain: true,
          });
          return false
        }
        return false
      }
      return true
    }

    //保存规则
    const handleAddRule = async () => {
      const validateResult = await validateForm()
      //如果表单校验不通过，直接返回，阻止程序继续向下执行
      if (!validateResult) {
        return
      }
      try {
        //表单校验不通过不允许提交
        ruleFormRef.value.validate(async (valid) => {
          //TODO
          if (valid) {
            //保存规则
            const response = await addRule(rule)
            if (response.data.code === '200') {
              //提示保存成功
              ElMessage({
                message: "保存规则成功",
                type: "success",
                plain: true,
              });
              //关闭Dialog
              addOrEditRuleDialogVisible.value = false
              //清除方案实体中的缓存数据
              const rule_ = deepClone(TEMPLATE.RULE_TEMPLATE)
              Object.keys(rule_).forEach(key => {
                rule[key] = rule_[key]
              });
              //刷新方案列表
              refreshRuleList()
            } else {
              ElMessage({
                message: "保存规则失败",
                type: "error",
                plain: true,
              });
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    };


    //更新规则
    const handleUpdateRule = async () => {
      const validateResult = await validateForm()
      //如果表单校验不通过，直接返回，阻止程序继续向下执行
      if (!validateResult) {
        return
      }
      try {
        //表单校验不通过不允许提交
        ruleFormRef.value.validate(async (valid) => {
          //TODO
          if (valid) {
            //保存规则
            const response = await updateRule(rule)
            if (response.data.code === '200') {
              //提示保存成功
              ElMessage({
                message: "更新规则成功",
                type: "success",
                plain: true,
              });
              //关闭Dialog
              addOrEditRuleDialogVisible.value = false
              //清除方案实体中的缓存数据
              const rule_ = deepClone(TEMPLATE.RULE_TEMPLATE)
              Object.keys(rule_).forEach(key => {
                rule[key] = rule_[key]
              });
              //刷新方案列表
              refreshRuleList()
            } else {
              ElMessage({
                message: "更新规则失败",
                type: "error",
                plain: true,
              });
            }
          }
        })
      } catch (error) {
        console.log(error)
      }
    };


    //监听所有editableTabs中每一个editableTab中的 ruleFieldListForEachTab 数组中的每一个元素发生的变化
    watch(() => editableTabs.value[currentEditableTabIndex.value - 1].ruleFieldListForEachTab, (newVal, oldVal) => {
      newVal.forEach(ruleField => {
        //如果启用了补齐策略，则 补齐方向、补齐长度、补齐字符 的状态变为可编辑状态
        const fillStrategyIsEnable = ruleField.fillStrategy.enable
        //使 补齐方向 的可编辑状态和补齐启用状态保持统一
        ruleField.disabledState.fillStrategy.direction = !fillStrategyIsEnable
        //使 补齐长度 的可编辑状态和补齐启用状态保持统一
        ruleField.disabledState.fillStrategy.length = !fillStrategyIsEnable
        //使 补齐字符 的可编辑状态和补齐启用状态保持统一
        ruleField.disabledState.fillStrategy.character = !fillStrategyIsEnable
        //如果启用了补齐策略，则给 补齐方向、补齐长度、补齐字符设置初始值
        if (fillStrategyIsEnable) {
          //说明用户修改了 补齐方向、补齐长度、补齐字符 三个子选项中的一个值
          if (ruleField.fillStrategy.direction == null) {
            //设置 补齐方向 初始值
            ruleField.fillStrategy.direction = 'l'
          }
          if (ruleField.fillStrategy.length == null) {
            //设置 补齐长度 初始值
            ruleField.fillStrategy.length = 10
          }
          if (ruleField.fillStrategy.character == null) {
            //设置 补齐字符 初始值
            ruleField.fillStrategy.character = '0'
          }
        } else {
          //设置 补齐方向 初始值
          ruleField.fillStrategy.direction = null
          //设置 补齐长度 初始值
          ruleField.fillStrategy.length = null
          //设置 补齐字符 初始值
          ruleField.fillStrategy.character = null
        }
      })
    }, { deep: true });

    //级联选择器中选中的数据发生变化时触发
    const handleCascaderChange = ($index) => {
      // let index = 0;
      // for (let i = 0; i < currentEditableTabIndex.value - 1; i++) {
      //   index += editableTabs.value[i].ruleFieldListForEachTab.length
      // }
      // index += $index
      // editableTabs.value[currentEditableTabIndex.value - 1].ruleFieldListForEachTab[$index].cascaderSelectedLabel = cascaderRef.value[index].getCheckedNodes()[0].label
    };

    //关闭弹窗
    const handleCloseDialo = () => {
      //关闭弹窗时情况ruleFieldListForEachTab中数据
      //特别注意:要使用vue3能够监控到数据变化的方法去清空数组，不能直接使用 ruleFieldListForEachTab = []
      //清空数组所有元素
      //ruleFieldListForEachTab.value = ruleFieldListForEachTab.value.slice(0,0)
      //给数组中放置一个元素
      const ruleField = {}
      ruleField.disabledState = {}
      //ruleFieldListForEachTab.value.push(ruleField)

      //关闭弹窗
      addOrEditRuleDialogVisible.value = false;
    }

    //刷新级联选择用到的options
    const refreshCascaderOptions = async () => {
      //从数据库中查询级联选择使用到的选项数据
      //level等于2，代表查询树结构的最上面两层数据
      const getDictsForTreeBySchemeIdAndLevelForCascaderResponse = await getDictsForTreeBySchemeIdAndLevelForCascader({ schemeId: rule.schemeId, level: 2 })
      if (getDictsForTreeBySchemeIdAndLevelForCascaderResponse.data.code == '200') {
        const cascaderOptionsJSON = getDictsForTreeBySchemeIdAndLevelForCascaderResponse.data.data
        if(cascaderOptionsJSON.children != undefined) {
          cascaderOptions.value = cascaderOptionsJSON.children
        }
      } else {
        ElMessage({
          message: '查询下拉选择选项列表失败',
          type: "error",
          plain: true,
        });
      }
    }

    /**
     * 规则字段类型下拉框改变
     */
    const handleRuleFieldTypeChange = (index) => {
      //找到具体操作的那个RuleField，并修改其数据
      const ruleField = editableTabs.value[currentEditableTabIndex.value - 1].ruleFieldListForEachTab[index]
      let currentRuleField = null
      switch (ruleField.ruleFieldType) {
        //固定常量
        case RuleFieldTypeEnum.FIXED_CONSTANT.CODE:
          //先通过克隆创建一个ruleField对象
          currentRuleField = deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)
          //把ruleField.ruleFieldType赋值给currentRuleField.ruleFieldType
          currentRuleField.ruleFieldType = ruleField.ruleFieldType
          //解除fixedConstant的禁用状态
          currentRuleField.disabledState.fixedConstant = false
          //禁止使用补齐策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.fillStrategy.enable = true
          //禁止使用重置策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.resetStrategySelectOption = true
          //保持补齐策略赋值前后一致
          //因为ruleField是一个Proxy对象，不能直接赋值，可以通过下面方式进行复制
          Object.keys(ruleField).forEach(key => {
            ruleField[key] = currentRuleField[key]
          })
          break;
        //下拉选择
        case RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE:
          //先通过克隆创建一个ruleField对象
          currentRuleField = deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)
          //把ruleField.ruleFieldType赋值给currentRuleField.ruleFieldType
          currentRuleField.ruleFieldType = ruleField.ruleFieldType
          //解除dropDownSelectOption的禁用状态
          currentRuleField.disabledState.dropDownSelectOption = false
          //禁止使用补齐策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.fillStrategy.enable = true
          //禁止使用重置策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.resetStrategySelectOption = true
          //保持补齐策略赋值前后一致
          //因为ruleField是一个Proxy对象，不能直接赋值，可以通过下面方式进行复制
          Object.keys(ruleField).forEach(key => {
            ruleField[key] = currentRuleField[key]
          })
          break;
        //级联选择
        case RuleFieldTypeEnum.CASCADER_SELECT_INPUT.CODE:
          //先通过克隆创建一个ruleField对象
          currentRuleField = deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)
          //把ruleField.ruleFieldType赋值给currentRuleField.ruleFieldType
          currentRuleField.ruleFieldType = ruleField.ruleFieldType
          //解除cascaderSelectedOptions的禁用状态
          currentRuleField.disabledState.cascaderSelectedOptions = false
          //禁止使用补齐策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.fillStrategy.enable = true
          //禁止使用重置策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.resetStrategySelectOption = true
          //因为ruleField是一个Proxy对象，不能直接赋值，可以通过下面方式进行复制
          Object.keys(ruleField).forEach(key => {
            ruleField[key] = currentRuleField[key]
          })
          break;
        //日期类型
        case RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.CODE: {
          //先通过克隆创建一个ruleField对象
          currentRuleField = deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)
          //把ruleField.ruleFieldType赋值给currentRuleField.ruleFieldType
          currentRuleField.ruleFieldType = ruleField.ruleFieldType
          //解除dateSelectedOption的禁用状态
          currentRuleField.disabledState.dateFormatSelectOption = false
          //禁止使用补齐策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.fillStrategy.enable = true
          //禁止使用重置策略[目前设置为只有自增序列才可以使用补齐策略和重置策略这两个选项]
          currentRuleField.disabledState.resetStrategySelectOption = true
          //因为ruleField是一个Proxy对象，不能直接赋值，可以通过下面方式进行复制
          Object.keys(ruleField).forEach(key => {
            ruleField[key] = currentRuleField[key]
          })
          break;
        }
        //自增序列
        case RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.CODE:
          //先通过克隆创建一个ruleField对象
          currentRuleField = deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)
          //把ruleField.ruleFieldType赋值给currentRuleField.ruleFieldType
          currentRuleField.ruleFieldType = ruleField.ruleFieldType
          //解除autoIncrementSequence中所有子选项的禁用状态
          //序列进制
          currentRuleField.disabledState.autoIncrementSequence.binary = false
          //增长步长
          currentRuleField.disabledState.autoIncrementSequence.step = false
          //起始序号
          currentRuleField.disabledState.autoIncrementSequence.startSequence = false
          //解除启用补齐的禁用状态、
          currentRuleField.disabledState.fillStrategy.enable = false
          //解除充值策略的禁用状态
          currentRuleField.disabledState.resetStrategySelectOption = false
          //给autoIncrementSequence中所有子选项赋值
          //序列进制
          currentRuleField.autoIncrementSequence.binary = '10'
          //增长步长
          currentRuleField.autoIncrementSequence.step = 1
          //起始序号
          currentRuleField.autoIncrementSequence.startSequence = 1
          //因为ruleField是一个Proxy对象，不能直接赋值，可以通过下面方式进行复制
          Object.keys(ruleField).forEach(key => {
            //如果字段类型是自增序列，则进行特殊处理，因为自增序列是一个对象
            if (key === 'autoIncrementSequence') {
              //处理子选项是否可以被选中
              ruleField.disabledState.autoIncrementSequence = currentRuleField.disabledState.autoIncrementSequence
              //处理子选项的初始值
              ruleField.autoIncrementSequence = currentRuleField.autoIncrementSequence
            } else {
              ruleField[key] = currentRuleField[key]
            }
          })
          break;
        default:
          break;
      }
    }

    /**
     * 删除规则字段
     */
    const handleDeleteRuleField = (index) => {
      editableTabs.value[currentEditableTabIndex.value - 1].ruleFieldListForEachTab.splice(index, 1)
    }

    //调整pageSize大小
    const handlePageSizeChange = async () => {
      refreshRuleList()
    }
    //调整currentChange大小
    const handleCurrentChange = async () => {
      refreshRuleList()
    }

    //打开新增规则Dialog
    const handleOpenAddRuleDialog = () => {
      //刷新方案列表下拉所用到的Options
      refreshSchemeOptions()
      //修改Dialog显示状态
      addOrEditRuleDialogVisible.value = true
      //修改Dialog标题
      addOrEditRuleDialogTitle.value = '新增规则'
      //修改当前操作类型
      currentUpdateType.value = 'ADD'
    }

    //打开编辑规则Dialog
    const handleOpenEditRuleDialog = async (row) => {
      //刷新方案列表下拉所用到的Options
      refreshSchemeOptions()
      //修改Dialog显示状态
      addOrEditRuleDialogVisible.value = true
      //修改Dialog名称
      addOrEditRuleDialogTitle.value = '编辑规则'
      //修改当前操作类型
      currentUpdateType.value = 'UPDATE'

      //回填数据到rule对象中
      rule.id = row.id
      rule.ruleName = row.ruleName
      rule.ruleNumber = row.ruleNumber
      //先设置schemeId，下面的步骤会用到
      rule.schemeId = row.schemeId
      rule.ruleStatus = row.ruleStatus == "0" ? true : false
      rule.ruleComments = row.ruleComments
      rule.ruleId = row.ruleId
      rule.createTime = row.createTime
      rule.updateTime = row.updateTime

      //根据选中的方案刷新级联选择用到的Options
      refreshCascaderOptions()

      //拼接出来editableTabs结构前先清空前一次的拼接结果
      editableTabs.value = []
      //根据ruleFieldList数据，封装ediTabs对象,这样ediTabs可以自动回显
      //获取editableTab的数量
      const editableTabNums = row.ruleFieldList[row.ruleFieldList.length - 1].ruleFieldAssociationTabIndex + 1
      for(let i=0;i<editableTabNums;i++) {
        editableTabs.value.push(
          {
            title: '条码1生成规则',
            name: 1,
            //条码名称表达式
            barCodeNamePlaceholder: `请输入条码1名称`,
            //条码名称
            barCodeName: '',
            //存储每一个tab页中所有的ruleField
            ruleFieldListForEachTab: [deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)]
          }
        )
      }

      for (let editableTabIndex = 0; editableTabIndex < editableTabNums; editableTabIndex++) {
        //设置editableTab的title值
        editableTabs.value[editableTabIndex].title = `条码${editableTabIndex + 1}生成规则`
        //设置editableTab的name值
        editableTabs.value[editableTabIndex].name = editableTabIndex + 1
        //设置editableTab的barCodeNamePlaceholder值
        editableTabs.value[editableTabIndex].barCodeNamePlaceholder = `请输入条码${editableTabIndex + 1}名称`
        //设置editableTab的barCodeName值
        editableTabs.value[editableTabIndex].barCodeName =
          row.ruleFieldList.filter(ruleField => {
            return ruleField.ruleFieldAssociationTabIndex == editableTabIndex && ruleField.ruleFieldCategoryCode == RuleFieldTypeEnum.BAR_CODE_NAME.CODE
          })[0].ruleFieldValue
        //设置editableTab的ruleFieldListForEachTab的值
        row.ruleFieldList.filter(ruleField => {
          return ruleField.ruleFieldAssociationTabIndex == editableTabIndex && ruleField.ruleFieldCategoryCode != RuleFieldTypeEnum.BAR_CODE_NAME.CODE
        }).forEach((ruleField, index) => {
          const ruleFied_ = deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)
          //设置每一个元素的ruleFieldType
          ruleFied_.ruleFieldType = ruleField.ruleFieldCategoryCode
          //设置每一个元素的fillStrategy
          ruleFied_.fillStrategy = JSON.parse(ruleField.ruleFieldFillStrategy)
          //设置每一个元素的fillStrategy.enable的disabledState
          ruleFied_.disabledState.fillStrategy.enable = false
          switch (ruleField.ruleFieldCategoryCode) {
            //固定常量
            case RuleFieldTypeEnum.FIXED_CONSTANT.CODE: {
              //设置固定常量的值
              ruleFied_.fixedConstant = ruleField.ruleFieldValue
              //设置固定常量的disabledState
              ruleFied_.disabledState.fixedConstant = false
              break;
            }
            //下拉选择
            case RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE: {
              //设置下拉选择选中的值
              ruleFied_.dropDownSelectOption = ruleField.ruleFieldValue
              //设置下拉选择的disabledState
              ruleFied_.disabledState.dropDownSelectOption = false
              break;
            }
            //级联选择
            case RuleFieldTypeEnum.CASCADER_SELECT_INPUT.CODE: {
              //设置级联选的选中的值
              ruleFied_.cascaderSelectedOptions = JSON.parse(ruleField.ruleFieldValue).cascaderOptionValue
              //设置下拉选择的disabledState
              ruleFied_.disabledState.cascaderSelectedOptions = false
              break;
            }
            //日期类型
            case RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.CODE: {
              //设置日期类型选中的日期格式
              ruleFied_.dateFormatSelectOption = ruleField.ruleFieldValue
              //设置下拉选择的disabledState
              ruleFied_.disabledState.dateFormatSelectOption = false
              break;
            }
            //自增序列
            case RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.CODE: {
              //设置自增序列的值
              ruleFied_.autoIncrementSequence = JSON.parse(ruleField.ruleFieldValue)
              //设置下拉选择的disabledState
              //设置进制
              ruleFied_.disabledState.autoIncrementSequence.binary = false
              //设置step
              ruleFied_.disabledState.autoIncrementSequence.step = false
              //设置起始序列
              ruleFied_.disabledState.autoIncrementSequence.startSequence = false
              break;
            }
            default:
              break
          }
          //设置每一个元素的resetStrategySelectOption的disabledState
          ruleFied_.disabledState.resetStrategySelectOption = false
          //设置每一个元素的resetStrategySelectOption的值
          ruleFied_.resetStrategySelectOption = ruleField.ruleFieldResetStrategy
          //设置editableTab的ruleFieldListForEachTab中每一个元素的值
          editableTabs.value[editableTabIndex].ruleFieldListForEachTab[index] = ruleFied_
        })
      }
    }

    /**
     * 删除规则
     */
    const handleDeleteRuleById = async (row) => {
      const response = await deleteRuleById(row.id)
      if (response.data.code === '200') {
        ElMessage({
          message: "删除规则成功",
          type: "success",
          plain: true,
        });
        //刷新方案列表
        refreshRuleList()
      } else {
        ElMessage({
          message: "删除规则失败",
          type: "error",
          plain: true,
        });
      }
    }

    //格式化方案启用状态
    const ruleStatusFormatter = (row, column, cellValue) => {
      return cellValue === '0' ? '启用' : '停用';
    }
    //格式化日期
    const dateFormatter = (row, column, cellValue) => {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
    }

    //监控更新或编辑Dialog是否打开
    watch(addOrEditRuleDialogVisible, (newValue, oldValue) => {
      currentEditableTabIndex.value = 1
      //如果处于关闭状态，就清空ediTabs的数据
      if (!newValue) {
        //将editableTabs中部分字段的值设置为初始值
        editableTabs.value = [
          {
            title: '条码1生成规则',
            name: 1,
            //条码名称表达式
            barCodeNamePlaceholder: `请输入条码1名称`,
            //条码名称
            barCodeName: '',
            //存储每一个tab页中所有的ruleField
            ruleFieldListForEachTab: [deepClone(TEMPLATE.RULE_FIELD_TEMPLATE)]
          }
        ]

        //将rule中部分字段的值设置为初始值
        const rule_ = deepClone(TEMPLATE.RULE_TEMPLATE)
        Object.keys(rule_).forEach(key => {
          rule[key] = rule_[key]
        })
      }
    })

    watch(conditions, async (newValue, oldValue) => {
      if (newValue.ruleName.trim() == '') {
        //页面打开时刷新规则列表
        refreshRuleList()
      } else {
        const response = await getRulesByRuleNamePagination(pagingParameters, conditions)
        if (response.code == 200) {
          ruleList.value = response.data.list
        } else {
          ElMessage({
            message: "根据名称查询规则列表失败",
            type: "error",
            plain: true,
          });
        }
      }
    })

    //当方案被重新选择时，修改该方案下的级联选择用到的Options数据
    const handleSchemeChange = async () => {
      refreshCascaderOptions()
    }

    //监控方案下拉选择的变化
    watch(rule, (newValue, oldValue) => {
      if (newValue.schemeId == '') {
        editableTabStyle['pointer-events'] = 'none'
        addRuleFieldButtonIsEnable.value = true
      } else {
        editableTabStyle['pointer-events'] = 'auto'
        addRuleFieldButtonIsEnable.value = false
      }
    })


    return {
      handleAddRuleField,
      addOrEditRuleDialogVisible,
      rule,
      cascaderOptions,
      dateFormatSelectOptions,
      handleCascaderChange,
      handleAddRule,
      handleCloseDialo,
      ruleFieldTypeSelectOptions,
      handleRuleFieldTypeChange,
      tabIndex,
      currentEditableTabIndex,
      editableTabs,
      handleTabsEdit,
      handleDeleteRuleField,
      cascaderRef,
      schemeOptions,
      rules,
      ruleFormRef,
      ruleList,
      handlePageSizeChange,
      handleCurrentChange,
      pagingParameters,
      editableTabFormRef,
      editableTabRules,
      handleDeleteRuleById,
      ruleStatusFormatter,
      handleOpenAddRuleDialog,
      handleOpenEditRuleDialog,
      addOrEditRuleDialogTitle,
      dateFormatter,
      handleUpdateRule,
      currentUpdateType,
      conditions,
      handleSchemeChange,
      editableTabStyle,
      addRuleFieldButtonIsEnable
    };
  },
};
</script>

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

<style scoped></style>
