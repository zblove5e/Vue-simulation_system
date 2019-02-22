<template>
  <el-card class="box-card">
    <!-- 1. 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 2. 搜索框 -->
    <el-row class="card-row">
      <el-col>
        <el-input clearable @clear="clearUser()" class="card-input" placeholder="请输入内容" v-model="query">
          <el-button slot="append" icon="el-icon-search" @click.prevent="searchUser()"></el-button>
        </el-input>
        <el-button type="success" class="card-btn" @click="showAddUserDio()">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- 3. 表格 -->
    <el-table :data="userList" style="width: 100%">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="username" label="姓名" width="100">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="200">
      </el-table-column>
      <el-table-column prop="mobile" label="电话" width="200">
      </el-table-column>
      <el-table-column label="创建时间" width="200">
        <template slot-scope="scope">
          {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>
      <el-table-column label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch 
          @change="changeUser(scope.row)"
          v-model="scope.row.mg_state" 
          active-color="#13ce66" 
          inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作" width="200">
        <template slot-scope="scope">
          <el-button 
          @click="showEditUserDia(scope.row)"
          plain size="mini" type="primary" icon="el-icon-edit" circle></el-button>
          <el-button 
          @click="showSetUserRole(scope.row)"
          plain size="mini" 
          type="success" 
          icon="el-icon-check" 
          circle></el-button>
          <el-button 
          @click="deleUser(scope.row.id)"
          plain size="mini" type="danger" icon="el-icon-delete" circle></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 4. 分页栏 -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum" :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <!-- 添加用户弹出框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" disabled autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="editUser()" >确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改用户权限对话框 -->
    <el-dialog title="权限修改" :visible.sync="dialogFormVisibleRole">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{currUsername}}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value= -1></el-option>
            <el-option 
            :label="item.roleName" 
            :value= "item.id"
            v-for="(item, i) 
            in role" 
            :key = i 
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
        <el-button type="primary" @click="changeUserRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>

</template>

<script>
export default {
  data() {
    return {
      query: "",
      // 渲染列表数组
      userList: [],
      // 分页相关数据
      pagenum: 1,
      pagesize: 2,
      total: -1,
      // 弹出框初始值属性
      dialogFormVisibleAdd:false,
      dialogFormVisibleEdit:false,
      dialogFormVisibleRole:false,
      // 添加弹出框form表单数据
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 权限分配
      // 当前角色id
      currUserId: -1,
      // 当前下拉框的v-model值
      currRoleId: -1,
      // 当前角色名
      currUsername: '',
      // 所有角色名
      role: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    // 修改角色权限
    async changeUserRole() {
      const res = await this.$http.put(`users/${this.currUserId}/role`,{rid:this.currRoleId})
      console.log(res);
      const {meta:{msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.dialogFormVisibleRole = false
      }
    },
    // 展示修改用户权限对话框
    async showSetUserRole(user) {
      this.dialogFormVisibleRole = true
      this.currUserId = user.id
      this.currUsername = user.username
      // 获取所有角色名称
      const res1 = await this.$http.get(`roles/`)
      
      this.role = res1.data.data
      // 获取当前用户的角色id
      const res = await this.$http.get(`users/${user.id}`)
      // console.log(res);
      this.currRoleId = res.data.data.rid
      
    },

    // 修改用户状态
    async changeUser(user){
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`, )
      // console.log(res);
      const {meta:{msg,status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
      }
    },

    // 修改用户请求
    async editUser() {
      this.dialogFormVisibleEdit = false
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      // console.log(res);
      const {meta:{msg, status}} = res.data
      if (status === 200) {
        this.$message.success(msg)
        this.getUserList()
      } else {
        this.$message.warning(msg)
      }
    },

    // 修改用户展示
    showEditUserDia(user) {
      this.dialogFormVisibleEdit = true
      this.form = user

    },
    // 删除用户
    deleUser(userId) {
        this.$confirm('删除用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(async () => {
            // 发送删除请求
            const res = await this.$http.delete(`users/${userId}`)
            // console.log(res)
            const {meta:{msg, status}} = res.data
            if (status === 200) {
              this.pagenum = 1
              // 1. 更新视图
              this.getUserList()
              // 2. 提示成功
                this.$message({
                type: 'success',
                message: msg
            });
            } 
         
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });          
        });
    },
    
    // 点击发送添加用户请求
    async addUser() {
      // 关闭对话框
      this.dialogFormVisibleAdd = false
      const res = await this.$http.post(`users`, this.form)
      // console.log(res)
      const {meta:{status, msg},data} = res.data
      if (status === 201) {
        // 1. 提示成功
        this.$message.success(msg)
        // 2. 更新视图
        this.getUserList()
        // 3. 清空表单中数据
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
    },

    // 展示添加用户对话框
    showAddUserDio() {
      this.form = {}
      this.dialogFormVisibleAdd = true
    },
    // 点击x 重新获取列表数据
    clearUser() {
      this.getUserList();
    },
    // 搜索用户
    searchUser() {
      this.getUserList();
    },

    // 分页相关方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.pagenum = 1;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.getUserList();
    },

    async getUserList() {
      // 设置请求头
      const AUTH_TOKEN = localStorage.getItem("token");
      this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;

      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${
          this.pagesize
        }`
      );
      // console.log(res);
      const { data: { users, total }, meta: { msg, status } } = res.data;
      if (status === 200) {
        // 1. 给表格数据赋值
        this.userList = users;
        // 2. 给total赋值
        this.total = total;
        // 3. 提示框
        // this.$message.success(msg);
      } else {
        this.$message.warning(msg);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 100%;
}
.card-input {
  width: 300px;
}
.card-row {
  margin-top: 20px;
}
.card-btn {
  width: 100px;
}
</style>
