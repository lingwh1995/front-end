<template>
  <el-row class="tac">
    <el-col>
      <el-menu active-text-color="#ffd04b" background-color="#304156" :default-openeds="['1','1-1']"
        text-color="#fff" @open="handleOpen" @close="handleClose" style="height:100%">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <grid />
            </el-icon>
            <span>生成图码</span>
          </template>
          <el-menu-item index="1-1">
            <el-icon>
              <printer/>
            </el-icon>
            <router-link class="list-group-item" active-class="active" to="/barcodes-list">
              <span>生成条码</span></router-link>
          </el-menu-item>
        </el-sub-menu>

        <!-- TODO 这里暂时注释掉了 -->
        <!--
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <setting />
            </el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item index="2-1" >
            <el-icon>
              <notebook />
            </el-icon>
            <router-link class="list-group-item" active-class="active"
              to="/system/scheme"><span>方案管理</span></router-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <el-icon><icon-menu /></el-icon>
            <router-link class="list-group-item" active-class="active" to="/system/dict"><span>字典管理</span></router-link>
          </el-menu-item>
          <el-menu-item index="2-3">
            <el-icon><list/></el-icon>
            <router-link class="list-group-item" active-class="active" to="/system/rule"><span>规则管理</span></router-link>
          </el-menu-item>
          <el-menu-item index="2-4">
            <el-icon><icon-menu /></el-icon>
            <router-link class="list-group-item" active-class="active" to="/system/template"><span>模板管理</span></router-link>
          </el-menu-item>
        </el-sub-menu>
        -->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { ref,onMounted } from "vue";

import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  Notebook,
  List,
  User,
  Grid,
  Printer
} from "@element-plus/icons-vue";

import { useRouter } from "vue-router"

export default {
  name: "ContainerLeft",
  components: {
    Document,
    IconMenu,
    Location,
    Setting,
    Notebook,
    List,
    User,
    Grid,
    Printer 
  },
  setup() {
    const isCollapse = ref(true);
    const handleOpen = () => {

    };
    const handleClose = () => {

    };

    const router = useRouter()
    onMounted(()=> {
      router.push('/barcodes-list')
    })

    return {
      isCollapse,
      handleOpen,
      handleClose,
    };
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}

a {
  color: #42b983;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100%;
}
</style>
