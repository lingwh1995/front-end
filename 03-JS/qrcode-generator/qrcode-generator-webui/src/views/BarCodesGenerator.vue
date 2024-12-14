<template>
  <el-row type='flex'>
    <el-col :span="12">
      <el-row>
        <h1 style="text-align: center;">条码信息区</h1>
      </el-row>
      <!-- <el-row>
        <el-col>
          <el-form-item class="select-option-height"></el-form-item>
        </el-col>
        <el-col :span="11">
          <el-form-item label="选择方案" v-show="false">
            <el-select v-model="conditions.schemeId" placeholder="请选择方案" @change="handleSchemeOptionsChange">
              <el-option v-for="(schemeOption, index) in schemeOptions" :key="index" :label="schemeOption.label"
                :value="schemeOption.value" class="select-option-height"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
        <el-col :span="11">
          <el-form-item label="选择规则" v-show="false">
            <el-select v-model="conditions.ruleId" placeholder="请选择条码生成规则" @change="handleRuleOptionsChange">
              <el-option v-for="(ruleOption, index) in ruleOptions" :key="index" :label="ruleOption.label"
                :value="ruleOption.value" :disabled="ruleOption.disabled" class="select-option-height"/>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="1"></el-col>
      </el-row> -->
      <el-row>
        <el-col :span="24">
          <el-tabs type="border-card" style="height:550px;overflow:hidden;">
            <el-tab-pane label="用户管理" style="height: 100%;width: 100%;padding-left: 5px;">
              <el-row><h1>{{getMFID(editableTabs[0])}}</h1></el-row>
              <el-row><h1>{{getModelInfo(editableTabs[0])}}</h1></el-row>
              <el-row><h1>{{getFactoryNumber(editableTabs[0])}}</h1></el-row>
              <el-row><h1>{{getStationNumber(editableTabs[0])}}</h1></el-row>
              <el-row><h1>{{getMFD(editableTabs[1])}}</h1></el-row>
              <el-row><h1>{{getThisAlreadyProduced(editableTabs[1])}}</h1></el-row>
            </el-tab-pane>
          </el-tabs>

		  <!-- TODO这里的代码暂时不在页面显示 -->
          <el-tabs v-show="false" v-model="currentEditableTabIndex" type="border-card" style="height:500px;overflow:scroll;">
            <el-tab-pane v-for="editableTab in editableTabs" :key="editableTab.name" :label="`${editableTab.title}-[${editableTab.barCodeName}]`"
              :name="editableTab.name">
              <el-form :model="editableTab.formItemsConfig"
                v-for="(formItemConfig, index) in editableTab.formItemsConfig" :key="index" label-position="left">
                <el-row v-show="FormItemTypeEnum.FORM_ITEM_INPUT.CODE == formItemConfig.formItemTypeCode">
                  <el-col class="form-item-height">
                    <el-form-item :label="formItemConfig.label" :label-width="labelWidth" style="background-color:#F2F3F5; pointer-events: none">
                      <el-input v-model="formItemConfig.value" size="small" class="form-item-width" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-show="FormItemTypeEnum.FORM_ITEM_SELECT.CODE == formItemConfig.formItemTypeCode">
                  <el-col class="form-item-height">
                    <el-form-item :label="formItemConfig.label" :label-width="labelWidth">
                      <el-select v-model="formItemConfig.value" :placeholder="formItemConfig.placeholder" size="small"
                        class="form-item-width">
                        <!-- <el-option v-for="(option, index) in formItemConfig.options" :key="index" :label="option.label"
                          :value="option.value" class="form-item-width" size="small" /> -->
                        <el-option v-for="(option, index) in formItemConfig.options" :key="index" :label="option.label" 
                          :value="option.value" class="select-option-height">
                          <div>
                            <div style="width: 60%;float: left">{{ option.label }}</div>
                            <div style="width: 30%;float: left">{{ option.value }}</div>
                            <div style="width: 10%;float: right">
                              <!-- <el-checkbox v-model="option.asDefault" @change="handleDefaultSelectedChange(formItemConfig.options,option.value)" label="设为默认" /> -->
                            </div>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row
                  v-show="FormItemTypeEnum.FORM_ITEM_AUTO_INCREMENT_SEQUENCE.CODE == formItemConfig.formItemTypeCode"
                  style="margin-top:0px;background-color: #F2F3F5;pointer-events: none">
                  <!-- 处理自增序列-->
                    <el-col :span="15">
                      <el-row class="form-item-height">
                        <el-col>
                          <!-- 序列进制 -->
                          <el-form-item :label="`${formItemConfig.label}-序列进制`" :label-width="labelWidth">
                            <!-- <el-input v-model="formItemConfig.autoIncrementSequence.binary" size="small"/> -->
                            <el-radio-group v-model="formItemConfig.autoIncrementSequence.binary" size="small"
                              is-button>
                              <el-radio-button label="10" value="10" />
                              <el-radio-button label="16" value="16" />
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row class="form-item-height">
                        <el-col>
                          <!-- 增长步长 -->
                          <el-form-item :label="`${formItemConfig.label}-增长步长`" :label-width="labelWidth">
                            <!-- <el-input v-model="formItemConfig.autoIncrementSequence.step" size="small"/> -->
                            <el-input-number size="small" v-model="formItemConfig.autoIncrementSequence.step" :min="1"
                              controls-position="right" class="form-item-width" />
                          </el-form-item>
                        </el-col>
                      </el-row class="form-item-height">
                      <el-row class="form-item-height">
                        <el-col>
                          <!-- 起始序号 -->
                          <el-form-item :label="`${formItemConfig.label}-起始序号`" :label-width="labelWidth">
                            <!-- <el-input v-model="formItemConfig.autoIncrementSequence.startSequence" size="small"/> -->
                            <el-input-number size="small" :min="1" style="font-weight: 900;"
                              v-model="formItemConfig.autoIncrementSequence.startSequence" controls-position="right"
                              class="form-item-width" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="formItemConfig.fillStrategy.enable" class="form-item-height">
                        <el-col>
                          <!-- 补齐方向 -->
                          <el-form-item :label="`${formItemConfig.label}-补齐方向`" :label-width="labelWidth">
                            <!-- <el-input v-model="formItemConfig.fillStrategy.direction" size="small"/> -->
                            <el-radio-group v-model="formItemConfig.fillStrategy.direction" size="small" is-button>
                              <el-radio-button label="左" value="l" />
                              <el-radio-button label="右" value="r" />
                            </el-radio-group>
                          </el-form-item>
                        </el-col>
                      </el-row class="form-item-height">
                      <el-row v-if="formItemConfig.fillStrategy.enable" class="form-item-height">
                        <el-col>
                          <!-- 补齐长度 -->
                          <el-form-item :label="`${formItemConfig.label}-补齐长度`" :label-width="labelWidth">
                            <!-- <el-input v-model="formItemConfig.fillStrategy.length" size="small"/> -->
                            <el-input-number size="small" v-model="formItemConfig.fillStrategy.length" :min="0"
                              controls-position="right" class="form-item-width" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="formItemConfig.fillStrategy.enable" class="form-item-height">
                        <el-col>
                          <!-- 补齐字符 -->
                          <el-form-item :label="`${formItemConfig.label}-补齐字符`" :label-width="labelWidth">
                            <!-- <el-input v-model="formItemConfig.fillStrategy.character" size="small"/> -->
                            <el-input v-model="formItemConfig.fillStrategy.character" size="small"
                              class="form-item-width" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-col>
                    <el-col :span="1" />
                    <el-col :span="8" style="background-color: peachpuff;">
                      <div style="height: 100%;display: flex;align-items: center;flex-wrap: wrap;">
                        <div
                          style="text-align: center;width: 100%;font-size: 40px;font-weight: bold;">
                          {{ formItemConfig.autoIncrementSequence.startSequence }}
                        </div>
                        <div style="text-align: center;width: 100%;font-weight: bold;font-size: 20px;">下次生成时的起始序列</div>
                      </div>
                    </el-col>
                </el-row>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="12">
      <el-row>
        <h1 style="text-align: center;">条码预览区</h1>
      </el-row>
	 <!-- TODO这里的代码暂时注释掉了 -->
      <!-- <el-row>
        <el-form-item label="" style="color: green;text-align: center;width: 100%;font-weight: bold;">
          *点击<span style="color: blue;">[本次生成条码]</span>或<span style="color: blue;">[上次生成条码]</span>切换查看本次生成结果或者上次生成结果*
        </el-form-item>
      </el-row> -->
      <el-row>
        <el-tabs type="border-card" style="height:550px;width: 100%;margin-bottom: 20px;">
          <el-tab-pane label="本次生成条码">
            <ul class="infinite-list" >
              <li
                v-for="(currentBatchGenerateBarCodesValueForUserShow, index) in currentBatchGenerateBarCodesValueForUserShowList"
                :key="index" class="infinite-list-item">
                {{ currentBatchGenerateBarCodesValueForUserShow }}</li>
            </ul>
          </el-tab-pane>
          <!-- <el-tab-pane label="上次生成条码">
            <ul class="infinite-list">
              <li
                v-for="(previousBatchGenerateBarCodesValueForUserShow, index) in previousBatchGenerateBarCodesValueForUserShowList"
                :key="index" class="infinite-list-item">
                {{ previousBatchGenerateBarCodesValueForUserShow }}</li>
            </ul>
          </el-tab-pane> -->
        </el-tabs>
      </el-row>
    </el-col>
  </el-row>
  <el-row style="background-color: #D4D7DE;height: 50px;position: relative;">
    <el-col>
      <!-- 生成数量 -->
      <el-form-item label="请输入本次生成数量" style="position: absolute;top: 50%;left: 10%;transform: translate(-50%, -50%);">
        <el-input-number :min="1" :max="100000" v-model.number="generateNums" />
      </el-form-item>
    </el-col>
    <el-col>
      <!-- 生成样式 -->
      <!-- <el-form-item label="请选择生成样式" style="position: absolute;top: 50%;left: 30%;transform: translate(-50%, -50%);">
        <el-select v-model="templateInfo.templateContent" placeholder="请选择生成样式" style="width: 150px">
          <el-option v-for="(generateTemplateOption, index) in generateTemplateOptions" :key="index" :label="generateTemplateOption.label"
            :value="generateTemplateOption.value" size="small"/>
        </el-select>
      </el-form-item> -->
    </el-col>
    <el-col>
      <el-button type="primary" @click="handleAddBarCodes" :disabled="addBarCodesBatchButtonState"
        style="position: absolute;top: 50%;left: 40%;transform: translate(-50%, -50%);">生成条码</el-button>
    </el-col>
    <el-col>
	  <!-- TODO这里的代码暂时不在页面显示 -->
      <el-button v-show="false" type="primary" @click="handleUndoAddBarCodesBatch" :disabled="undoAddBarCodesBatchButtonState"
        style="position: absolute;top: 50%;left: 45%;transform: translate(-50%, -50%);">撤销生成</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { ref, reactive, onMounted,watch} from "vue";
