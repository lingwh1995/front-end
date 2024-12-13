<template>
  <div>
    <el-button type="success" plain style="float: right" @click="handleOpenAddProductDrawer">新增</el-button>
  </div>
  <div>
    <el-table :data="products" stripe :cell-style="{ textAlign: 'center' }" :header-cell-style="{ textAlign: 'center' }"
      style="width: 100%;height:500px;" max-height="500px">
      <el-table-column prop="id" label="产品id" v-if="false" />
      <el-table-column prop="productName" label="产品名称" />
      <el-table-column prop="productModel" label="产品型号" />
      <el-table-column prop="productModelId" label="产品型号ID" />
      <el-table-column prop="createTime" :formatter="dateFormatter" sortable label="创建日期" />
      <el-table-column fixed="right" label="操作">
        <template v-slot="scope">
          <el-button link type="primary" @click="handleOpenEditProductDrawer(scope.row)">
            编辑
          </el-button>
          <el-button link type="primary" @click="handleDeleteProduct(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>


  <el-drawer v-model="drawer.visible" :title="drawer.title" direction="rtl" size="30%">
    <div class="demo-drawer__content">
      <el-form label-position="left" label-width="auto" :model="product">
        <el-form-item label="产品名称">
          <el-input v-model="product.productName" />
        </el-form-item>
        <el-form-item label="产品型号">
          <el-input v-model="product.productModel" />
        </el-form-item>
        <el-form-item label="产品型号ID">
          <el-input v-model="product.productModelId" />
        </el-form-item>
      </el-form>
      <div class="demo-drawer__footer">
        <el-button type="primary" @click="handleAddProduct" v-if="drawer.saveBtnIsShow">
          {{ drawer.loading ? "保存中 ..." : "保存" }}
        </el-button>
        <el-button type="primary" @click="handleEditProduct" v-if="drawer.updateBtnIsShow">
          {{ drawer.loading ? "更新中 ..." : "更新" }}
        </el-button>
        <el-button @click="handleCancelForm">取消</el-button>
      </div>
    </div>
  </el-drawer>

  <div class="demo-pagination-block" style="margin-top: 10px;">
    <el-pagination v-model:current-page="pagination.currentPage" v-model:page-size="pagination.pageSize"
      :page-sizes="[10, 20, 50, 100]" :background="background" layout="total, sizes, prev, pager, next, jumper"
      :total="pagination.total" @size-change="handleSizeChange" @current-change="handleCurrentPageChange" />
  </div>
</template>

<script>
import { reactive, ref, onMounted, getCurrentInstance } from "vue";
import { addProduct, deleteProductById, editProduct, getProducts } from "@/api/product.js";
//弹出层插件
import { ElMessage } from "element-plus";
//格式化日期插件
import dayjs from 'dayjs';

