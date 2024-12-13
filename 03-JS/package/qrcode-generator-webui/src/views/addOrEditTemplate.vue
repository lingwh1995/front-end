<template>
  <el-row>
    <el-col :span="11">
      <el-form-item label="选择方案">
        <el-select v-model="conditions.schemeId" placeholder="请选择方案" @change="handleSchemeOptionsChange">
          <el-option v-for="(schemeOption, index) in schemeOptions" :key="index" :label="schemeOption.label"
            :value="schemeOption.value" class="select-option-height" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="11">
      <el-form-item label="选择规则">
        <el-select v-model="conditions.ruleId" placeholder="请选择模板生成规则" @change="handleRuleOptionsChange">
          <el-option v-for="(ruleOption, index) in ruleOptions" :key="index" :label="ruleOption.label"
            :value="ruleOption.value" :disabled="ruleOption.disabled" class="select-option-height" />
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="1"></el-col>
  </el-row>
  <el-row>
    <div style="height: 200px;width: 100%;background-color: antiquewhite;">
      <div>
        <h1 style="text-align: left;">取值表达式区</h1>
      </div>
      <div style="height: 130px;width: 100%;overflow: scroll;">
        <div v-for="(barCodeInfoFetchValueExpression, index) in barCodesInfoFetchValueExpressionList" :key="index">
          <div>
            <div>下面的值可以通过表达式来获取</div>
            <div style="display: inline-block;">
              <div class="bar-code-rule-field-fetch-value-element">------------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">模板序号</div>
              <div class="bar-code-rule-field-fetch-value-element">------------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">模板名称</div>
              <div class="bar-code-rule-field-fetch-value-element">------------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">模板名称取值表达式</div>
              <div class="bar-code-rule-field-fetch-value-element">------------------------------</div>
            </div>
            <div style="display: inline-block;">
              <div class="bar-code-rule-field-fetch-value-element">--------------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">{{ barCodeInfoFetchValueExpression.barCodeNameOrder }}
              </div>
              <div class="bar-code-rule-field-fetch-value-element">--------------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">{{ barCodeInfoFetchValueExpression.barCodeName }}</div>
              <div class="bar-code-rule-field-fetch-value-element">--------------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">
                {{ barCodeInfoFetchValueExpression.barCodeNameFetchValueExpression }} </div>
              <div class="bar-code-rule-field-fetch-value-element">--------------------------------</div>
            </div>
            <div style="display: inline-block;">
              <div class="bar-code-rule-field-fetch-value-element">&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="bar-code-rule-field-fetch-value-element">&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="bar-code-rule-field-fetch-value-element">&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="bar-code-rule-field-fetch-value-element">&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="bar-code-rule-field-fetch-value-element">&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="bar-code-rule-field-fetch-value-element">&nbsp;&nbsp;&nbsp;&nbsp;</div>
              <div class="bar-code-rule-field-fetch-value-element">&nbsp;&nbsp;&nbsp;&nbsp;</div>
            </div>
            <div style="display: inline-block;">
              <div class="bar-code-rule-field-fetch-value-element">----------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">字段序号</div>
              <div class="bar-code-rule-field-fetch-value-element">----------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">字段名称</div>
              <div class="bar-code-rule-field-fetch-value-element">----------------------------</div>
              <div class="bar-code-rule-field-fetch-value-element">字段取值表达式</div>
              <div class="bar-code-rule-field-fetch-value-element">----------------------------</div>
            </div>
            <div style="display: inline-block;"
              v-for="(barCodeRuleFieldFetchValueExpressionList, index_) in barCodeInfoFetchValueExpression.barCodeRuleFieldFetchValueExpressionList"
              :key="index_">
              <div class="bar-code-rule-field-fetch-value-element">----------------</div>
              <div class="bar-code-rule-field-fetch-value-element">
                {{ barCodeRuleFieldFetchValueExpressionList.ruleFieldOrder }}</div>
              <div class="bar-code-rule-field-fetch-value-element">----------------</div>
              <div class="bar-code-rule-field-fetch-value-element">
                {{ barCodeRuleFieldFetchValueExpressionList.ruleFieldName }}</div>
              <div class="bar-code-rule-field-fetch-value-element">----------------</div>
              <div class="bar-code-rule-field-fetch-value-element">
                {{ barCodeRuleFieldFetchValueExpressionList.ruleFieldFetchValueExpression }}</div>
              <div class="bar-code-rule-field-fetch-value-element">----------------</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </el-row>

  <el-row>
    <el-col :span="24">
      <el-row>
        <h1 style="text-align: center;">模板配置区</h1>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-tabs v-model="currentEditTabIndex" type="border-card" style="height:300px;overflow:scroll;">
            <el-tab-pane label="生成样式模板配置">
              <el-form-item label="请输入模板名称" :label-width="labelWidth">
                <el-input v-model="templateTypeAndContent.generateTemplate.name"/>
              </el-form-item>
              <el-form-item label="请配置生成样式模板"  :label-width="labelWidth">
                <el-input v-model="templateTypeAndContent.generateTemplate.content" type="textarea" />
              </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="导出样式模板配置">
              <el-form-item label="请输入模板名称" :label-width="labelWidth">
                <el-input v-model="templateTypeAndContent.exportTemplate.name"/>
              </el-form-item>
              <el-form-item label="请配置导出样式模板-表头" :label-width="labelWidth">
                <el-input v-model="templateTypeAndContent.exportTemplate.content.headers" type="textarea" />
              </el-form-item>
              <el-form-item label="请配置导出样式模板-表体" :label-width="labelWidth">
                <el-input v-model="templateTypeAndContent.exportTemplate.content.fields" type="textarea" />
              </el-form-item>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
  <el-row style="background-color: #D4D7DE;height: 50px;position: relative;">
    <el-col>
      <el-button type="primary" @click="handleAddTemplate" :disabled="addBarCodesBatchButtonState"
        style="position: absolute;top: 50%;left: 30%;transform: translate(-50%, -50%);">保存模板</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { getRulesBySchemeIdForSelect } from "@/api/rule.js";
