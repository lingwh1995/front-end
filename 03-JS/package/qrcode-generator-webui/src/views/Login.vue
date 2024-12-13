<template>
  <div class="app-container">
    <div class="login">
      <div class="header">
        用户登录
      </div>
      <div class="container">
        <el-form :model="user">
          <el-form-item>
            <el-input v-model="user.username" type="text" placeholder="请输入用户名称" clearable/>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="user.password" type="password" placeholder="请输入用户密码" clearable/>
          </el-form-item>
        </el-form>
      </div>
      <div class="footer" @click="handleLogin">
        登录
      </div>
    </div>

  </div>
</template>

<script>
import { reactive } from 'vue';
import { login } from '@/api/user.js'
import { ElMessage } from "element-plus";
import { useRouter } from 'vue-router'

export default {
  name: "Login",
  setup() {
    const user = reactive({
      username: '',
      password: ''
    })
    const router = useRouter()
    const handleLogin = async() => {
      const response = await login(user)
      if(response.code == 200) {  //说明登录成功
        //获取tokentoken
        const token = response.data
        //把获取到的token存储起来
        localStorage.setItem('token',token)
        //页面跳转
        router.push('/layout');
      }else {
        ElMessage({
          message: "用户名或密码输入错误，请重新输入。",
          type: "error",
          plain: true,
        });
      }
    }

    return {
      user,
      handleLogin
    }
  }  
}
</script>

<style scoped>
  .app-container {
    background-color: #0f2027F0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .app-container .login {
    width: 350px;
    background: #0f2027;
  }
  .app-container .login .header {
    height: 50px;
    text-align: center;
    line-height: 50px;
    letter-spacing: 10px;
    font-size: 30px;
    font-weight: 500;
    color: #1b9b94;
    font-family: 楷体;
  }
  .app-container .login .container {
    font-size: 0px;
  }
  .app-container .login .container .el-form-item {
    height: 35px;
    margin: 6px 10px;
    border-radius: 3px;
  }
  .app-container .login .container .input {

  }
  .app-container .login .footer {
    height: 35px;
    line-height: 35px;
    text-align: center;
    letter-spacing: 5px;
    font-size: 15px;
    font-weight: 500;
    color: #1b9b94;
    border: 1px solid #1b9b94;
    border-radius: 3px;
    margin: 10px 10px;
    cursor: pointer;
    user-select: none;
  }
  
</style>
