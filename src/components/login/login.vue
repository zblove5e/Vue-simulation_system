<template>
  <div class="login-warp">
    <el-form 
    class="login-form"
    label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用戶名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密 码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button
      @click.prevent = "handleLogin()"
      class="login-btn"
      type="primary" 
      >登　录</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handleLogin() {
      const res = await this.$http.post('login',this.formdata)
        // 对象的解构赋值
        const {
          data,
          meta:{msg,status}
          } = res.data
        
        if (status === 200) {
          // 设置token
          localStorage.setItem('token', data.token)
          // 1. 登录成功 ， 跳转home页面
          this.$router.push({name: 'home'})
          // 2. 提示登录成功
          this.$message.success(msg)
        }
        else {
          this.$message.error(msg)
        }
    }
  }
};
</script>

<style>
.login-warp {
  height: 100%;
  background-color: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  background-color: #fff;
  width: 400px;
  border-radius: 20px;
  padding: 30px;
}
.login-btn {
  width: 400px;
}
</style>
