<template>
  <el-dialog v-model="barCodesGeneratorDialogVisible" title="生成条码" width="80%" top="100px">
    <div class="dialog">
      <BarCodesGenerator :barCodesGeneratorDialogVisible="barCodesGeneratorDialogVisible"/>
    </div>
  </el-dialog>
  <el-dialog v-model="barCodesHistoryGeneratorDialogVisible" title="预览本批次生成条码" width="50%" top="100px">
    <div class="dialog">
      <BarCodesHistoryGeneratePreview :currentSelectdRowData="currentSelectdRowData"
        :barCodesHistoryGeneratorDialogVisible="barCodesHistoryGeneratorDialogVisible" />
    </div>
  </el-dialog>
  <el-row style="padding-left: 20px;padding-right: 20px;padding-top: 20px;">
    <el-col :span="2">
      <el-button type="success" plain @click="handleOpenBarCodesGeneratorDialog">生成条码</el-button>
    </el-col>
    <!-- TODO 这里暂时注释掉了 -->
    <!-- 
    <el-col :span="5">
      <el-form-item label="选择方案">
        <el-select clearable v-model="conditions.schemeId" placeholder="请选择方案" @change="handleSchemeOptionsChange">
          <el-option v-for="(schemeOption, index) in schemeOptions" :key="index" :label="schemeOption.label"
            :value="schemeOption.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    <el-col :span="1"></el-col>
    <el-col :span="5">
      <el-form-item label="选择规则">
        <el-select clearable v-model="conditions.ruleId" placeholder="请选择条码生成规则" @change="handleRuleOptionsChange">
          <el-option v-for="(ruleOption, index) in ruleOptions" :key="index" :label="ruleOption.label"
            :value="ruleOption.value" :disabled="ruleOption.disabled">
            <span style="float: left">{{ ruleOption.label }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>
    -->
  </el-row>
  <el-row style="padding-left: 20px;padding-right: 20px;">
    <!-- 展示条码列表开始 -->
    <el-table :data="barCodesList" :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }" style="height: 650px;">
      <el-table-column type="index" />
      <el-table-column property="schemeName" label="所属方案" />
      <el-table-column property="ruleName" label="所属规则" />
      <el-table-column property="batchId" label="批次编号" />
      <el-table-column property="batchAmount" label="本批次生成数量" />
      <el-table-column property="createTime" :formatter="dateFormatter" sortable label="生成时间" />
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button link type="primary" @click="handleOpenPreviewBarCodesDialog(scope.row)">
            预览条码
          </el-button>
          <el-button link type="primary" @click="handleExportBarCodes(scope.row)">导出条码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <el-pagination v-model:current-page="pagingParameters.currentPage" v-model:page-size="pagingParameters.pageSize"
        :page-sizes="[5, 10, 20, 50]" layout="total, sizes, prev, pager, next, jumper"
        :total="pagingParameters.total" @size-change="handlePageSizeChange" @current-change="handleCurrentChange" />
    </div>
  </el-row>
  <!-- <el-row>
    <el-col :span="6" class="pd10-lr dark-border">
      <div>
        <h1 class="tac">EUI编码生成区</h1>
      </div>
      <div>
        <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          filterable
          @change="handleCascaderChange"
          style="width: 100%"
          placeholder="请选择或搜索EUI条码字段"
          clearable
        />
      </div>
      <div class="mt5">
        <el-table
          :data="fieldList"
          style="width: 100%"
          height="300px"
          max-height="300px"
          :cell-style="{ textAlign: 'center' }"
          :header-cell-style="{ textAlign: 'center' }"
          background="#FFFFFF"
          border
        >
          <el-table-column prop="fieldLable" label="字段描述" />
          <el-table-column prop="fieldValue" label="字段值" />
          <el-table-column fixed="right" label="操作">
            <template v-slot="scope">
              <el-button
                link
                type="primary"
                @click="handleDeleteField(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div
        class="mt5 font-b"
        style="background-color: #ffffff; font-size: 15px"
      >
        <div>当前数据库中序列 {{ currentSequence }}</div>
        <div>下次生成开始序列 {{ nextGenerateSequence }}</div>
        <div>当前数据库中地址 {{ currentSequenceHex }}</div>
        <div>下次生成开始地址 {{ nextGenerateSequenceHex }}</div>
      </div>
      <div>
        设置生成/预览数量
        <el-input-number
          v-model="generateQRCodeNum"
          class="mx-4"
          :min="1"
          :max="1099511627775"
          controls-position="right"
          @change="handleInputNumberChange"
        />
      </div>
      <div>
        <button @click="handlePreviewQRCode">预览二维码</button>
      </div>
      <div>
        <button @click="handleGenerateQRCode">生成二维码</button>
      </div>
    </el-col>
    <el-col :span="18" style="height: 500px" class="pd10-lr page-background">
      <div style="width: 100%; height: 500px" id="printTable">
        <h1 class="tac">二维码预览区</h1>
        <div
          style="display: inline-block; float: left; font-size: 12px"
          v-for="(qrCodeInfo, index) in qrCodeInfoList"
          :key="index"
        >
          <div>
            <img :src="qrCodeInfo.url" alt="QR Code" />
          </div>
          <div>EUI:{{ qrCodeInfo.eui }}</div>
        </div>
      </div>
    </el-col>
  </el-row> -->

  <!-- <div class="btn">
    <el-button type="primary" v-print="'#printTable'">打印</el-button>
  </div> 
  import QRCode from "qrcode";
  -->
