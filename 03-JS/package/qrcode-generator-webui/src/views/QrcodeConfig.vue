<template>
  <el-row>
    <!-- 画布功能按钮区 -->
    <el-col :span="8">
      <hr />
      <pre>
        下面的值可以通过表达式来获取
        条码名称      条码名称表达式      条码值      条码值表达式
        ---------------------------------------------------------
        EUI条码       barCodeName-1     0123456789  barCodeValue-1
        ---------------------------------------------------------
        SN条码        barCodeName-1     987654321   barCodeValue-2
        ---------------------------------------------------------

        </pre>
      <hr />
      <button @click="handleAddCanvasElements(CANVAS_ELEMENTS_TYPE_ENUM.TEXT)">添加文字</button>
      <ul>
        <li v-for="(canvasElement, index) in canvasElementsFilter(canvasElements, CANVAS_ELEMENTS_TYPE_ENUM.TEXT)"
          :key="index">
          <div>
            <div>
              <el-input v-model="canvasElement.content.text.textContentBeforeRegReplace" placeholder="请输入文字内容"
                style="width:200px"></el-input>
              <el-select v-model="canvasElement.content.text.textStyle['font-family']" placeholder="字体"
                style="width:30%">
                <el-option v-for="fontFamilyOption in fontConfig.fontFamilyOptions" :key="fontFamilyOption.value"
                  :label="fontFamilyOption.label" :value="fontFamilyOption.value" />
              </el-select>
              <!--
              <el-select v-model="canvasElement.content.text.textStyle.fontSize" placeholder="字号" style="width:20%">
                <el-option
                  v-for="fontSizeOption in fontConfig.fontSizeOptions"
                  :key="fontSizeOption.value"
                  :label="fontSizeOption.label"
                  :value="fontSizeOption.value"
                />
              </el-select>
              -->
              <button @click="handleAddTextFontSize(canvasElement)">A+</button>
              <button @click="handleReduceTextFontSize(canvasElement)">A-</button>
              <button @click="handleChangeTextFontWeight(canvasElement)">B</button>
              <button @click="handleChangeTextFontStyle(canvasElement)">I</button>
            </div>
            <div>
              高<el-input-number size="small" min="5" v-model="canvasElement.styleWithOutUnit.height.userInputValue"
                placeholder="Please input" style="width: 15%;" />
              宽<el-input-number size="small" min="5" v-model="canvasElement.styleWithOutUnit.width.userInputValue"
                placeholder="Please input" style="width: 15%;" />
              左<el-input-number size="small" min="0" v-model="canvasElement.styleWithOutUnit.left.userInputValue"
                placeholder="Please input" style="width: 15%;" />
              上<el-input-number size="small" min="0" v-model="canvasElement.styleWithOutUnit.top.userInputValue"
                placeholder="Please input" style="width: 15%;" />
            </div>
            <div><button @click=handleDeleteCanvasElement(canvasElement.index)>删除画布元素</button></div>
          </div>
        </li>
      </ul>
      <button @click="handleAddCanvasElements(CANVAS_ELEMENTS_TYPE_ENUM.IMAGE)">添加图片</button>
      <ul>
        <li v-for="(canvasElement, index) in canvasElementsFilter(canvasElements, CANVAS_ELEMENTS_TYPE_ENUM.IMAGE)"
          :key="index">
          <div>
            <div>
              <el-upload ref="uploadRef" v-model:file-list="canvasElement.content.image.imageList" action="#" :limit="1"
                :on-exceed="(files, uploadFiles) => {
                  return handleExceed(files, uploadFiles, index)
                }" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemovePicture"
                :on-success="handleUploadSuccess" :before-upload="handleBeforeUpload" :http-request="handleUpload"
                :headers="uploadHeaders">
                <el-icon>
                  <Plus />
                </el-icon>
              </el-upload>
              <el-dialog v-model="dialogVisible" width="30%">
                <img w-full :src="dialogImageUrl" alt="Preview Image" />
              </el-dialog>
            </div>
            <div>
              高<el-input-number size="small" controls-position="right"
                :min="canvasElement.styleWithOutUnit.height.minValue"
                :max="canvasElement.styleWithOutUnit.height.maxValue"
                v-model="canvasElement.styleWithOutUnit.height.userInputValue" placeholder="Please input"
                style="width: 15%;" />
              宽<el-input-number size="small" :min="canvasElement.styleWithOutUnit.width.minValue"
                :max="canvasElement.styleWithOutUnit.width.maxValue"
                v-model="canvasElement.styleWithOutUnit.width.userInputValue" placeholder="Please input"
                style="width: 15%;" />
              左<el-input-number size="small" :min="canvasElement.styleWithOutUnit.left.minValue"
                :max="canvasElement.styleWithOutUnit.left.maxValue"
                v-model="canvasElement.styleWithOutUnit.left.userInputValue" placeholder="Please input"
                style="width: 15%;" />
              上<el-input-number size="small" :min="canvasElement.styleWithOutUnit.top.minValue"
                :max="canvasElement.styleWithOutUnit.top.maxValue"
                v-model="canvasElement.styleWithOutUnit.top.userInputValue" placeholder="Please input"
                style="width: 15%;" />
            </div>
            <div><button @click=handleDeleteCanvasElement(canvasElement.index)>删除画布元素</button></div>
          </div>
        </li>
      </ul>
      <button @click="handleAddCanvasElements(CANVAS_ELEMENTS_TYPE_ENUM.QRCODE)">添加二维码</button>
      <ul>
        <li v-for="(canvasElement, index) in canvasElementsFilter(canvasElements, CANVAS_ELEMENTS_TYPE_ENUM.QRCODE)"
          :key="index">
          <div>
            <div>
              请输入二维码内容<el-input v-model="canvasElement.content.qrCode.qrCodeContentBeforeRegReplace"
                placeholder="请输入二维码内容" style="width:200px"></el-input>
            </div>
            <div>
              二维码内容预览<el-input v-model="canvasElement.content.qrCode.qrCodeContentAfterRegReplace" placeholder="二维码内容预览"
                style="width:200px"></el-input>
            </div>
            <div>
              高<el-input-number size="small" controls-position="right"
                :min="canvasElement.styleWithOutUnit.height.minValue"
                :max="canvasElement.styleWithOutUnit.height.maxValue"
                v-model="canvasElement.styleWithOutUnit.height.userInputValue" placeholder="Please input"
                style="width: 15%;" />
              宽<el-input-number size="small" :min="canvasElement.styleWithOutUnit.width.minValue"
                :max="canvasElement.styleWithOutUnit.width.maxValue"
                v-model="canvasElement.styleWithOutUnit.width.userInputValue" placeholder="Please input"
                style="width: 15%;" />
              左<el-input-number size="small" :min="canvasElement.styleWithOutUnit.left.minValue"
                :max="canvasElement.styleWithOutUnit.left.maxValue"
                v-model="canvasElement.styleWithOutUnit.left.userInputValue" placeholder="Please input"
                style="width: 15%;" />
              上<el-input-number size="small" :min="canvasElement.styleWithOutUnit.top.minValue"
                :max="canvasElement.styleWithOutUnit.top.maxValue"
                v-model="canvasElement.styleWithOutUnit.top.userInputValue" placeholder="Please input"
                style="width: 15%;" />
            </div>
            <div><button @click=handleDeleteCanvasElement(canvasElement.index)>删除画布元素</button></div>
          </div>
        </li>
      </ul>
    </el-col>

    <!-- 画布页面预览区 -->
    <el-col :span="16">
      <div :style="CANVAS_CONFIG.style">
        <!-- 文本类型 的画布元素预览区 -->
        <div v-for="(canvasElement, index) in canvasElementsFilter(canvasElements, CANVAS_ELEMENTS_TYPE_ENUM.TEXT)"
          :key="index">
          <div :style="canvasElement.style">
            <div :style="canvasElement.content.text.textStyle">
              {{ canvasElement.content.text.textContentAfterRegReplace }}
            </div>
          </div>
        </div>
        <!-- 图片类型 的画布元素预览区 -->
        <div v-for="(canvasElement, index) in canvasElementsFilter(canvasElements, CANVAS_ELEMENTS_TYPE_ENUM.IMAGE)"
          :key="index">
          <div v-for="(image, index) in canvasElement.content.image.imageList" :key="index">
            <img :src="image.url" :style="canvasElement.style" />
          </div>
        </div>
        <!-- 二维码类型 的画布元素预览区 -->
        <div v-for="(canvasElement, index) in canvasElementsFilter(canvasElements, CANVAS_ELEMENTS_TYPE_ENUM.QRCODE)"
          :key="index">
          <div :style="canvasElement.style">
            <img :src="canvasElement.content.qrCode.imageUrl" style="width: 100%;height: 100%;" />
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
  <hr />
