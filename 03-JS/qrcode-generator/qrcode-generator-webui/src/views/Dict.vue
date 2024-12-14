<template>
  <el-row>
    <el-col :span="20" style="padding-left: 20px;padding-right: 20px;padding-top: 20px;">
      <el-form-item label="选择方案">
        <el-select v-model="conditions.schemeId" placeholder="请选择方案" @change="handleSchemeOptionsChange">
          <el-option v-for="(schemeOption, index) in schemeOptions" :key="index" :label="schemeOption.label"
            :value="schemeOption.value" />
        </el-select>
      </el-form-item>
    </el-col>
  </el-row>
  <el-row style="padding-left: 20px;padding-right: 20px;">
    <el-col :span="20">
      <el-form-item label="字典数据">
        <div class="custom-tree-container" style="height: 650px;overflow: scroll;">
          <el-tree :data="dictTreeData"
          :expand-on-click-node="false"
          :render-content="renderContent"
          node-key="id"
          :default-expanded-keys="[defaultExpandedKeys]">
          </el-tree>
        </div>
      </el-form-item>
    </el-col>
  </el-row>
  <el-dialog v-model="addOrEditDictDialogTableVisible" :title="addOrEditTreeDictDialogTitle" width="500">
    <el-form :model="dict">
      <el-form-item label="请输入字典名称" :label-width="formLabelWidth">
        <el-input v-model="dict.dictName" autocomplete="off" />
      </el-form-item>
      <el-form-item label="请输入字典数据" :label-width="formLabelWidth">
        <el-input v-model="dict.dictData" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="请输入字典描述" :label-width="formLabelWidth">
        <el-input v-model="dict.dictDesc" autocomplete="off" type="textarea" />
      </el-form-item>
      <el-form-item label="请选择字典类型状态" :label-width="formLabelWidth">
        <el-switch v-model="dict.dictStatus" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="addOrEditDictDialogTableVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAddDict" v-if="addOrEditTreeDictOperateType == 'ADD'">
          保存
        </el-button>
        <el-button type="primary" @click="handleUpdateDict" v-if="addOrEditTreeDictOperateType == 'UPDATE'">
          更新
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
import { ref, onMounted, reactive, watch } from 'vue'
import { getDictsForTreeBySchemeIdForTree, addDict, deleteDictByIdRecursive, updateDict } from '@/api/dict.js'
import { getSchemesForSelectInput } from '@/api/scheme.js'
//弹出层插件
import { ElMessage } from "element-plus";
import { deepClone } from '@/commons/utils.js'