import { getSchemesForSelectInput } from '@/api/scheme.js'
import { addTemplate } from '@/api/template.js'
import { getRuleFieldsByRuleId } from "@/api/ruleField.js";

import { deepClone } from '@/commons/utils.js'
import { RuleFieldTypeEnum_,TemplateEnum_ } from '@/commons/enum.js'

export default {
  name: 'AddOrEditTemplate',
  setup() {
    //处理导入的枚举
    const TemplateEnum  = reactive(TemplateEnum_)
    //导入枚举并重命名枚举
    const RuleFieldTypeEnum = RuleFieldTypeEnum_

    const editableTabs = ref([])
    //方案下拉框选项
    const schemeOptions = ref([]);
    //模板生成规则下拉框选项
    const ruleOptions = ref([]);

    //当前正在操作的tab页的索引
    const currentEditTabIndex = ref(1)

    //查询用到的所有条件
    const conditions = reactive({
      schemeId: "",
      schemeName: "",
      ruleId: "",
      ruleName: "",
    });

    //表单项宽度
    const labelWidth = ref('180px')

    onMounted(async () => {
      try {
        //从数据库查询方案名称下拉框需要用到的数据
        const getSchemesResponse = await getSchemesForSelectInput()
        //获取到了所有的方案列表
        const schemeList = getSchemesResponse.data.data
        //根据全部的方案列表数据封装方案名称下拉框需要用到的数据
        schemeList.forEach(scheme => {
          schemeOptions.value.push({ label: scheme.schemeName, value: scheme.schemeId })
        });
      } catch (error) {
        console.log(error)
      }
      //控制第一次打开tab时，从第几个tab页中开始显示内容，如果设置为，打开后第一个tab标签页中内容为空
      currentEditTabIndex.value = '0'
    })

    //监听方案下拉框数据的变化
    const handleSchemeOptionsChange = async (val) => {
      //清空editableTabs中数据
      editableTabs.value = []
      //查询出当前选中的下拉框对象
      const currentSelectedSchemeOption = schemeOptions.value.find((schemeOption) => {
        return schemeOption.value === val;
      });
      //获取label值,并保存起来后面会用到
      conditions.schemeName = currentSelectedSchemeOption.label
      //先清空方案下拉框所有选项，再重新查询
      ruleOptions.value = [];
      try {
        //获取当前选中的方案id，并根据方案id查询该方案下所有的模板生成规则
        const getRulesBySchemeIdResponse = await getRulesBySchemeIdForSelect(conditions.schemeId);
        //根据查询出来的数据封装模板生成规则下拉框需要的数据
        const rules = getRulesBySchemeIdResponse.data.data;
        rules.forEach((rule, index) => {
          ruleOptions.value.push({ label: rule.ruleName, value: rule.ruleId });
        });
      } catch (error) {
        console.log(error);
      }
    };
    
    //把所有模板字段信息封装到取值表达式数组中
    const barCodesInfoFetchValueExpressionList = ref([])
    //监听模板生成规则下拉框数据的变化
    const handleRuleOptionsChange = async (val) => {
      //查询出当前选中的下拉框对象
      const currentSelectedRuleOption = ruleOptions.value.find((ruleOption) => {
        return ruleOption.value === val;
      });

      //获取label值,并保存起来后面会用到
      conditions.ruleName = currentSelectedRuleOption.label

      //每次规则发生改变时，先清空之前生成的 所有模板字段信息取值表达式数组
      barCodesInfoFetchValueExpressionList.value = []
      try {
        //获取当前选中的模板生规则id，并根据模板生成规则id查询该规则下所有的模板生成规则字段
        const getRuleFieldsByRuleIdResponse = await getRuleFieldsByRuleId(conditions.ruleId);
        const ruleFields = getRuleFieldsByRuleIdResponse.data.data;
        //根据ruleFields解析出最大的标签页的数量
        const maxBarCodesIndex = ruleFields[ruleFields.length - 1].ruleFieldAssociationTabIndex + 1
        for (let barCodesIndex = 0; barCodesIndex < maxBarCodesIndex; barCodesIndex++) {
          //每执行一次,可以过滤出一个tab页上所有的动态显示的字段
          const currentBarCodeRuleFieldList = ruleFields.filter(ruleField => ruleField.ruleFieldAssociationTabIndex == barCodesIndex)
          //把每一个tab页面解析出来的信息封装到一个样式配置对象中
          const barCodeInfoFetchValueExpression = {
            barCodeName: null,
            barCodeNameOrder: null,
            barCodeNameFetchValueExpression: null,
            barCodeRuleFieldFetchValueExpressionList: []
          }
          const barCodeRuleFieldFetchValueExpressionList = []
          //遍历这一个barCode上所有的需要动态显示的字段，并放到 barCodeRuleFieldFetchValueExpression中
          for (let barCodeRuleFieldIndex = 0; barCodeRuleFieldIndex < currentBarCodeRuleFieldList.length; barCodeRuleFieldIndex++) {
            let barCodeRuleFieldFetchValueExpression = {}
            switch (currentBarCodeRuleFieldList[barCodeRuleFieldIndex].ruleFieldCategoryCode) {
              //如果是字段类型是固定常量,这里使用输入框回填处理
              case RuleFieldTypeEnum.FIXED_CONSTANT.CODE:
                barCodeRuleFieldFetchValueExpression = {
                  ruleFieldName: currentBarCodeRuleFieldList[barCodeRuleFieldIndex].ruleFieldName,
                  ruleFieldOrder: barCodeRuleFieldIndex + 1,
                  ruleFieldFetchValueExpression: `#{${barCodesIndex + 1}-${barCodeRuleFieldIndex + 1}}`
                }
                break;
              //如果字段类型是下拉框，这里使用下拉框来处理
              case RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE:
                barCodeRuleFieldFetchValueExpression = {
                  ruleFieldName: currentBarCodeRuleFieldList[barCodeRuleFieldIndex].ruleFieldName,
                  ruleFieldOrder: i + 1,
                  ruleFieldFetchValueExpression: `#{${barCodesIndex + 1}-${barCodeRuleFieldIndex + 1}}`
                }
                break;
              //配置规则时用级联选择配置，解析时使用下拉框来解析
              case RuleFieldTypeEnum.CASCADER_SELECT_INPUT.CODE:
                barCodeRuleFieldFetchValueExpression = {
                  ruleFieldName: currentBarCodeRuleFieldList[barCodeRuleFieldIndex].ruleFieldName,
                  ruleFieldOrder: barCodeRuleFieldIndex + 1,
                  ruleFieldFetchValueExpression: `#{${barCodesIndex + 1}-${barCodeRuleFieldIndex + 1}}`
                }
                break;
              //如果是字段类型是日期格式,这里使用输入框回填处理
              case RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.CODE:
                barCodeRuleFieldFetchValueExpression = {
                  ruleFieldName: currentBarCodeRuleFieldList[barCodeRuleFieldIndex].ruleFieldName,
                  ruleFieldOrder: barCodeRuleFieldIndex + 1,
                  ruleFieldFetchValueExpression: `#{${barCodesIndex + 1}-${barCodeRuleFieldIndex + 1}}`
                }
                break;
              //特殊处理字段类型是自增序列
              case RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.CODE:
                barCodeRuleFieldFetchValueExpression = {
                  ruleFieldName: currentBarCodeRuleFieldList[barCodeRuleFieldIndex].ruleFieldName,
                  ruleFieldOrder: barCodeRuleFieldIndex + 1,
                  ruleFieldFetchValueExpression: `#{${barCodesIndex + 1}-${barCodeRuleFieldIndex + 1}}`
                }
                break;
              //如果是字段名称,直接给editTable中的barCodesName属性赋值
              case RuleFieldTypeEnum.BAR_CODE_NAME.CODE:
                const barCodeName = currentBarCodeRuleFieldList[barCodeRuleFieldIndex].ruleFieldValue
                barCodeRuleFieldFetchValueExpression = {
                  ruleFieldName: `模板${barCodesIndex + 1}名称`,
                  ruleFieldOrder: barCodesIndex + 1,
                  ruleFieldFetchValueExpression: `#{barCodeName-${barCodesIndex + 1}}`
                }
                break;
              default:
                barCodeRuleFieldFetchValueExpression = {}
                break;
            }
            barCodeRuleFieldFetchValueExpressionList.push(barCodeRuleFieldFetchValueExpression)
          }
          //取出数组中最后一个元素,模板名称、模板名称取值表达式存放在这个里面
          const barCodeNameInfo = barCodeRuleFieldFetchValueExpressionList.pop()
          //设置模板名称
          barCodeInfoFetchValueExpression.barCodeName = barCodeNameInfo.ruleFieldName
          //设置模板序号
          barCodeInfoFetchValueExpression.barCodeNameOrder = barCodeNameInfo.ruleFieldOrder
          //设置模板名称取值表达式
          barCodeInfoFetchValueExpression.barCodeNameFetchValueExpression = barCodeNameInfo.ruleFieldFetchValueExpression
          //设置每一个模板的所有字段取值表达式信息
          barCodeInfoFetchValueExpression.barCodeRuleFieldFetchValueExpressionList = barCodeRuleFieldFetchValueExpressionList
          //把每一个模板的取值表达式信息存放在数组中
          barCodesInfoFetchValueExpressionList.value.push(barCodeInfoFetchValueExpression)
        }
      } catch (error) {
        console.log(error);
      }
      //设置所有下拉框的默认选中状态
      //editableTabs.value[0].formItemsConfig[1].options[1].asDefault = true
    };


    //模板配置
    const templateTypeAndContent = reactive({
      generateTemplate: {
        type:TemplateEnum.GENERATE_TEMPLATE.CODE,
        name:null,
        content:null
      },
      exportTemplate: {
        type:TemplateEnum.EXPORT_TEMPLATE.CODE,
        name:null,
        content: {
          headers:null,
          fields:null,
        }        
      },
    })

    //template实体模板
    const TEMPLATE_TEMPLATE = {
      //模板表主键
      id:null,
      //与该条条码相互关联的方案的唯一标识
      schemeId:null,
      //与该条条码相互关联的方案的名称
      schemeName:null,
      //与该条条码相互关联的规则的唯一标识
      ruleId:null, 
      //与该条条码相互关联的规则的名称
      ruleName:null,
      //模板名称
      templateName:null,
      //模板启用状态[0:正常,1停用]
      templateStatus:0,
      //模板类型
      templateType:null,
      //模板内容
      templateContent:null,
      //创建时间
      createTime:null,
      //更新时间
      updateTime:null
    }
    /**
     * 保存模板
     */   
    const handleAddTemplate = async () => {
      const template_ = deepClone(TEMPLATE_TEMPLATE)
      let templateName = null;
      let templateType = null;
      let templateContent = null;
      switch(currentEditTabIndex.value) {
        case '0': {
          templateName = templateTypeAndContent.generateTemplate.name
          templateType = templateTypeAndContent.generateTemplate.type
          templateContent = templateTypeAndContent.generateTemplate.content
          break;
        }
        case '1': {
          templateName = templateTypeAndContent.exportTemplate.name
          templateType = templateTypeAndContent.exportTemplate.type
          templateContent = JSON.stringify(templateTypeAndContent.exportTemplate.content)
          break;
        }
        default: {
          break
        }
      }
      template_.schemeId = conditions.schemeId
      template_.schemeName = conditions.schemeName
      template_.ruleId = conditions.ruleId
      template_.ruleName = conditions.ruleName
      template_.templateName = templateName
      template_.templateType = templateType
      template_.templateContent = templateContent 
      const response = await addTemplate(template_)
      if (response.status === 200) {
        //设置列表数据
        //schemeList.value = response.data.list
        //设置分页总页数
        //pagingParameters.total = response.data.total
        ElMessage({
          message: "新增模板成功",
          type: "success",
          plain: true,
        });
      } else {
        ElMessage({
          message: "新增模板失败",
          type: "error",
          plain: true,
        });
      }
    }

    return {
      schemeOptions,
      ruleOptions,
      handleSchemeOptionsChange,
      handleRuleOptionsChange,
      conditions,
      barCodesInfoFetchValueExpressionList,
      templateTypeAndContent,
      currentEditTabIndex,
      handleAddTemplate,
      TemplateEnum,
      labelWidth
    };
  },
};
</script>
<style scoped>
/**表单项长度 */
.form-item-width {
  width: 100%;
}

.infinite-list {
  height: 430px;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow: scroll;
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

.form-item-height {
  height: 30px;
  line-height: 30px;
}

.select-option-height {
  height: 28px;
  line-height: 28px;
}

.bar-code-rule-field-fetch-value-element {
  display: block;
  text-align: center;
  line-height: 12px;
  font-size: 12px;
}

/* .el-radio-button {
  width: 110px;
} */
</style>