export default {
  name: "Product",
  setup() {
    let timer;

    //左侧抽屉弹层需要用到的数据
    const drawer = reactive({
      //是否显示右侧抽屉
      visible: false,
      //抽屉的标题
      title: "产品信息",
      loading: false,
      //保存按钮是否显示
      saveBtnIsShow: true,
      //更新按钮是否显示
      updateBtnIsShow: true
    });

    //产品实体
    const product = reactive({
      productName: "",
      productModel: "",
      productModelId: "",
    });

    //用来保存所有的产品
    const products = ref(null);

    //用于保存分页相关参数
    const pagination = reactive({
      total: 0,
      currentPage: 1,
      pageSize: 10,
    });

    /**页面初始化时从数据查询产品列表 */
    onMounted(async () => {
      try {
        const response = await getProducts(pagination);
        products.value = response.data.list;
        pagination.total = response.data.total;
      } catch (error) {
        ElMessage({
          message: "页面首次加载后刷新产品列表失败" + error,
          type: "error",
          plain: true,
        });
      }
    });

    //格式化日期
    const dateFormatter = (row, column, cellValue) => {
      return dayjs(cellValue).format('YYYY-MM-DD HH:mm:ss');
    }

    /**取消提交表单 */
    const handleCancelForm = () => {
      //按钮文字修改 保存中... -> 保存
      drawer.loading = false;
      //关闭抽屉
      drawer.visible = false;
      //清除内存中定时器
      clearTimeout(timer);
      //清空表单中输入的数据
      product.productName = "";
      product.productModel = "";
      product.productModelId = "";
    };

    /** 打开新增产品抽屉弹层 */
    const handleOpenAddProductDrawer = () => {
      //按钮文字修改 保存中... -> 保存
      drawer.loading = false;
      //清空表单中输入的数据
      product.productName = "";
      product.productModel = "";
      product.productModelId = "";
      //打开抽屉
      drawer.visible = true;
      //设置抽屉标题
      drawer.title = "新增产品信息";
      //隐藏更新按钮
      drawer.updateBtnIsShow = false
      //显示保存按钮
      drawer.saveBtnIsShow = true

    };

    /**修改每页展示的数量 */
    const handleSizeChange = async (pageSize) => {
      pagination.pageSize = pageSize;
      try {
        const response = await getProducts(pagination);
        products.value = response.data.list;
      } catch (error) {
        ElMessage({
          message: "修改每页展示的数量后刷新产品列表失败" + error,
          type: "error",
          plain: true,
        });
      }
    };

    /**修改当前页码数 */
    const handleCurrentPageChange = async (currentPage) => {
      pagination.currentPage = currentPage;
      try {
        const response = await getProducts(pagination);
        products.value = response.data.list;
      } catch (error) {
        ElMessage({
          message: "修改当前页码数后刷新产品列表失败" + error,
          type: "error",
          plain: true,
        });
      }
    };

    /**提交表单-新增产品 */
    const handleAddProduct = async () => {
      //点击提交按钮后按钮文字发生改变
      timer = setTimeout(() => {
        drawer.loading = true;
        drawer.visible = false;
      }, 300);

      try {
        //新增产品
        const addProductResponse = await addProduct(product);
        //新增产品成功或者失败反馈
        if (addProductResponse.data.code == "200") {
          ElMessage({
            message: "新增产品成功",
            type: "success",
            plain: true,
          });
        } else {
          ElMessage({
            message: "新增产品失败",
            type: "error",
            plain: true,
          });
        }
        const getProductsResponse = await getProducts(pagination);
        products.value = getProductsResponse.data.list;
        pagination.total = getProductsResponse.data.total;
      } catch (error) {
        ElMessage({
          message: "新增产品失败" + error,
          type: "error",
          plain: true,
        });
      }
    };

    //打开编辑产品抽屉
    const handleOpenEditProductDrawer = (row) => {
      //按钮文字修改 保存中... -> 保存
      drawer.loading = false;
      //回填表单中输入的数据
      product.id = row.id;
      product.productName = row.productName;
      product.productModel = row.productModel;
      product.productModelId = row.productModelId;
      product.createTime = row.createTime;
      //打开抽屉
      drawer.visible = true;
      //设置抽屉标题
      drawer.title = "修改产品信息";
      //显示更新按钮
      drawer.updateBtnIsShow = true
      //隐藏保存按钮
      drawer.saveBtnIsShow = false
    }

    //更新产品
    const handleEditProduct = async () => {
      //点击提交按钮后按钮文字发生改变
      timer = setTimeout(() => {
        drawer.loading = true;
        drawer.visible = false;
      }, 300);

      try {
        //更新产品
        const updateProductResponse = await editProduct(product);
        //更新产品成功或者失败反馈
        if (updateProductResponse.data.code == "200") {
          ElMessage({
            message: "更新产品成功",
            type: "success",
            plain: true,
          });
        } else {
          ElMessage({
            message: "更新产品失败",
            type: "error",
            plain: true,
          });
        }
        const getProductsResponse = await getProducts(pagination);
        products.value = getProductsResponse.data.list;
        pagination.total = getProductsResponse.data.total;
      } catch (error) {
        ElMessage({
          message: "更新产品失败" + error,
          type: "error",
          plain: true,
        });
      }
    }

    //删除产品
    const handleDeleteProduct = async (row) => {
      try {
        //删除产品
        const deleteProductByIdResponse = await deleteProductById(row.id);
        //删除产品成功或者失败反馈
        if (deleteProductByIdResponse.data.code == "200") {
          ElMessage({
            message: "删除产品成功",
            type: "success",
            plain: true,
          });
        } else {
          ElMessage({
            message: "删除产品失败",
            type: "error",
            plain: true,
          });
        }
        const getProductsResponse = await getProducts(pagination);
        products.value = getProductsResponse.data.list;
        pagination.total = getProductsResponse.data.total;
      } catch (error) {
        ElMessage({
          message: "删除产品失败" + error,
          type: "error",
          plain: true,
        });
      }
    }

    return {
      drawer,
      product,
      products,
      pagination,
      handleSizeChange,
      handleCurrentPageChange,
      dateFormatter,
      handleOpenAddProductDrawer,
      handleAddProduct,
      handleCancelForm,
      handleOpenEditProductDrawer,
      handleEditProduct,
      handleDeleteProduct
    };
  },
};
</script>

<style scoped></style>
