<template>
  <div class="login-warp">
    <el-form 
    class="login-form"
    label-position="top" label-width="80px" :model="formdata">
      <h2>用户登录</h2>
      <el-form-item label="用戶名">
        <el-input v-model="formdata.name"></el-input>
      </el-form-item>
      <el-form-item label="密 码">
        <el-input v-model="formdata.region"></el-input>
      </el-form-item>
      <el-button 
      class="login-btn"
      type="primary">登　录</el-button>
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