</template>

<script>
import { watch, ref, reactive, onMounted,onUnmounted } from "vue";
import BarCodesGenerator from '@/views/BarCodesGenerator.vue'
import BarCodesHistoryGeneratePreview from '@/views/BarCodesHistoryGeneratePreview.vue'
import { getBarCodesPagination } from '@/api/barCodes.js'
import { getSchemesForSelectInput } from '@/api/scheme.js'
import { getRulesBySchemeIdForSelect } from "@/api/rule.js";
import { ElMessage } from "element-plus";
//格式化日期插件
import dayjs from 'dayjs';
//导出输入到excel组件
import * as XLSX from 'xlsx'
import { cache } from "@/commons/cache.js";

export default {
  name: "BarCodesList",
  components: {
    BarCodesGenerator,
    BarCodesHistoryGeneratePreview,
  },
  setup() {

    //条码生成页面显示与隐藏
    const barCodesGeneratorDialogVisible = ref(false)
    const handleOpenBarCodesGeneratorDialog = () => {
      barCodesGeneratorDialogVisible.value = true
    }
    //历史生成的条码预览界面
    const barCodesHistoryGeneratorDialogVisible = ref(false)
    //条码列表
    const barCodesList = ref([])

    //封装分页参数
    const pagingParameters = reactive({
      currentPage: 1,
      pageSize: 10,
      total: 0
    })

    const conditions = reactive({
      schemeId: null,
      ruleId: null,
    });

    //方案下拉框数据
    const schemeOptions = ref([])
    //规则下拉框数据
    const ruleOptions = ref([])

    //查询方案下拉框数据
    const getSchemesOptions = async () => {
      try {
        //从数据库查询方案名称下拉框需要用到的数据
        const getSchemesResponse = await getSchemesForSelectInput()
        if(getSchemesResponse.code == 200) {
          //获取到了所有的方案列表
          const schemeList = getSchemesResponse.data
          //根据全部的方案列表数据封装方案名称下拉框需要用到的数据
          schemeList.forEach(scheme => {
            schemeOptions.value.push({ label: scheme.schemeName, value: scheme.schemeId })
          });
        }
      } catch (error) {
        console.log(error)
      }
    }
    //保存当前操作的行的数据
    const currentSelectdRowData = reactive({})

    //监听方案下拉框数据的变化
    const handleSchemeOptionsChange = async () => {
      //先清空方案下拉框所有选项，再重新查询
      ruleOptions.value = [];
      try {
        //获取当前选中的方案id，并根据方案id查询该方案下所有的条码生成规则
        const getRulesBySchemeIdResponse = await getRulesBySchemeIdForSelect(conditions.schemeId);
        //根据查询出来的数据封装条码生成规则下拉框需要的数据
        const rules = getRulesBySchemeIdResponse.data.data;
        rules.forEach(rule => {
          ruleOptions.value.push({ label: rule.ruleName, value: rule.ruleId, asDefault: false });
        });
      } catch (error) {
        console.log(error);
      }

      //根据方案id和规则id查看所有生成的条码
      //刷新条码列表
      refreshBarCodesList()
    };

    //监听规则下拉框数据变化
    const handleRuleOptionsChange = (value) => {
      // ruleOptions.value.map(ruleOption => {
      //   ruleOption.value == value ? ruleOption.asDefault = true : ruleOption.asDefault = false
      // })
      //刷新条码列表
      refreshBarCodesList()
    }

    // watch(() => ruleOptions,(newValue,oldValue) => {
    //   newValue.value.forEach(ruleOption => {
    //     ruleOption.asDefault == true
    //   })
    // },{deep:true})

    /**
     * 刷新条码
     */
    const refreshBarCodesList = async () => {
      try {
        const queryParams = { ruleId: conditions.ruleId, schemeId: conditions.schemeId }
        //从数据中查询所有条码
        const response = await getBarCodesPagination(queryParams, pagingParameters)
        //设置列表数据
        barCodesList.value = response.data.list
        //设置分页总页数
        pagingParameters.total = response.data.total
      } catch (error) {
        console.log(error);
      }
    }

    onMounted(async () => {
      //TODO 这里模拟了手动点击下拉框
      conditions.schemeId = '82b96e0d6b49425394a7e3f871b74981'
      conditions.ruleId = 'c0f5ebb4dfd94f9d98d281e1979b3a00'


      //查询所有的方案信息
      getSchemesOptions()
      //刷新条码列表
      refreshBarCodesList()
    })

    //组件销毁前,清除缓存数据
    onUnmounted(() => {
      if(Object.keys(cache).length > 0) {
        Object.keys(cache).forEach(key => {
          delete cache[key]
        })
      }
    })

    //调整pageSize大小
    const handlePageSizeChange = async () => {
      refreshBarCodesList()
    }
    //调整currentChange大小
    const handleCurrentChange = async () => {
      refreshBarCodesList()
    }

    /*
    //const options = [{"children":[{"label":"工厂地址","value":"0004"},{"label":"工厂代号","value":"0005"}],"label":"工厂信息","value":"0001"},{"children":[{"label":"产品型号","value":"0006"},{"label":"产品型号ID","value":"0007"}],"label":"产品信息","value":"0002"},{"label":"厂商信息","value":"0003"}]
    const options = []
    //存储当前选中的数据
    const selectedOptions = ref([]);
    //存储所有拼接好的字段
    const fieldList = ref([]);
    //存储生成的eui条码值
    const eui = ref("");
    //存放qrCodeUrl
    const qrCodeUrl = ref("");

    //当前数据库中序列
    const generateQRCodeNum = ref(1);
    //当前数据库中地址
    const currentSequence = ref(8891);
    //下次生成开始序列
    const nextGenerateSequence = ref(currentSequence.value + 1);

    // 10进制转16进制补0
    const dec2hex = (dec, len) => {
      var hex = "";
      while (dec) {
        var last = dec & 15;
        hex = String.fromCharCode((last > 9 ? 55 : 48) + last) + hex;
        dec >>= 4;
      }
      if (len) {
        while (hex.length < len) hex = "0" + hex;
      }
      return hex;
    };

    //当前数据库中地址
    const currentSequenceHex = ref(dec2hex(currentSequence.value, 10));
    //下次生成开始地址
    const nextGenerateSequenceHex = ref(
      dec2hex(nextGenerateSequence.value, 10)
    );

    //监听字段列表的变化
    watch(
      fieldList,
      (newVal, oldVal) => {
        eui.value = newVal.reduce((acc, cur) => acc + cur.fieldValue, "");
      },
      {
        deep: true, // 如果数组中是对象，则需要设置deep选项来监控对象内部属性的变化
      }
    );

    //级联选择器中选中的数据发生变化时触发
    const handleCascaderChange = () => {
      if (selectedOptions.value == undefined) {
        return;
      }
      //给fieldList中添加值
      fieldList.value.push({
        fieldIndex: fieldList.value.length,
        fieldLable: selectedOptions.value[0],
        fieldValue: selectedOptions.value[1],
      });
    };

    const handleDeleteField = (row) => {
      fieldList.value.splice(row.fieldIndex, 1);
      //删除后更正索引
      fieldList.value.forEach((field, index) => {
        field.fieldIndex = index;
      });
    };
    

    const qrCodeInfoList = ref([]);
    //生成二维码
    const generateQRCodeUrl = async (text) => {
      //每次生成二维码前清空旧的数据
      qrCodeInfoList.value = [];
      try {
        const url = await QRCode.toDataURL(text);
        //把所有图片的的url信息放在qrCodeInfoList中
        qrCodeInfoList.value.push({ url: url, eui: text });
      } catch (error) {
        console.error("Error generating QR Code:", error);
      }
    };

    //使用时调用 generateQRCode 函数，并传入想要编码的文本
    const handleGenerateQRCode = () => {
      for (let i = 0; i < generateQRCodeNum.value; i++) {
        //每循环一次当前序列的值就自增1
        currentSequence.value++;
        //修改当前地址的值
        currentSequenceHex.value = dec2hex(currentSequence.value, 10);
        //拼接eui
        eui.value =
          fieldList.value.reduce((acc, cur) => acc + cur.fieldValue, "") +
          currentSequenceHex.value;
        generateQRCodeUrl(eui.value);
      }
    };
    //使用时调用 generateQRCode 函数，并传入想要编码的文本
    const handlePreviewQRCode = () => {
      for (let i = 0; i < generateQRCodeNum.value; i++) {
        //拼接eui
        eui.value =
          fieldList.value.reduce((acc, cur) => acc + cur.fieldValue, "") +
          dec2hex(currentSequence.value + i + 1, 10);
        generateQRCodeUrl(eui.value);
      }
    };

    const handleInputNumberChange = () => {
    };

    return {
      options,
      selectedOptions,
      handleCascaderChange,
      handleDeleteField,
      fieldList,
      eui,
      qrCodeUrl,
      handleGenerateQRCode,
      handleInputNumberChange,
      generateQRCodeNum,
      qrCodeInfoList,
      currentSequence,
      currentSequenceHex,
      nextGenerateSequence,
      nextGenerateSequenceHex,
      handlePreviewQRCode,
      handleOpenBarCodesGeneratorDialog,
      BarCodesGeneratorDialogVisible
    };
    */

    /**
     * @description: 导出excel
     * @param {any} dataList
     * @param {Array} fields
     * @param {Array} headers
     * @param {string} fileName 需要加后缀名 eg: 'test.xlsx'
     * @param {string} sheetName
     * @return {*}
     */
    const exportExcel = (dataList, fields, headers, fileName, sheetName) => {
      let data = new Array()
      if (!Array.isArray(dataList)) return console.warn('dataList is not an array type')
      // if (!Array.isArray(fields)) return console.warn('fields is not an array type')
      // if (!Array.isArray(headers)) return console.warn('headers is not an array type')
      data = dataList.map((obj) => {
        return fields.map((field) => {
          return obj[field]
        })
      })
      if (headers.length > 0) {
        data.splice(0, 0, headers)
      } else {
        // 将headers设置为英文字段表头
        data.splice(0, 0, fields)
      }
      const ws = XLSX.utils.aoa_to_sheet(data) // 创建工作表
      //设置列宽
      let wscols = [    // 每列不同宽度px
            { wch:20 },
            { wch:20 },
          ];
      // workbook.SheetNames[0]获取到到是文件里的到第一个表格
      ws["!cols"] = wscols;

      const wb = XLSX.utils.book_new() // 创建工作簿

      // 隐藏表头
      // let wsrows = [{ hidden: true }]
      // ws['!rows'] = wsrows // ws - worksheet

      XLSX.utils.book_append_sheet(wb, ws, sheetName) // 将工作表添加到工作簿中
      XLSX.writeFile(wb, fileName) // 导出文件
    }



    //预览该方案、该规则、该批次下所有条码
    const handleOpenPreviewBarCodesDialog = async (row) => {
      barCodesHistoryGeneratorDialogVisible.value = true
      //把当前选中行的数据传给预览某个批次生成的所有条码这个子组件
      Object.keys(row).forEach((key) => {
        currentSelectdRowData[key] = row[key]
      })
    }

    //导出excel示例代码
    /*
    const data = []
    barCodeValueFormat.forEach(barcodeInfo => {
      const barcode
      console.log(barcodeInfo.barCodesInfo.split('-'));
    })
    根据schemeId和ruleId查询出该方案下该规则的导出样式

    const data = [
      { name: '张三', gender: '男', age: 18 },
      { name: '李四', gender: '女', age: 20 },
      { name: '王五', gender: '男', age: 22 }
    ]
    var newTableDate = data
    const fields = ['name', 'gender', 'age']
    const headers = ['姓名', '性别', '年龄']
    exportExcel(newTableDate, fields, headers, '用户数据.xlsx')
    */


    //导出生成的条码到excel
    //V1.0
    // const handleExportBarCodes = (row) => {
    //   let barCodeValueFormat = []
    //   JSON.parse(row.barCodesValue).forEach(barCodeValue => {
    //     let barCodeValue_ = []
    //     Object.keys(barCodeValue).forEach(key => {
    //       let barCodeValuePart = ''
    //       barCodeValue[key].forEach(barCodeValueField => {
    //         barCodeValuePart += barCodeValueField.formItemFieldValue
    //       })
    //       barCodeValuePart = key + ':' + barCodeValuePart
    //       barCodeValue_.push(barCodeValuePart)
    //     })
    //     barCodeValueFormat.push({barCodesInfo:barCodeValue_.join(';')})
    //   })
    // const headers = ['条码信息']
    // const fields = ['barCodesInfo']
    // const excelData = barCodeValueFormat
    // exportExcel(excelData, fields, headers,`条码信息-${dayjs(row.createTime).format('YYYY.MM.DD_HH.mm.ss')}.xlsx`)

    //V2.0
    const handleExportBarCodes = (row) => {
      let barCodeValueFormat = []
      JSON.parse(row.barCodesValue).forEach(barCodeValue => {
        let barCodeInfo = {}
        Object.keys(barCodeValue).forEach(key => {
          let barCodeValuePart = ''
          barCodeValue[key].forEach(barCodeValueField => {
            barCodeValuePart += barCodeValueField.formItemFieldValue
          })
          barCodeInfo[key] = barCodeValuePart
        })
        barCodeValueFormat.push(barCodeInfo)
      })
      const headers = ['EUI','S/N']
      const fields = ['EUI','S/N']
      const excelData = barCodeValueFormat
      exportExcel(excelData, fields, headers,`条码信息-${dayjs(row.createTime).format('YYYY.MM.DD_HH.mm.ss')}.xlsx`)
    }

    //格式化日期
    const dateFormatter = (row, column, cellValue) => {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
    }

    const handleDefaultRuleChange = (value) => {
      ruleOptions.value.filter(ruleOption => ruleOption.value != value)
        .map(ruleOption => {
          ruleOption.asDefault = false
        })
    }

    watch(barCodesGeneratorDialogVisible,(newValue,oldValue) => {
      //弹窗关闭时自动刷新页面
      if(!barCodesGeneratorDialogVisible.value) {
        refreshBarCodesList()
      }
    })

    return {
      handleOpenBarCodesGeneratorDialog,
      barCodesGeneratorDialogVisible,
      barCodesList,
      pagingParameters,
      handlePageSizeChange,
      handleCurrentChange,
      handleOpenPreviewBarCodesDialog,
      dateFormatter,
      schemeOptions,
      ruleOptions,
      handleSchemeOptionsChange,
      handleRuleOptionsChange,
      conditions,
      barCodesHistoryGeneratorDialogVisible,
      currentSelectdRowData,
      handleExportBarCodes,
      handleDefaultRuleChange
    }
  },
};
</script>
<style scoped>
.dialog {
  width: 100%;
  height: 700px;
}
</style>
