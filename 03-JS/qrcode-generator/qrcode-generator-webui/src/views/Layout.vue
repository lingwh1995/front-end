<template>
  <el-row style="height:50px">
    <el-col :span="24">
      <Header style="height:100%"></Header>
    </el-col>
  </el-row>
  <el-row style="flex: 1;">
    <el-col :span="3">
      <ContainerLeft style="height: 100%;"></ContainerLeft>
    </el-col>
    <el-col :span="21" style="background-color: #F5F7FA;">
      <ContainerRight style="height: 100%;"></ContainerRight>
    </el-col>
  </el-row>
</template>

<script>
import Header from '@/components/Header.vue'
import ContainerLeft from '@/components/ContainerLeft.vue'
import ContainerRight from '@/components/ContainerRight.vue'
export default {
  name: 'Layout',
  components: {
    Header,
    ContainerLeft,
    ContainerRight
  }
}
</script>