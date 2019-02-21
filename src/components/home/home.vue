<template>
  <el-container class="home-warp">
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="pic" src="@/assets/guoguo.jpg" alt="无法显示图片">
          </div>
        </el-col>
        <el-col :span="18">
          <h3>BTS管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="logout" @click.prevent="logOut()">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <!-- 侧边栏导航 -->
      <el-aside width="200px">
        <el-menu :unique-opened="true">
          <!-- 1 -->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-circle-check"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="2-1">
              <i class="el-icon-circle-check"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="2-1">
              <i class="el-icon-circle-check"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-circle-check"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-circle-check"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-1">
              <i class="el-icon-circle-check"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>

          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-circle-check"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>

          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-circle-check"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 内容主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate() {
    // 获取token
    const token = localStorage.getItem('token')
    // if token 有  --- 渲染组件
    if (!token) {
    // token 没有--- push 登录页
      this.$router.push({name : 'login'})
    }
  },
  methods: {
    logOut() {
    // 1. 清楚token
      localStorage.clear()
      // 退回到登录页
      this.$router.push({name: 'login'})
      // 2. 提示退出成功
      this.$message.success('退出成功')
    }
    
  },
};
</script>

<style>
.home-warp {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.logout {
  text-decoration: none;
  line-height: 60px;
  cursor: pointer;
}
.pic {
  height: 60px;
  width: 200px;
}
</style>