export default {
  name: "Dict",
  setup() {
    //新增或编辑树节点Dialog的显示状态
    const addOrEditDictDialogTableVisible = ref(false)
    //编辑树形字典Dialog弹窗标题
    const addOrEditTreeDictDialogTitle = ref('新增字典')
    //操作类型
    const addOrEditTreeDictOperateType = ref('ADD')

    //定义字典类型模板
    const DICT_TEMPLATE = {
      id: null,
      dictName: null,
      dictCode: null,
      dictData: null,
      dictSort: null,
      dictDesc: null,
      dictStatus: true,
      parentId: null,
      level: null,
      schemeId: null,
    }
    //根据模板创建Dict实体
    const dict = reactive(deepClone(DICT_TEMPLATE))

    //方案下拉框使用的数据
    const schemeOptions = ref([]);

    //查询条件
    const conditions = reactive({
      schemeId: null
    })

    //字典数据
    const dictTreeData = ref([])
    //默认展开的节点
    const defaultExpandedKeys = ref([])

    //从数据库查询方案下拉框需要的数据
    const refreshSchemeList = async () => {
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

    //刷新树
    const refreshTree = async () => {
      const getDictsForTreeBySchemeIdForTreeResponse = await getDictsForTreeBySchemeIdForTree(conditions)
      if (getDictsForTreeBySchemeIdForTreeResponse.code == 200) {
        dictTreeData.value = [getDictsForTreeBySchemeIdForTreeResponse.data]
      } else {
        ElMessage({
          message: `根据方案加载树失败`,
          type: "error",
          plain: true,
        });
      }
    }

    onMounted( () => {
      refreshSchemeList()
      //判断用户是否选择了方案，如果没有选择方案或者没有设置默认方案的话，直接结束代码的执行
      if (conditions.schemeId == null) {
        //TODO
        return
      }
    })

    //新增字典类型数据
    const handleAddDict = async () => {
      //关闭弹窗
      addOrEditDictDialogTableVisible.value = false
      //执行新增操作
      const addDictResponse = await addDict(dict)
      let addDictId = null
      if(addDictResponse.data.code == '200') {
        ElMessage({
          message: `新增字典数据成功`,
          type: "success",
          plain: true,
        });
        addDictId = addDictResponse.data.data.id
      }else {
        ElMessage({
          message: `新增字典数据失败`,
          type: "error",
          plain: true,
        });
      }

      //刷新树
      refreshTree()
      //设置默认展开的节点
      defaultExpandedKeys.value = addDictId
    }

    //更新字典类型数据
    const handleUpdateDict = async () => {
      //关闭弹窗
      addOrEditDictDialogTableVisible.value = false
      //执行更新操作
      const updateDictResponse = await updateDict(dict)
      let updateDictId = null
      if(updateDictResponse.data.code == '200') {
        ElMessage({
          message: `更新字典数据成功`,
          type: "success",
          plain: true,
        });
        updateDictId = updateDictResponse.data.data.id
      }else {
        ElMessage({
          message: `根新字典数据失败`,
          type: "error",
          plain: true,
        });
      }

      //刷新树
      refreshTree()
      //设置默认展开的节点
      defaultExpandedKeys.value = updateDictId
    }

    //新增节点
    const appendNode = (data) => {
      //打开弹窗
      addOrEditDictDialogTableVisible.value = true
      //修改弹窗标题
      addOrEditTreeDictDialogTitle.value = '新增字典类型'
      //修改操作类型
      addOrEditTreeDictOperateType.value = 'ADD'

      dict.dictSort = data.children == null ? 1 : data.children.length + 1
      dict.parentId = data.id
      //这个level要+1
      dict.level = data.level + 1
      dict.schemeId = conditions.schemeId
    }

    //编辑节点
    const updateNode = (data) => {
      //打开弹窗
      addOrEditDictDialogTableVisible.value = true
      //修改弹窗标题
      addOrEditTreeDictDialogTitle.value = '编辑字典类型'
      //修改操作类型
      addOrEditTreeDictOperateType.value = 'UPDATE'

      //根据模板创建一个dict对象
      const dict_ = reactive(deepClone(DICT_TEMPLATE))
      dict_.id = data.id
      dict_.dictName = data.label
      dict_.dictData = data.data
      dict_.dictDesc = data.desc
      dict_.dictStatus = data.status == '0' ? true :false
      Object.keys(dict).forEach(key => {
        dict[key] = dict_[key]
      })
    }

    //删除节点
    const removeNode = async (node, data) => {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex((d) => d.id === data.id)
      children.splice(index, 1)
      //根据id后台递归删除树节点
      const deleteDictByIdRecursiveResponse = await deleteDictByIdRecursive(data.id)
      if(deleteDictByIdRecursiveResponse.data.code == '200') {
        ElMessage({
          message: `删除节点${data.dictName}及子结点数据成功`,
          type: "success",
          plain: true,
        });
      }else {
        ElMessage({
          message: `删除节点${data.dictName}及子结点数据失败`,
          type: "error",
          plain: true,
        });
      }
    }

    //渲染树
    const renderContent = (h, { node, data, store }) => {
      return h('span',
         { class: 'custom-tree-node', },
        h('span', { style: '' }, node.label),
        h('span', null,
          h(
            'span',
            {
              style: 'display:inline-block;text-align:left;width:300px;',
            },
            data.data
          ),
          h(
            'span',
            {
              style: 'display:inline-block;text-align:left;width:450px;',
            },
            data.desc
          ),
          h(
            'a',
            {
              style: 'margin-right:10px;',
              onClick: () => appendNode(data),
            },
            '增加节点 '
          ),
          h(
            'a',
            {
              style: 'margin-right:10px;',
              onClick: () => updateNode(data),
            },
            '编辑节点 '
          ),
          h(
            'a',
            {
              style: '',
              onClick: () => removeNode(node, data),
            },
            '删除节点'
          )
        )
      )
    }

    //监听方案下拉列表的变化
    const handleSchemeOptionsChange = async() => {
      await refreshTree()
      //设置默认展开的节点
      defaultExpandedKeys.value = dictTreeData.value[0].id
    }

    //监听弹窗是否打开
    watch(addOrEditDictDialogTableVisible, (newValue, oldValue) => {
      //弹窗关闭，清空
      if (!newValue) {
        //根据模板创建一个dict对象
        const dict_ = reactive(deepClone(DICT_TEMPLATE))
        Object.keys(dict).forEach(key => {
          dict[key] = dict_[key]
        })
      }
    })
    return {
      dictTreeData,
      renderContent,
      addOrEditDictDialogTableVisible,
      handleAddDict,
      handleUpdateDict,
      dict,
      conditions,
      handleSchemeOptionsChange,
      schemeOptions,
      addOrEditTreeDictDialogTitle,
      addOrEditTreeDictOperateType,
      defaultExpandedKeys
    }
  }
}
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
  font-weight:bold;
  color: green;
}

.custom-tree-container {
  width: 100%;
}
</style>