</template>

<script>
import { watch, reactive, ref, onMounted, nextTick, computed } from "vue";
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, genFileId } from 'element-plus'
import { upload } from '@/api/qrcodeConfig.js'

export default {
  name: "QrcodeConfig",
  components: {
    Plus
  },

  setup() {
    //用于保存用户添加的所有画布元素
    const canvasElements = ref([])

    //画布元素类型枚举
    const CANVAS_ELEMENTS_TYPE_ENUM = reactive({
      TEXT: {
        CODE: 'TEXT',
        DESC: '文本类型'
      },
      IMAGE: {
        CODE: 'IMAGE',
        DESC: '图片类型'
      },
      QRCODE: {
        CODE: 'QRCODE',
        DESC: '二维码类型'
      }
    })
    //画布高度
    const canvasHeight = 500
    //画布宽度
    const canvasWidth = 500
    //画布配置信息
    const CANVAS_CONFIG = reactive({
      //画布整个区域的样式[宽、高、左、右 带单位版]
      style: {
        height: '',
        width: '',
        'background-color': '',
        position: '',
        overflow: '',
      },
      //画布整个区域的样式[宽、高、左、右 不带单位版]
      styleWithOutUnit: {
        //画布默认高度
        height: canvasHeight,
        //画布默认宽度
        width: canvasWidth,
        'background-color': 'cadetblue',
        position: 'relative',
        overflow: 'hidden',
        unit: 'px',
      },
      //文本框的大小和初始位置等样式信息
      TEXT: {
        // height:'',
        // width:50,
        // left:50,
        // top:50,
        defaultHeight: canvasHeight * 0.4,
        defaultWidth: canvasWidth * 0.4,
        defaultLeft: 100,
        defaultTop: 100,
        initFontSize: 18,
        unit: 'px'
      },
      //图片默认的大小和初始位置等样式信息
      IMAGE: {
        defaultHeight: canvasHeight * 0.4,
        defaultWidth: canvasWidth * 0.4,
        defaultLeft: 100,
        defaultTop: 100,
        //init_font_size:18,
        //unit:'px'
      },
      //二维码的大小和初始位置等样式信息
      QRCODE: {
        defaultHeight: canvasHeight * 0.4,
        defaultWidth: canvasWidth * 0.4,
        defaultLeft: 100,
        defaultTop: 100,
      }
    })

    onMounted(() => {
      //把CANVAS_CONFIG中styleWithOutUnit的值赋给style，用户设置画板的样式
      CANVAS_CONFIG.style.height = CANVAS_CONFIG.styleWithOutUnit.height + CANVAS_CONFIG.styleWithOutUnit.unit
      CANVAS_CONFIG.style.width = CANVAS_CONFIG.styleWithOutUnit.width + CANVAS_CONFIG.styleWithOutUnit.unit
      CANVAS_CONFIG.style['background-color'] = CANVAS_CONFIG.styleWithOutUnit['background-color']
      CANVAS_CONFIG.style.position = CANVAS_CONFIG.styleWithOutUnit.position
      CANVAS_CONFIG.style.overflow = CANVAS_CONFIG.styleWithOutUnit.overflow
    })

    //添加画布元素
    const handleAddCanvasElements = (canvasElementType) => {
      canvasElements.value.push(
        {
          index: canvasElements.value.length,
          style: {
            position: 'absolute',
            //画板中元素高度属性
            height: '',
            //画板中元素宽度属性
            width: '',
            //画板中元素左边距属性
            left: '',
            //画板中元素上边距用户输入值
            top: '',
            //背景颜色
            'background-color': 'skyblue'
          },
          styleWithOutUnit: {
            //画板中元素高度属性
            height: {
              //画板中元素高度默认值
              userInputValue: CANVAS_CONFIG[canvasElementType.CODE].defaultHeight,
              //画板中元素高度最小值
              minValue: 3,
              //画板中元素高度最大值
              maxValue: CANVAS_CONFIG.styleWithOutUnit.height,
            },
            //画板中元素宽度属性
            width: {
              //画板中元素高度默认值
              userInputValue: CANVAS_CONFIG[canvasElementType.CODE].defaultWidth,
              //画板中元素高度最小值
              minValue: 3,
              //画板中元素高度最大值
              maxValue: CANVAS_CONFIG.styleWithOutUnit.width,
            },
            //画板中元素左边距属性
            left: {
              //画板中元素高度默认值
              userInputValue: CANVAS_CONFIG[canvasElementType.CODE].defaultLeft,
              //画板中元素高度最小值
              minValue: 0,
              //画板中元素高度最大值
              maxValue: 500,
            },
            //画板中元素上边距属性
            top: {
              //画板中元素高度默认值
              userInputValue: CANVAS_CONFIG[canvasElementType.CODE].defaultTop,
              //画板中元素高度最小值
              minValue: 0,
              //画板中元素高度最大值
              maxValue: 500,
            }
          },
          //元素类型
          canvasElementType: canvasElementType,
          //元素内容
          content: {
            text: {
              //用户输入的原始文本
              textContentBeforeRegReplace: '',
              //经过正则ti替换后的 用户输入的原始文本
              textContentAfterRegReplace: '',
              textStyle: {
                'font-family': '',
                'font-size': CANVAS_CONFIG.TEXT.initFontSize + CANVAS_CONFIG.TEXT.unit,
                'font-weight': '',
                'font-style': '',
              }
            },
            image: {
              imageList: []
            },
            qrCode: {
              //用户输入的原始二维码内容
              qrCodeContentBeforeRegReplace: '',
              //经过正则替换后的 用户输入的原始二维码内容
              qrCodeContentAfterRegReplace: '',
              imageUrl: ''
            }
          },
        },
      )
    }


    //删除画布元素
    const handleDeleteCanvasElement = (index) => {
      //删除数组中指定位置的元素
      canvasElements.value.splice(index, 1)
      //删除后对数组中元素进行处理，让数组元素index值和下标索引保持一致
      canvasElements.value.map((canvasElement, index) => {
        //重设数组元素中的index值
        canvasElement.index = index
      })
    }


    /**
     * 根据元素类型过滤出指定的画布元素列表，如从所有画布元素中过滤出类型为IMAGE的所有画布元素
     * @param canvasElements
     * @param canvasElementType
     */
    const canvasElementsFilter = (canvasElements, canvasElementType) => {
      return canvasElements.filter(element => element.canvasElementType === canvasElementType)
    }

    //字体配置
    const fontConfig = reactive({
      fontFamilyOptions: [
        {
          value: '宋体',
          label: '宋体',
        },
        {
          value: '黑体',
          label: '黑体',
        }
      ],
      fontSizeOptions: [
        {
          value: '14px',
          label: '14',
        },
        {
          value: '20px',
          label: '20',
        },
        {
          value: '30px',
          label: '30',
        },
      ],
    })


    //设置画布的长度 监控用户用户设置的画布元素的大小和尺寸，用于设置画板元素的样式
    watch(canvasElements, (newVal, oldVal) => {
      newVal.map(async canvasElement => {
        //设置画板元素的高度
        canvasElement.style.height = canvasElement.styleWithOutUnit.height.userInputValue + CANVAS_CONFIG.TEXT.unit
        //设置画板元素的宽度
        canvasElement.style.width = canvasElement.styleWithOutUnit.width.userInputValue + CANVAS_CONFIG.TEXT.unit
        //设置画板元素的左边距
        canvasElement.style.left = canvasElement.styleWithOutUnit.left.userInputValue + CANVAS_CONFIG.TEXT.unit
        //设置画板元素的右边距
        canvasElement.style.top = canvasElement.styleWithOutUnit.top.userInputValue + CANVAS_CONFIG.TEXT.unit

        //设置画板元素的高度的最大值
        canvasElement.styleWithOutUnit.height.maxValue = canvasHeight - canvasElement.styleWithOutUnit.top.userInputValue
        //设置画板元素的宽度的最大值
        canvasElement.styleWithOutUnit.width.maxValue = canvasHeight - canvasElement.styleWithOutUnit.left.userInputValue
        //设置画板元素的上边距的最大值
        canvasElement.styleWithOutUnit.top.maxValue = canvasHeight - canvasElement.styleWithOutUnit.height.userInputValue
        //设置画板元素的左边距的最大值
        canvasElement.styleWithOutUnit.left.maxValue = canvasHeight - canvasElement.styleWithOutUnit.width.userInputValue

        //把需要的值和表达式封装在这个对象中
        const expressionAndValueList = [
          { 'barCodeName-1': 'EUI条码', 'barCodeValue-1': '0123456789' },
          { 'barCodeName-2': 'SN条码', 'barCodeValue-2': '9876543210' },
        ]

        switch (canvasElement.canvasElementType) {
          //如果是文本，就监控用户输入的文本内容中是否包含表达式
          case CANVAS_ELEMENTS_TYPE_ENUM.TEXT:
            let textContentBeforeRegReplace = canvasElement.content.text.textContentBeforeRegReplace;
            expressionAndValueList.forEach(expressionAndValue => {
              Object.keys(expressionAndValue).forEach(key => {
                //根据key拼接出对应的正则表达式
                const expressionAndValueReg = new RegExp('\\${\\s*' + key + '\\s*}')
                //根据具体 key 对应的正则表达式 和 该key对应的值做替换处理
                textContentBeforeRegReplace = textContentBeforeRegReplace.replace(expressionAndValueReg, expressionAndValue[key])
              })
            })
            canvasElement.content.text.textContentAfterRegReplace = textContentBeforeRegReplace
            break;
          //如果是二维码，就监控用户输入的二维码内容中是否包含表达式
          case CANVAS_ELEMENTS_TYPE_ENUM.QRCODE:
            let qrCodeContentBeforeRegReplace = canvasElement.content.qrCode.qrCodeContentBeforeRegReplace;
            expressionAndValueList.forEach(expressionAndValue => {
              Object.keys(expressionAndValue).forEach(key => {
                //根据key拼接出对应的正则表达式
                const expressionAndValueReg = new RegExp('\\${\\s*' + key + '\\s*}')
                //根据具体 key 对应的正则表达式 和 该key对应的值做替换处理
                qrCodeContentBeforeRegReplace = qrCodeContentBeforeRegReplace.replace(expressionAndValueReg, expressionAndValue[key])
              })
            })
            canvasElement.content.qrCode.qrCodeContentAfterRegReplace = qrCodeContentBeforeRegReplace

            try {
              canvasElement.content.qrCode.imageUrl = await QRCode.toDataURL(qrCodeContentBeforeRegReplace, {
                errorCorrectionLevel: 'H',
                margin: 1,
                color: {
                  dark: '#000',  // 二维码颜色
                  light: '#0000' // 二维码背景色
                }
              });


            } catch (error) {
              console.error("Error generating QR Code:", error);
            }
            break;
          default:
            break;
        }

      })
    },
      {
        deep: true, // 如果数组中是对象，则需要设置deep选项来监控对象内部属性的变化
      }
    );


    //增加字体
    const handleAddTextFontSize = (canvasElement) => {
      canvasElement.content.text.textStyle['font-size'] = parseInt(canvasElement.content.text.textStyle['font-size'].replace(CANVAS_CONFIG.TEXT.unit, '')) + 1 + CANVAS_CONFIG.TEXT.unit
    }

    //减少字体
    const handleReduceTextFontSize = (canvasElement) => {
      canvasElement.content.text.textStyle['font-size'] = parseInt(canvasElement.content.text.textStyle['font-size'].replace(CANVAS_CONFIG.TEXT.unit, '')) - 1 + CANVAS_CONFIG.TEXT.unit
    }

    //加粗字体
    const handleChangeTextFontWeight = (canvasElement) => {
      canvasElement.content.text.textStyle['font-weight'] = canvasElement.content.text.textStyle['font-weight'] === '' ? 'bold' : ''
    }

    //字体变为斜体
    const handleChangeTextFontStyle = (canvasElement) => {
      canvasElement.content.text.textStyle['font-style'] = canvasElement.content.text.textStyle['font-style'] === '' ? 'italic' : ''
    }


    const imagesList = ref([
      {
        name: 'food.jpeg',
        url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      }
    ])


    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const uploadHeaders = ref({
      'Content-Type': 'multipart/form-data',
    })

    const uploadRef = ref(null)

    /**
     * 点击从图片显示列表中删除图片时触发的钩子函数
     * @param uploadFile
     * @param uploadFiles
     */
    const handleRemovePicture = (uploadFile, uploadFiles) => {
    }

    /**
     * 点击图片显示列表中的预览按钮时触发的钩子函数
     * @param uploadFile
     */
    const handlePictureCardPreview = (uploadFile) => {
      dialogImageUrl.value = uploadFile.url
      dialogVisible.value = true
    }

    /**
     * 文件上传前钩子函数
     * @param uploadFile 需要上传的文件
     */
    const handleBeforeUpload = (uploadFile) => {
      if (uploadFile.type.startsWith('image')) {
        return true;
      } else {
        ElMessage.warning("只能上传图片类型的文件,请重新上传！");
        return false;
      }
    }

    /**
     * 文件上传成功时触发的钩子函数
     * @param response 文件上传成功时触发的钩子函数
     * @param uploadFile 上传成功的文件
     * @param uploadFiles
     */
    const handleUploadSuccess = (response, uploadFile, uploadFiles) => {
      //上传成功后修改画布元素中的图片列表中的数据
      //画布元素中所有的图片元素
      // const imageCanvasElement = canvasElementsFilter(canvasElements.value,CANVAS_ELEMENTS_TYPE_ENUM.IMAGE)
      // imageCanvasElement[currentElUploadComponentIndex.value].content.image.imageList.push({
      //   name: 'food.jpeg',
      //   imageUrl: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
      // })
    }

    /**
     *
     * @param file 上传图片
     */
    const handleUpload = async (uploadFile) => {
      //创建表单数据
      const formData = new FormData();
      //拼接表单数据
      formData.append("uploadFile", uploadFile.file);
      //给表单数据中添加额外的参数
      Object.keys(uploadFile.data).forEach(key => {
        formData.append(key, uploadFile.data[key]);
      })
      //调用上传文件接口上传文件到后台
      let response = await upload(formData);
    };


    /**
     * 再次上传时覆盖前一个文件
     * @param files 当前放在待上传文件列表中的文件
     * @param fileList 当前真正会上传的所有文件
     * @param index 执行上传操作的el-upload组件的索引
     */
    const handleExceed = (files, fileList, index) => {
      files[0].uid = genFileId()
      //raw就是指文件
      fileList[0].name = files[0].name
      fileList[0].raw = files[0]
      //删除所有上传的文件
      uploadRef.value[index].clearFiles();
      //handleStart()指的是手动选择文件 //todo 测试这一行代码是否需要
      uploadRef.value[index].handleStart(files[0]);
      //手动上传
      uploadRef.value[index].submit();
    }


    return {
      canvasElements,
      CANVAS_ELEMENTS_TYPE_ENUM,
      handleAddCanvasElements,
      handleDeleteCanvasElement,
      canvasElementsFilter,
      fontConfig,
      handleAddTextFontSize,
      handleReduceTextFontSize,
      handleChangeTextFontWeight,
      handleChangeTextFontStyle,
      imagesList,
      dialogImageUrl,
      dialogVisible,
      handleBeforeUpload,
      handleRemovePicture,
      handlePictureCardPreview,
      handleUploadSuccess,
      handleUpload,
      handleExceed,
      uploadRef,
      uploadHeaders,
      CANVAS_CONFIG
    }
  }
}
</script>

<style>
/** 调整图片展示列表中卡片的大小 */
.el-upload-list--picture-card {
  --el-upload-list-picture-card-size: 80px;
}

/** 调整图片展示列表中上传按钮所在框的大小 */
.el-upload--picture-card {
  --el-upload-picture-card-size: 80px;
}
</style>
