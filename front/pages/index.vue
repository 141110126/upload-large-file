<template>
  <div class="login-container">
    <el-form class="login-form">
      <!-- 邮箱 -->
      <el-form-item props="email">
        <span>
          <i class="el-icon-mobile" />
        </span>
        <el-input placeholder="密码" />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item props="passwd">
        <span>
          <i class="el-icon-lock" />
        </span>
        <el-input placeholder="密码" />
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item props="passwd">
        <el-input placeholder="验证码" />
        <img :src="captchaUrl" alt="验证码" @click="updateCaptcha">
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  layout: 'login',
  data () {
    return {
      rules: [],
      captchaUrl: '/api/captcha?t=' + new Date().getTime()
    }
  },
  methods: {
    updateCaptcha () {
      this.captchaUrl = '/api/captcha?t=' + new Date().getTime()
    }
  }
}
</script>
<style lang="scss">
  .login-form {
    width: 400px;
    margin: 50px auto;
  }
</style>