import { ElMessage } from "element-plus";
import { getRulesBySchemeIdForSelect } from "@/api/rule.js";
import { getRuleFieldsByRuleId, updateRuleFieldValueAutoIncrementSequenceStartSequenceById } from "@/api/ruleField.js";
import { getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode } from "@/api/dict.js";
import { getSchemesForSelectInput } from '@/api/scheme.js'
import { addBarCodes, undoAddBarCodes,getLastBatchGenerateBarCodesBySchemeIdAndRuleId } from '@/api/barCodes.js'
import { getTemplates } from '@/api/template.js'

//导入lodash的深克隆模块
import { deepClone } from '@/commons/utils.js'
import { RuleFieldTypeEnum_, FormItemTypeEnum_,TemplateEnum_ } from '@/commons/enum.js'
//导入所有的自定义算法
import { CUSTOM_ALGORITHM } from '@/commons/algorithm.js'
//导入缓存
import { cache } from '@/commons/cache.js'
//导入将中文转拼音的类库
import { pinyin } from 'pinyin-pro';
//格式化日期插件
import dayjs from 'dayjs';

export default {
  name: 'BarCodesGenerator',
  props: {
    barCodesGeneratorDialogVisible: Boolean
  },
  setup(props) {
    //导入枚举并重命名枚举
    const RuleFieldTypeEnum = RuleFieldTypeEnum_
    //导入枚举，并把枚举转换成reactive类型数据
    const FormItemTypeEnum = reactive(FormItemTypeEnum_)
    const TemplateEnum = TemplateEnum_

    //当前正在操作的tab页的索引
    const currentEditableTabIndex = ref(1)
    const editableTabs = ref([])
    

    //定义级联选择样式
    const cascaderStyle = reactive({
      width: '60%'
    })

    //条码生成规则下拉框选项
    const ruleOptions = ref([]);

    const schemeOptions = ref([]);

    //查询用到的所有条件
    const conditions = reactive({
      schemeId: '',
      schemeName: '',
      ruleId: '',
      ruleName: ''
    });

    const templateInfo = reactive({
      templateType:TemplateEnum.GENERATE_TEMPLATE.CODE,
      templateContent:null,
    })

    //条码生成数量
    const generateNums = ref(1)

    //生成条码按钮可用状态
    const addBarCodesBatchButtonState = ref(true)
    //撤销删除按钮可用状态
    const undoAddBarCodesBatchButtonState = ref(true)

    /**
     * 根据方案的中文名称获取英文简称
     */
    const getSchemeNameSimpleFormatEnglishByChinese = (schemeNameCompleteForamtChinese) => {
      //方案名称的英文简称 eg: 上海松江燃气 的英文简称是 SHSJRQ
      return pinyin(schemeNameCompleteForamtChinese).split(" ").map(pinyin => pinyin.substring(0, 1).toUpperCase()).join("")
    }

    onMounted(async () => {
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
      mockUserClik()
    })

    // TODO 这里模拟了用户手动点击方案和规则下拉框
    const mockUserClik = () => {
      conditions.schemeName = 'Lorawan';
      conditions.schemeId = '82b96e0d6b49425394a7e3f871b74981'
      conditions.ruleName = 'Lorawan';
      conditions.ruleId = 'c0f5ebb4dfd94f9d98d281e1979b3a00'
      handleRuleOptionsChange('')
    }

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
        //获取当前选中的方案id，并根据方案id查询该方案下所有的条码生成规则
        const getRulesBySchemeIdResponse = await getRulesBySchemeIdForSelect(conditions.schemeId);
        //根据查询出来的数据封装条码生成规则下拉框需要的数据
        const rules = getRulesBySchemeIdResponse.data.data;
        rules.forEach(rule => {
          //这里要把当前规则的updateTime设置进去
          ruleOptions.value.push({ label: rule.ruleName, value: rule.ruleId,updateTime:rule.updateTime });
        });
      } catch (error) {
        console.log(error);
      }
    };

    const labelWidth = ref('140px');

    //生成样式下拉框需要的数据
    const generateTemplateOptions = ref([])

    //监听条码生成规则下拉框数据的变化
    const handleRuleOptionsChange = async (val) => {
      // TODO 这里暂时注释掉了
      /*
      //查询出当前选中的下拉框对象
      const currentSelectedRuleOption = ruleOptions.value.find((ruleOption) => {
        return ruleOption.value === val;
      });
      //获取label值,并保存起来后面会用到
      conditions.ruleName = currentSelectedRuleOption.label
      */

      //每次动态生成新的Tab页时，先清空之前所有的Tab页的数据
      editableTabs.value = []
      try {
        //获取当前选中的条码生规则id，并根据条码生成规则id查询该规则下所有的条码生成规则字段
        const getRuleFieldsByRuleIdResponse = await getRuleFieldsByRuleId(conditions.ruleId);
        const ruleFields = getRuleFieldsByRuleIdResponse.data;
        //根据ruleFields解析出最大的标签页的数量
        const maxTabIndex = ruleFields[ruleFields.length - 1].ruleFieldAssociationTabIndex + 1
        for (let tabIndex = 0; tabIndex < maxTabIndex; tabIndex++) {
          //每执行一次,可以过滤出一个tab页上所有的动态显示的字段
          const currentTabRuleFields = ruleFields.filter(ruleField => ruleField.ruleFieldAssociationTabIndex == tabIndex)
          //把每一个tab页面解析出来的信息封装到一个对象中
          const editableTab = {
            title: `条码${tabIndex + 1}生成规则`,
            name: tabIndex + 1,
            barCodeName: '',
            formItemsConfig: [],
          }

          const formItemsConfig = []
          //遍历这一个tab页上所有的需要动态显示的字段，并放到 formItemsConfig中
          for (let i = 0; i < currentTabRuleFields.length; i++) {
            let formItemConfig = {}
            switch (currentTabRuleFields[i].ruleFieldCategoryCode) {
              //如果是字段类型是固定常量,这里使用输入框回填处理
              case RuleFieldTypeEnum.FIXED_CONSTANT.CODE:
                formItemConfig = {
                  value: currentTabRuleFields[i].ruleFieldValue,
                  label: currentTabRuleFields[i].ruleFieldName,
                  options: [],
                  formItemTypeCode: FormItemTypeEnum.FORM_ITEM_INPUT.CODE,
                  placeholder: '',
                  autoIncrementSequence: '',
                  autoIncrementSequence: '',
                  fillStrategy: '',
                  resetStrategy:''
                }
                break;
              //如果字段类型是下拉框，这里使用下拉框来处理
              case RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE:
                formItemConfig = {
                  value: '',
                  label: currentTabRuleFields[i].ruleFieldName,
                  options: [],
                  formItemTypeCode: FormItemTypeEnum.FORM_ITEM_SELECT.CODE,
                  placeholder: '请选择' + currentTabRuleFields[i].ruleFieldName,
                  autoIncrementSequence: '',
                  fillStrategy: '',
                  resetStrategy:''
                }
                break;
              //配置规则时用级联选择配置，解析时使用下拉框来解析
              case RuleFieldTypeEnum.CASCADER_SELECT_INPUT.CODE:
                //首先根据 ruleField.ruleFieldCategoryCode 查询出级联选择需要的options数据
                //从级联选择器的选中的Options数组中获取查询下拉框数据需要的dictCode，即数组中的最后一个元素
                const cascaderOptionValue = JSON.parse(currentTabRuleFields[i].ruleFieldValue).cascaderOptionValue
                const dictCode = cascaderOptionValue[cascaderOptionValue.length - 1]
                const cacheKey = conditions.schemeId + dictCode
                let dicts = []
                //这里每次打开都要查询，做一个简单的缓存处理一下
                if (`${cacheKey}` in cache == false) {
                  const getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCodeResponse =
                    await getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCode({ schemeId: conditions.schemeId, dictCode: dictCode });
                  dicts = getDictsForSelectOptionsByParentIdFromSchemeIdAndDictCodeResponse.data.data
                  cache[`${cacheKey}`] = dicts
                } else {
                  dicts = cache[`${cacheKey}`]
                }
                let options = []
                dicts.forEach(dict => {
                  options.push({ label: dict.dictName, value: dict.dictData,asDefault:false })
                })
                formItemConfig = {
                  value: '',
                  label: JSON.parse(currentTabRuleFields[i].ruleFieldValue).cascaderOptionLabel,
                  options: options,
                  formItemTypeCode: FormItemTypeEnum.FORM_ITEM_SELECT.CODE,
                  placeholder: '请选择' + JSON.parse(currentTabRuleFields[i].ruleFieldValue).cascaderOptionLabel,
                  autoIncrementSequence: '',
                  fillStrategy: '',
                  resetStrategy:''                  
                }
                break;
              //如果是字段类型是日期格式,这里使用输入框回填处理
              case RuleFieldTypeEnum.COMBINATION_FORMAT_DATA.CODE:
                //根据日期格式拼接出对应日期数据
                const dataFormat = currentTabRuleFields[i].ruleFieldValue
                //拼接出来的日期值
                let dateValue = ''
                switch (dataFormat) {
                  case 'YYYY-MM-DD':
                    dateValue = ''
                    alert(`${dataFormat}-暂时没有做处理,请添加针对此格式的处理算法~`)
                    break;
                  case 'YYMM':
                    dateValue = dayjs(new Date()).format('YYYY-MM-DD')
                    break;
                  case 'YYWS':
                    let ws = dayjs(new Date()).format('w')
                    if(ws.length == 1) {
                      ws = '0' + ws
                    }
                    dateValue = dayjs(new Date()).format('YY') + ws
                    break;
                  default:
                    dateValue = `${dataFormat}-暂时没有做处理,请添加针对此格式的处理算法~`
                    break;
                }
                formItemConfig = {
                  value: dateValue,
                  label: currentTabRuleFields[i].ruleFieldName,
                  options: [],
                  formItemTypeCode: FormItemTypeEnum.FORM_ITEM_INPUT.CODE,
                  placeholder: '',
                  autoIncrementSequence: '',
                  autoIncrementSequence: '',
                  fillStrategy: '',
                  resetStrategy:''                  
                }
                break;
              //特殊处理字段类型是自增序列
              case RuleFieldTypeEnum.AUTO_INCREMENT_SEQUENCE.CODE:
                //获得当前的自增序列
                let autoIncrementSequence = JSON.parse(currentTabRuleFields[i].ruleFieldValue)
                //如果设置了重置策略，则对自增序列进行特殊处理
                if(currentTabRuleFields[i].ruleFieldResetStrategy != null) {
                  //在动态生成表单时先判断当前时间是不是新的一周，如果是的话，就把自增序列重置为0
                  //获取当前方案下当前规则最后一批次生成的条码
                  const getLastBatchGenerateBarCodesBySchemeIdAndRuleIdResponse = await getLastBatchGenerateBarCodesBySchemeIdAndRuleId(conditions)
                  //为真说明已经生成了条码
                  if(getLastBatchGenerateBarCodesBySchemeIdAndRuleIdResponse.data != null) {
                    const updateTime = dayjs(getLastBatchGenerateBarCodesBySchemeIdAndRuleIdResponse.data.createTime)
                    //根据当前方案下当前规则最新的更新时间获取下周一 00:00:00 时间
                    const day = updateTime.day()
                    let nextMonday = null
                    if(day == 0) {
                      nextMonday = updateTime.endOf('day').add(1,'second')
                    }else {
                      nextMonday = updateTime.endOf('week').add(1,'day').add(1,'second')
                    }
                    //针对自增序列重置策略进行自增策略重置处理
                    switch(currentTabRuleFields[i].ruleFieldResetStrategy) {
                      case 'EW' :{
                        //获取当前时间
                        const now = dayjs()
                        //如果当前时间大于 当前方案下当前规则最新的更新时间获取下周一时间  ,就重置自增序列的值为1
                        if(now>nextMonday) {
                          //更新后台规则字段表中自增序列中startSequence的值
                          updateRuleFieldValueAutoIncrementSequenceStartSequenceById({ id: currentTabRuleFields[i].id, startSequence: 1 })
                          //更新前台显示时自增序列的值
                          autoIncrementSequence.startSequence = 1
                        }
                        break;
                      }
                      default: {
                      }
                    }
                  }else {
                    //更新后台规则字段表中自增序列中startSequence的值
                    updateRuleFieldValueAutoIncrementSequenceStartSequenceById({ id: currentTabRuleFields[i].id, startSequence: 1 })
                    //更新前台显示时自增序列的值
                    autoIncrementSequence.startSequence = 1
                  }
                }
                //id 因为根据id更新startSequence最简单，所以这里针对自增序列，添加一个id字段
                autoIncrementSequence.id = currentTabRuleFields[i].id
                formItemConfig = {
                  value: '',
                  label: currentTabRuleFields[i].ruleFieldCategoryName,
                  options: [],
                  formItemTypeCode: FormItemTypeEnum.FORM_ITEM_AUTO_INCREMENT_SEQUENCE.CODE,
                  placeholder: '',
                  //自增序列
                  autoIncrementSequence: autoIncrementSequence,
                  //补齐策略
                  fillStrategy: JSON.parse(currentTabRuleFields[i].ruleFieldFillStrategy),
                  resetStrategy: currentTabRuleFields[i].ruleFieldResetStrategy
                }
                break;
              //如果是字段名称,直接给editTable中的barCodesName属性赋值
              case RuleFieldTypeEnum.BAR_CODE_NAME.CODE:
                editableTab.barCodeName = currentTabRuleFields[i].ruleFieldValue
                //这个对象所有属性的值全部置为空
                formItemConfig = {
                  value: '',
                  label: '',
                  options: [],
                  formItemTypeCode: '',
                  placeholder: '',
                  //自增序列
                  autoIncrementSequence: '',
                  //补齐策略
                  fillStrategy: '',
                  resetStrategy:''                  
                }
                break;
              default:
                formItemConfig = {}
                console.log('暂时不支持生成该类型的表单~')
                break;
            }
            formItemsConfig.push(formItemConfig)
          }
          editableTab.formItemsConfig = formItemsConfig
          //把每一个tab页面信息放入到所有的editableTabs页面信息中
          editableTabs.value.push(editableTab)
        }
      } catch (error) {
        console.log(error);
      }

      try {
        //每次查询前先清空数据
        generateTemplateOptions.value = []
        //查询为当前方案当前规则配置的所有的生成样式  
        const getTemplatesResponse = await getTemplates(conditions,templateInfo)
        if(getTemplatesResponse.data.code == '200') {
          const templates = getTemplatesResponse.data.data
          if(templates.length == 0) {
            // ElMessage({
            //   message: `没有为方案${conditions.schemeName}中的规则${conditions.ruleName}配置生成样式，将采用默认样式生成`,
            //   type: "error",
            //   plain: true,
            // });
          }
          templates.forEach(template => {
            generateTemplateOptions.value.push({label:template.templateName,value:template.templateContent})
          })
        }
      } catch (error) {
        console.log(error);
      }
      
      //控制第一次打开tab时，从第几个tab页中开始显示内容，如果设置为，打开后第一个tab标签页中内容为空
      currentEditableTabIndex.value = 1
      //设置所有下拉框的默认选中状态
      //editableTabs.value[0].formItemsConfig[1].options[1].asDefault = true
    };


    /**
     * 自增序列格式化，不足长度的部分使用指定字符填充
     * 可实现 对进制、填充使用的字符、填充长度、填充方向的指定
     * @param dec         十进制数
     * @param binary      转换后的进制 10 或者 16
     * @param len         填充完成后总长度
     * @param char        字符
     * @param direction   填充方向 'l' 或 'r'
     */
    const formatAutoIncrementSequence = (dec, binary, len, char, direction) => {
      var target = "";
      //如果目标格式是16进制
      if (binary === '16') {
        while (dec) {
          var last = dec & 15;
          target = String.fromCharCode((last > 9 ? 55 : 48) + last) + target;
          dec >>= 4;
        }
      }
      //如果目标格式是10进制
      if (binary === '10') {
        target = dec
      }
      if (len) {
        while ((target + '').length < len) {
          target = direction == 'l' ? char + target : target + char;
        }
      }
      return target;
    }


    //条码实体模板(后台需要的对象格式)
    const BARCODES_TEMPLATE_FOR_BACKEND = {
      //与该条条码相互关联的方案的唯一标识
      schemeId: null,
      //方案名称
      schemeName: null,
      //与该条条码相互关联的规则的唯一标识
      ruleId: null,
      //规则名称
      ruleName: null,
      //生成批次id
      batchId: null,
      //条码值
      barCodesValue: null,
      //生成数量
      batchAmount: null,
      //创建时间
      createTime: null,
    }

    //存放本批次生成的所有条码值
    const currentBatchGenerateBarCodesValueList = ref([])
    //存放本次生成条码页面打开期间生成的所有条码
    const currentBatchGenerateBarCodesValueHistoryList = ref([])

    //存放上个批次生成的所有条码值
    const previousBatchGenerateBarCodesValueList = ref([])

    //监控本批次生成的所有条码值的变化，把最新的值存放在一个新的数组中，这样给用户展示比较友好
    const currentBatchGenerateBarCodesValueForUserShowList = ref([])

    //监控本批次生成的所有条码值的变化，把最新的值存放在一个新的数组中，这样给用户展示比较友好
    const previousBatchGenerateBarCodesValueForUserShowList = ref([])

    /**
     * 生成并保存条码
     */   
    const handleAddBarCodes = async () => {
      //生成前先进行表单校验，下拉选择框如果没有选择，就不允许用户点击生成按钮
      //每次生成条码之前先清空currentBatchGenerateBarCodesValueList
      currentBatchGenerateBarCodesValueList.value = []
      //拼接出一个值为空条码对象
      const barCodes = {}
      editableTabs.value.map(editableTab => {
        barCodes[editableTab.barCodeName] = null
      })
      //拼接出barCodesValueList数组，但是这个数组中的每一个对象的key对应的值都是null
      for (let i = 0; i < generateNums.value; i++) {
        currentBatchGenerateBarCodesValueList.value.push(deepClone(barCodes))
      }  

      // //遍历所有Tab页,拼接出一个json格式的条码对象，key是条码名称，值是条码值，如 {EUI:'XXXX',SN:'XXX'}
      // editableTabs.value.forEach((editableTab, editableTabIndex) => {
      //   //遍历当前editableTab
      //   for (let i = 0; i < generateNums.value; i++) {
      //     //当前正在编辑的Tab页的所有表单项的值拼接起来的结果
      //     let currentEditableTabFormValue = ''
      //     editableTab.formItemsConfig.forEach((formItemConfig, formFiedIndex) => {
      //       switch (formItemConfig.formItemTypeCode) {
      //         //处理输入框
      //         case FormItemTypeEnum.FORM_ITEM_INPUT.CODE:
      //           currentEditableTabFormValue += formItemConfig.value
      //           break;
      //         //处理下拉选择
      //         case FormItemTypeEnum.FORM_ITEM_SELECT.CODE:
      //           const option = formItemConfig.options.filter(option => option.value == formItemConfig.value)
      //           currentEditableTabFormValue += option[0].label
      //           break;
      //         //处理级联选择
      //         case FormItemTypeEnum.FORM_ITEM_CASCADER.CODE:
      //           currentEditableTabFormValue += formItemConfig.value[formItemConfig.value.length - 1]
      //           break;
      //         //处理自增序列
      //         case FormItemTypeEnum.FORM_ITEM_AUTO_INCREMENT_SEQUENCE.CODE:
      //           //获取自增序列信息
      //           const autoIncrementSequence = formItemConfig.autoIncrementSequence
      //           //获取补齐信息
      //           const fillStrategy = formItemConfig.fillStrategy
      //           //拼接出指定格式的自增序列
      //           const formatAutoIncrementSequencePart = formatAutoIncrementSequence(autoIncrementSequence.startSequence + i, autoIncrementSequence.binary, fillStrategy.length, fillStrategy.character, fillStrategy.direction)
      //           currentEditableTabFormValue += formatAutoIncrementSequencePart
      //           //每生成一次条码，起始序列就自增加一个序列步长 的值
      //           //autoIncrementSequence.startSequence = autoIncrementSequence.startSequence + autoIncrementSequence.step
      //           break;
      //         default:
      //           break;
      //       }
      //     })
      //     currentBatchGenerateBarCodesValueList.value[i][[editableTab.barCodeName]] = currentEditableTabFormValue
      //   }
      // })

      editableTabs.value.forEach((editableTab,editableTabIndex) => {
        //遍历当前editableTab
        for (let i = 0; i < generateNums.value; i++) {
          //当前正在编辑的Tab页的所有表单项的值拼接起来的结果
          let currentEditableTabFormValue = []
          editableTab.formItemsConfig.forEach((formItemConfig,formItemConfigIndex) => {
            switch (formItemConfig.formItemTypeCode) {
              //处理输入框
              case FormItemTypeEnum.FORM_ITEM_INPUT.CODE:
                //把当前表单项字段的值放入数组中，后面会用到
                currentEditableTabFormValue.push({ formItemFieldTypeName: `${formItemConfig.label}`, formItemFieldValue: `${formItemConfig.value}`,formItemFieldPlaceholder:`\$${editableTabIndex}${formItemConfigIndex}` })
                break;
              //处理下拉选择
              case FormItemTypeEnum.FORM_ITEM_SELECT.CODE:
                const option = formItemConfig.options.filter(option => option.value == formItemConfig.value)
                //把当前表单项字段的值放入数组中，后面会用到
                currentEditableTabFormValue.push({ formItemFieldTypeName: `${formItemConfig.label}`, formItemFieldValue: `${option[0].value}` })
                break;
              //处理级联选择
              case FormItemTypeEnum.FORM_ITEM_CASCADER.CODE:
                //把当前表单项字段的值放入数组中，后面会用到
                currentEditableTabFormValue.push({ formItemFieldTypeName: `${formItemConfig.label}`, formItemFieldValue: `${formItemConfig.value[formItemConfig.value.length - 1]}` })
                break;
              //处理自增序列
              case FormItemTypeEnum.FORM_ITEM_AUTO_INCREMENT_SEQUENCE.CODE:
                //获取自增序列信息
                const autoIncrementSequence = formItemConfig.autoIncrementSequence
                //获取补齐信息
                const fillStrategy = formItemConfig.fillStrategy
                //拼接出指定格式的自增序列
                const formatAutoIncrementSequencePart = formatAutoIncrementSequence(autoIncrementSequence.startSequence + i, autoIncrementSequence.binary, fillStrategy.length, fillStrategy.character, fillStrategy.direction)
                //把当前表单项字段的值放入数组中，后面会用到
                currentEditableTabFormValue.push({ formItemTypeName: formItemConfig.label, formItemFieldValue: formatAutoIncrementSequencePart })
                break;
              default:
                break;
            }
          })
          currentBatchGenerateBarCodesValueList.value[i][[editableTab.barCodeName]] = currentEditableTabFormValue
        }
      })

      //==========================================================================================
      //在生成前进行拦截,替换自定算法
      currentBatchGenerateBarCodesValueList.value.forEach(currentBatchGenerateBarCodesValueObject => {
        Object.keys(currentBatchGenerateBarCodesValueObject).forEach(key => {
          const currentBatchGenerateBarCodeValueFieldList = currentBatchGenerateBarCodesValueObject[key]
          //找到当前条码值中 自定义算法的 那个字段
          currentBatchGenerateBarCodeValueFieldList.forEach((currentBatchGenerateBarCodeValueField, index) => {
            if (currentBatchGenerateBarCodeValueField.formItemFieldTypeName == '自定算法') {
              //这个自定义算法之前所有的表单项字段
              const previousCurrentBatchGenerateBarCodeValueFieldList = currentBatchGenerateBarCodeValueFieldList.slice(0, index);
              //算法名称
              const ALGORITHM_NAME = currentBatchGenerateBarCodeValueField.formItemFieldValue;
              //使用从 algorithm.js 中导入的自定义算法
              if (CUSTOM_ALGORITHM[ALGORITHM_NAME]) {
                //使用call实现类似于java反射的动态调用方法
                currentBatchGenerateBarCodeValueField.formItemFieldValue
                  = CUSTOM_ALGORITHM[ALGORITHM_NAME].call(CUSTOM_ALGORITHM, previousCurrentBatchGenerateBarCodeValueFieldList);
              } else {
                ElMessage({
                  message: "请检查字典管理->字典数据->高级元素->自定算法 中配置的算法信息是否正确",
                  type: "error",
                  plain: true,
                });
              }
            }
          })
        })
      })
      //==========================================================================================

      //拼接后台所需要的barCodes
      let barCodesForBackend = deepClone(BARCODES_TEMPLATE_FOR_BACKEND)
      barCodesForBackend.schemeId = conditions.schemeId
      barCodesForBackend.schemeName = conditions.schemeName
      barCodesForBackend.ruleId = conditions.ruleId
      barCodesForBackend.ruleName = conditions.ruleName
      barCodesForBackend.batchAmount = currentBatchGenerateBarCodesValueList.value.length
      barCodesForBackend.barCodesValue = JSON.stringify(currentBatchGenerateBarCodesValueList.value)

      //获取方案id和规则id
      const response = await addBarCodes(JSON.stringify(barCodesForBackend))
      if (response.code == 200) {
        //设置列表数据
        // schemeList.value = response.data.list
        //设置分页总页数
        // pagingParameters.total = response.data.total
        ElMessage({
          message: "批量存储条码成功",
          type: "success",
          plain: true,
        });

        //把本次生成结果添加到历史生成记录中
        currentBatchGenerateBarCodesValueHistoryList.value.push(currentBatchGenerateBarCodesValueList.value)
        //从历史生成记录中获取上一次生成的条码，放在条码预览区的上次生成条码中
        previousBatchGenerateBarCodesValueList.value =
          currentBatchGenerateBarCodesValueHistoryList.value.length - 1 > 0 ? currentBatchGenerateBarCodesValueHistoryList.value[currentBatchGenerateBarCodesValueHistoryList.value.length - 2] : []

        //遍历ediTables,找出其中所有的自增序列,根据id更新后台数据库自增序列的起始序号的值，
        //单独的处理自增序列是因为如何序列每发生一次变化，就同步一次数据库，会非常影响效率，如果一次生成了一万个条码，生成一次就要同步一万次数据库，所以这里单独处理自增序列
        editableTabs.value.forEach(editableTab => {
          editableTab.formItemsConfig.forEach(formItemConfig => {
            if (formItemConfig.formItemTypeCode == FormItemTypeEnum.FORM_ITEM_AUTO_INCREMENT_SEQUENCE.CODE) {
              //获取autoIncrementSequence
              const autoIncrementSequence = formItemConfig.autoIncrementSequence
              //修改autoIncrementSequence中startSequence的值
              autoIncrementSequence.startSequence += currentBatchGenerateBarCodesValueList.value.length * autoIncrementSequence.step
              //更新规则字段表中自增序列中startSequence的值
              updateRuleFieldValueAutoIncrementSequenceStartSequenceById({ id: autoIncrementSequence.id, startSequence: autoIncrementSequence.startSequence })
            }
          })
        })
      } else {
        ElMessage({
          message: "批量存储条码失败",
          type: "error",
          plain: true,
        });
      }
    }

    /**
     * 撤销上次生成条码操作
     */
    const handleUndoAddBarCodesBatch = async () => {
      //执行撤销操作(逻辑删除撒上次生成的数据)
      const response = await undoAddBarCodes()
      if (response.status === 200) {
        ElMessage({
          message: "撤销上次生成的条码成功",
          type: "success",
          plain: true,
        });
      }
      //修改历史生成记录中存放的数据(弹出数组中最后一个元素)，这个弹出的最后一个元素就是最新一次操作生成的代码,并且保存这个弹出的结果，在下面用
      const currentBatchBarCodesValueListDeleted = currentBatchGenerateBarCodesValueHistoryList.value.length == 0 ? [] : currentBatchGenerateBarCodesValueHistoryList.value.pop();
      //遍历ediTables,找出其中所有的自增序列,根据id更新后台数据库自增序列的起始序号的值
      editableTabs.value.forEach(editableTab => {
        editableTab.formItemsConfig.forEach(formItemConfig => {
          if (formItemConfig.formItemTypeCode == FormItemTypeEnum.FORM_ITEM_AUTO_INCREMENT_SEQUENCE.CODE) {
            //获取autoIncrementSequence
            const autoIncrementSequence = formItemConfig.autoIncrementSequence
            //修改autoIncrementSequence中startSequence的值
            autoIncrementSequence.startSequence -= currentBatchBarCodesValueListDeleted.length * autoIncrementSequence.step
            //更新规则字段表中自增序列中startSequence的值
            updateRuleFieldValueAutoIncrementSequenceStartSequenceById({ id: autoIncrementSequence.id, startSequence: autoIncrementSequence.startSequence })
          }
        })
      })

      //如果历史生成记录中没有数据，按钮设置为禁用状态，同时停止执行下一步操作
      if (currentBatchGenerateBarCodesValueHistoryList.value.length == 0) {
        //清空本次生成条码数组
        currentBatchGenerateBarCodesValueList.value = []
        //修改撤销生成按钮的禁用状态
        undoAddBarCodesBatchButtonState.value = true
        return
      }
      //修改条码预览区展示的本批次生成条码数据
      currentBatchGenerateBarCodesValueList.value =
        currentBatchGenerateBarCodesValueHistoryList.value.length > 0 ? currentBatchGenerateBarCodesValueHistoryList.value[currentBatchGenerateBarCodesValueHistoryList.value.length - 1] : []
      //修改条码预览区展示的上批次生成条码数据
      previousBatchGenerateBarCodesValueList.value =
        currentBatchGenerateBarCodesValueHistoryList.value.length - 1 > 0 ? currentBatchGenerateBarCodesValueHistoryList.value[currentBatchGenerateBarCodesValueHistoryList.value.length - 2] : []
    }

    //监控currentBatchGenerateBarCodesValueList的变化，实时生成一个新的数组，这个数组中展示的格式是专用来在页面上展示数据的格式
    watch(() => currentBatchGenerateBarCodesValueList.value, (newValue, oldValue) => {
      //每次展示之前清除上一次的数据
      currentBatchGenerateBarCodesValueForUserShowList.value = []
      const templateContent = conditions.templateContent
      if(templateContent == null) {
        newValue.forEach(currentBatchGenerateBarCodesValue => {
          const currentBatchGenerateBarCodesValueForUser = []
          Object.keys(currentBatchGenerateBarCodesValue).forEach(key => {
            let currentBatchGenerateBarCodesValueForUserPart = ''
            currentBatchGenerateBarCodesValue[key].forEach(currentBatchGenerateBarCodeValueField => {
              currentBatchGenerateBarCodesValueForUserPart += currentBatchGenerateBarCodeValueField.formItemFieldValue
            })
            currentBatchGenerateBarCodesValueForUserPart = key + ':' + currentBatchGenerateBarCodesValueForUserPart
            currentBatchGenerateBarCodesValueForUser.push(currentBatchGenerateBarCodesValueForUserPart)
          })
          currentBatchGenerateBarCodesValueForUserShowList.value.push(currentBatchGenerateBarCodesValueForUser.join(';'))
        })
      }else {
        newValue.forEach(currentBatchGenerateBarCodesValue => {
          const currentBatchGenerateBarCodesValueFieldList = []
          Object.keys(currentBatchGenerateBarCodesValue).forEach((key,index) => {
            currentBatchGenerateBarCodesValueFieldList.push({key:[`#{barCodeName-${index+1}}`],value:key})
            Object.keys(currentBatchGenerateBarCodesValue[key]).forEach((key_,index_) => {
              currentBatchGenerateBarCodesValueFieldList.push({key:[`#{${index+1}-${index_+1}}`],value:currentBatchGenerateBarCodesValue[key][key_].formItemFieldValue})
            })
          })
          //执行替换操作
          let templateContent_ = deepClone(templateContent)
          currentBatchGenerateBarCodesValueFieldList.forEach(currentBatchGenerateBarCodesValueField => {
            templateContent_ = templateContent_.replaceAll(currentBatchGenerateBarCodesValueField.key,currentBatchGenerateBarCodesValueField.value)
          })
          currentBatchGenerateBarCodesValueForUserShowList.value.push(templateContent_)
        })
      }
      //校验templateContent格式
      //根据格式生成

      // newValue.forEach(currentBatchGenerateBarCodesValue => {
      //   const currentBatchGenerateBarCodesValueForUser = []
      //   Object.keys(currentBatchGenerateBarCodesValue).forEach(key => {
      //     let currentBatchGenerateBarCodesValueForUserPart = ''
      //     currentBatchGenerateBarCodesValue[key].forEach(currentBatchGenerateBarCodeValueField => {
      //       currentBatchGenerateBarCodesValueForUserPart += currentBatchGenerateBarCodeValueField.formItemFieldValue
      //     })
      //     currentBatchGenerateBarCodesValueForUserPart = key + ':' + currentBatchGenerateBarCodesValueForUserPart
      //     currentBatchGenerateBarCodesValueForUser.push(currentBatchGenerateBarCodesValueForUserPart)
      //   })
      //   currentBatchGenerateBarCodesValueForUserShowList.value.push(currentBatchGenerateBarCodesValueForUser.join(';'))
      // })

      // switch (getSchemeNameSimpleFormatEnglishByChinese(conditions.schemeName)) {
      //   //如果方案是 上海松江燃气，使用这个逻辑进行展示
      //   case 'SHSJRQ': {
      //     newValue.forEach(currentBatchGenerateBarCodesValue => {
      //       const currentBatchGenerateBarCodesValueForUser = []
      //       Object.keys(currentBatchGenerateBarCodesValue).forEach(key => {
      //         let currentBatchGenerateBarCodesValueForUserPart = ''
      //         currentBatchGenerateBarCodesValue[key].forEach(currentBatchGenerateBarCodeValueField => {
      //           currentBatchGenerateBarCodesValueForUserPart += currentBatchGenerateBarCodeValueField.formItemFieldValue
      //         })
      //         currentBatchGenerateBarCodesValueForUserPart = key + ':' + currentBatchGenerateBarCodesValueForUserPart
      //         currentBatchGenerateBarCodesValueForUser.push(currentBatchGenerateBarCodesValueForUserPart)
      //       })
      //       currentBatchGenerateBarCodesValueForUserShowList.value.push(currentBatchGenerateBarCodesValueForUser.join(';'))
      //     })
      //     break;
      //   }
      //   case 'XXXX': {
      //     break;
      //   }
      //   default: {
      //     newValue.forEach(currentBatchGenerateBarCodesValue => {
      //       const currentBatchGenerateBarCodesValueForUser = []
      //       Object.keys(currentBatchGenerateBarCodesValue).forEach(key => {
      //         let currentBatchGenerateBarCodesValueForUserPart = ''
      //         currentBatchGenerateBarCodesValue[key].forEach(currentBatchGenerateBarCodeValueField => {
      //           currentBatchGenerateBarCodesValueForUserPart += currentBatchGenerateBarCodeValueField.formItemFieldValue
      //         })
      //         currentBatchGenerateBarCodesValueForUserPart = key + ':' + currentBatchGenerateBarCodesValueForUserPart
      //         currentBatchGenerateBarCodesValueForUser.push(currentBatchGenerateBarCodesValueForUserPart)
      //       })
      //       currentBatchGenerateBarCodesValueForUserShowList.value.push(currentBatchGenerateBarCodesValueForUser.join(';'))
      //     })
      //     break;
      //   }
      // }





      //旧版逻辑
      // switch (getSchemeNameSimpleFormatEnglishByChinese(conditions.schemeName)) {
      //   //如果方案是 上海松江燃气，使用这个逻辑进行展示
      //   case 'SHSJRQ': {
      //     newValue.forEach(currentBatchGenerateBarCodesValue => {
      //       const currentBatchGenerateBarCodesValueForUser = []
      //       Object.keys(currentBatchGenerateBarCodesValue).forEach(key => {
      //         let currentBatchGenerateBarCodesValueForUserPart = ''
      //         currentBatchGenerateBarCodesValue[key].forEach(currentBatchGenerateBarCodeValueField => {
      //           currentBatchGenerateBarCodesValueForUserPart += currentBatchGenerateBarCodeValueField.formItemFieldValue
      //         })
      //         currentBatchGenerateBarCodesValueForUserPart = key + ':' + currentBatchGenerateBarCodesValueForUserPart
      //         currentBatchGenerateBarCodesValueForUser.push(currentBatchGenerateBarCodesValueForUserPart)
      //       })
      //       currentBatchGenerateBarCodesValueForUserShowList.value.push(currentBatchGenerateBarCodesValueForUser.join(';'))
      //     })
      //     break;
      //   }
      //   case 'XXXX': {
      //     break;
      //   }
      //   default: {
      //     newValue.forEach(currentBatchGenerateBarCodesValue => {
      //       const currentBatchGenerateBarCodesValueForUser = []
      //       Object.keys(currentBatchGenerateBarCodesValue).forEach(key => {
      //         let currentBatchGenerateBarCodesValueForUserPart = ''
      //         currentBatchGenerateBarCodesValue[key].forEach(currentBatchGenerateBarCodeValueField => {
      //           currentBatchGenerateBarCodesValueForUserPart += currentBatchGenerateBarCodeValueField.formItemFieldValue
      //         })
      //         currentBatchGenerateBarCodesValueForUserPart = key + ':' + currentBatchGenerateBarCodesValueForUserPart
      //         currentBatchGenerateBarCodesValueForUser.push(currentBatchGenerateBarCodesValueForUserPart)
      //       })
      //       currentBatchGenerateBarCodesValueForUserShowList.value.push(currentBatchGenerateBarCodesValueForUser.join(';'))
      //     })
      //     break;
      //   }
      // }
    }, { deep: true })

    //监控previousBatchGenerateBarCodesValueList的变化，实时生成一个新的数组，这个数组中展示的格式是专用来在页面上展示数据的格式
    watch(() => previousBatchGenerateBarCodesValueList.value, (newValue, oldValue) => {
      //每次展示之前清除上一次的数据
      previousBatchGenerateBarCodesValueForUserShowList.value = []
      
      const templateContent = conditions.templateContent
      if(templateContent == null) {
        newValue.forEach(previousBatchGenerateBarCodesValue => {
          const currentBatchGenerateBarCodesValueForUser = []
          Object.keys(previousBatchGenerateBarCodesValue).forEach(key => {
            let previousBatchGenerateBarCodesValueForUserPart = ''
            previousBatchGenerateBarCodesValue[key].forEach(previousBatchGenerateBarCodeValueField => {
              previousBatchGenerateBarCodesValueForUserPart += previousBatchGenerateBarCodeValueField.formItemFieldValue
            })
            previousBatchGenerateBarCodesValueForUserPart = key + ':' + previousBatchGenerateBarCodesValueForUserPart
            currentBatchGenerateBarCodesValueForUser.push(previousBatchGenerateBarCodesValueForUserPart)
          })
          previousBatchGenerateBarCodesValueForUserShowList.value.push(currentBatchGenerateBarCodesValueForUser.join(';'))
        })
      }else {
        newValue.forEach(previousBatchGenerateBarCodesValue => {
          const previousBatchGenerateBarCodesValueForUser = []
          Object.keys(previousBatchGenerateBarCodesValue).forEach(key => {
            let previousBatchGenerateBarCodesValueForUserPart = ''
            previousBatchGenerateBarCodesValue[key].forEach(previousBatchGenerateBarCodeValueField => {
              previousBatchGenerateBarCodesValueForUserPart += previousBatchGenerateBarCodeValueField.formItemFieldValue
            })
            previousBatchGenerateBarCodesValueForUserPart = key + ':' + previousBatchGenerateBarCodesValueForUserPart
            previousBatchGenerateBarCodesValueForUser.push(previousBatchGenerateBarCodesValueForUserPart)
          })
          previousBatchGenerateBarCodesValueForUserShowList.value.push(previousBatchGenerateBarCodesValueForUser.join(';'))
        })
      }
      
      
      
      
      //旧版逻辑
      // switch (getSchemeNameSimpleFormatEnglishByChinese(conditions.schemeName)) {
      //   //如果方案是 上海松江燃气，使用这个逻辑进行展示
      //   case 'SHSJRQ': {
      //     newValue.forEach(previousBatchGenerateBarCodesValue => {
      //       const previousBatchGenerateBarCodesValueForUser = []
      //       Object.keys(previousBatchGenerateBarCodesValue).forEach(key => {
      //         let previousBatchGenerateBarCodesValueForUserPart = ''
      //         previousBatchGenerateBarCodesValue[key].forEach(previousBatchGenerateBarCodeValueField => {
      //           previousBatchGenerateBarCodesValueForUserPart += previousBatchGenerateBarCodeValueField.formItemFieldValue
      //         })
      //         previousBatchGenerateBarCodesValueForUserPart = key + ':' + previousBatchGenerateBarCodesValueForUserPart
      //         previousBatchGenerateBarCodesValueForUser.push(previousBatchGenerateBarCodesValueForUserPart)
      //       })
      //       previousBatchGenerateBarCodesValueForUserShowList.value.push(previousBatchGenerateBarCodesValueForUser.join(';'))
      //     })
      //   }
      //   case 'XXXX': {
      //     break;
      //   }
      //   default: {
      //     newValue.forEach(previousBatchGenerateBarCodesValue => {
      //       const previousBatchGenerateBarCodesValueForUser = []
      //       Object.keys(previousBatchGenerateBarCodesValue).forEach(key => {
      //         let previousBatchGenerateBarCodesValueForUserPart = ''
      //         previousBatchGenerateBarCodesValue[key].forEach(previousBatchGenerateBarCodeValueField => {
      //           previousBatchGenerateBarCodesValueForUserPart += previousBatchGenerateBarCodeValueField.formItemFieldValue
      //         })
      //         previousBatchGenerateBarCodesValueForUserPart = key + ':' + previousBatchGenerateBarCodesValueForUserPart
      //         previousBatchGenerateBarCodesValueForUser.push(previousBatchGenerateBarCodesValueForUserPart)
      //       })
      //       previousBatchGenerateBarCodesValueForUserShowList.value.push(previousBatchGenerateBarCodesValueForUser.join(';'))
      //     })
      //   }
      // }

    }, { deep: true })


    //监控barCodesValueListHistory的变化，如果该数组长度为0，则禁用撤销生成按钮,不为0，撤销生成按钮就可以使用
    watch(() => currentBatchGenerateBarCodesValueHistoryList, (newValue, oldValue) => {
      newValue.value.length == 0 ? undoAddBarCodesBatchButtonState.value = true : undoAddBarCodesBatchButtonState.value = false
    }, { deep: true })

    //监听父组件传递过来的 barCodesGeneratorDialogVisible的变化，通过这个来确定弹窗是否是打开状态
    //每次弹窗关闭时清空历史生成记录数组
    watch(() => props.barCodesGeneratorDialogVisible, (val) => {
      // TODO 这里模拟用户点击下拉框
      if(val) {
        mockUserClik()
      }
      if (!val) {
        //每次弹窗关闭时清空历史生成记录数组中数据
        currentBatchGenerateBarCodesValueHistoryList.value = []
        //清空本次生成条码中数据
        currentBatchGenerateBarCodesValueForUserShowList.value = []
        //清空上次生成条码中数据
        previousBatchGenerateBarCodesValueForUserShowList.value = []
        //清空方案和规则下拉框选中信息
        Object.keys(conditions).forEach(key => {
          conditions[key] = ""
        })
        //清空editableTabs中数据
        editableTabs.value = []
        //TODO刷新条码列表
        //每次弹窗关闭将本次生成数量设置为0
        generateNums.value = 0
      }
    })

    //监视editableTabs的值的变化，以此来确定 生成条码 按钮是否可以被点击
    watch(editableTabs,((newValue,oldValue) => {
      if(newValue.length != 0) {
        //所有的下拉框是否都进行了选择
        let allDropDownSelectIsSelected = true
        newValue.forEach(editableTab => {
          editableTab.formItemsConfig.forEach(formItemConfig => {
            //筛选出所有的下拉框
            if(formItemConfig.formItemTypeCode == RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE){
              allDropDownSelectIsSelected = allDropDownSelectIsSelected && formItemConfig.value != ''
              if(!allDropDownSelectIsSelected) {
                return
              }
            }
          })
        })
        addBarCodesBatchButtonState.value = !allDropDownSelectIsSelected
      }
    }),{deep:true})

    //所有生成的下拉框表单项中默认选中状态发生了改变
    const handleDefaultSelectedChange = (options,value)=> {
      options.filter(option => option.value != value)
        .map(option => {
          option.asDefault = false
        })

        editableTabs.value.forEach((editableTab,editableTabIndex) => {
          editableTab.formItemsConfig.forEach((formItemConfig,formItemConfigIndex) => {
            //筛选出所有的下拉框
            if(formItemConfig.formItemTypeCode == RuleFieldTypeEnum.DROPDOWN_SELECT_INPUT.CODE){
              formItemConfig.options.forEach((option,optionIndex) => {
                if(option.asDefault == true) {
                  //console.log(conditions.schemeId + '--' + conditions.ruleId + '--' + editableTabIndex + '--' + formItemConfigIndex + '--' + optionIndex);
                }
              })
            }
          })
        })
    }

    /* 获取厂商ID */
    const getMFID = (euiInfo) => {
      if(typeof euiInfo != 'undefined') {
        return '厂商编号：' + euiInfo.formItemsConfig[0].value
      }
    }
    /* 获取型号信息 */
    const getModelInfo = (euiInfo) => {
      if(typeof euiInfo != 'undefined') {
        let modelName = null
        //获取模块id
        const modelId = euiInfo.formItemsConfig[1].value
        switch (modelId) {
          case '01':
            modelName = '8BIT-LW01H'
            break;
          default:
            modelName = '8BIT-LW01H'
            break;
        }
        return '型号信息：' + modelName
      }
    }
    /* 获取工厂编号 */
    const getFactoryNumber = (euiInfo) => {
      if(typeof euiInfo != 'undefined') {
        return '工厂编号：' + euiInfo.formItemsConfig[2].value.substring(0,1)
      }
    }
    /* 获取工位编号 */
    const getStationNumber = (euiInfo) => {
      if(typeof euiInfo != 'undefined') {
        return '工位编号：' + euiInfo.formItemsConfig[2].value.substring(1)
      }
    }
    /* 获取生产日期 */
    const getMFD = (snInfo) => {
      if(typeof snInfo != 'undefined') {
        //获取生产日期
        const mfd = snInfo.formItemsConfig[4].value
        const year = mfd.substring(0,2)
        const week = mfd.substring(2)
        return '生产日期：' + year + '年第' + Number(week)  + '周'
      }
    }
    /* 本周已生产数量 */
    const getThisAlreadyProduced = (euiInfo)=> {
      if(typeof euiInfo != 'undefined') {
        return '本周已生产数量:' + (euiInfo.formItemsConfig[5].autoIncrementSequence.startSequence - 1)
      }
    }
    return {
      schemeOptions,
      ruleOptions,
      handleSchemeOptionsChange,
      handleRuleOptionsChange,
      conditions,
      FormItemTypeEnum,
      currentEditableTabIndex,
      editableTabs,
      handleAddBarCodes,
      handleUndoAddBarCodesBatch,
      currentBatchGenerateBarCodesValueList,
      previousBatchGenerateBarCodesValueList,
      currentBatchGenerateBarCodesValueForUserShowList,
      previousBatchGenerateBarCodesValueForUserShowList,
      labelWidth,
      cascaderStyle,
      generateNums,
      undoAddBarCodesBatchButtonState,
      currentBatchGenerateBarCodesValueHistoryList,
      addBarCodesBatchButtonState,
      handleDefaultSelectedChange,
      generateTemplateOptions,
      templateInfo,
      getMFID,
      getModelInfo,
      getFactoryNumber,
      getStationNumber,
      getMFD,
      getThisAlreadyProduced
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
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  list-style: none;
  overflow-y: scroll;
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
  height: 32px;
  line-height: 32px;
}

/* .el-radio-button {
  width: 110px;
} */
</style>