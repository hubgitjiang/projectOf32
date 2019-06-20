<template>
  <div class="login">
    <div class="content">
      <!-- el-form: 表单的管理容器 status-icon 显示图标 model: 指定的数据源 rules: 设置验证规则  label-width：显示的文本宽度 -->
      <el-form :rules="rules" label-position="top" :model="userObj" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h2>用户登录</h2>
        <!-- el-form-item：表单元素的项 label：文本 -->
        <el-form-item label="用户名" prop="username">
          <!-- el-input: Element 中的表单元素 -->
          <el-input type="text" v-model="userObj.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="userObj.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="mybtn" @click.prevent="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 登录信息
      userObj: {
        username: '',
        password: ''
      },
      // 验证规则：
      rules: {
        username: [
          // required: 当前属性是必须的
          // message: 如果不填会出现的提示信息
          // trigger：触发这个规则的时间 blur 失去焦点
          { required: true, message: '请输入用户', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录
    login () {
      // validate: 表单验证
      //  参数：
      //    valid: 如果存在说明验证通过，不存在说明验证失败
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          // 发送请求：axios
          this.$http({
            method: 'POST',
            url: 'http://localhost:8888/api/private/v1/login',
            data: this.userObj
          }).then(res => {
            // 解构
            let { data, meta } = res.data
            // 判断
            if (meta.status === 200) {
              // 登录成功，跳转到首页
              this.$router.push('/')
              // 将 token 保存起来
              window.localStorage.setItem('token', data.token)
              // 提示成功
              this.$message({
                type: 'success',
                message: meta.msg
              })
            } else {
              this.$message.error(meta.msg)
            }
          }).catch(err => {
            console.log(err)
          })
        }
      })
    }
  }
}
</script>

<style>
.login {
  background-color: #324152;
  width: 100%;
  height: 100%;
  position: relative;
}

.content {
  width: 580px;
  height: 440px;
  padding: 40px;
  box-sizing: border-box;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
}

.mybtn {
  width: 100%;
}
</style>
