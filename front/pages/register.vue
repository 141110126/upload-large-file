<template>
    <div class="login-container">
        <el-form ref="registerForm" class="login-form" label-width="100px" :model="form" :rules="rules">
            <!-- 邮箱 -->
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" placeholder="请输入邮箱" />
            </el-form-item>
            <!-- 验证码 -->
            <el-form-item label="验证码" :inline="true" prop="captcha">
                <el-input v-model="form.captcha" placeholder="请输入验证码" />
                <div class="captcha">
                    <img :src="code.captcha" alt="验证码" @click="updateCaptcha">
                </div>
            </el-form-item>

            <!-- 昵称 -->
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname" placeholder="请输入昵称" />
            </el-form-item>

            <!-- 密码 -->
            <el-form-item label="密码" prop="passwd">
                <el-input v-model="form.passwd" placeholder="请输入密码" />
            </el-form-item>
            <!-- 确认密码 -->
            <el-form-item label="确认密码" prop="repasswd">
                <el-input v-model="form.repasswd" placeholder="请再次输入密码" />
            </el-form-item>
            <!-- 注册按钮 -->
            <el-form-item>
                <el-button type="primary" @click.native.prevent="handleRegister">
                    注册
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import md5 from 'md5'
    export default {
        data() {
            return {
                form: {
                    email: '1566666666@qq.ocm',
                    captcha: '',
                    nickname: '111',
                    passwd: '111111',
                    repasswd: '111111'
                },
                rules: {
                    email: [
                        { required: true, message: '请输入邮箱' },
                        { type: 'email', message: '请输入正确的邮箱格式' }
                    ],
                    captcha: [
                        { required: true, message: '请输入验证码' }
                    ],
                    nickname: [
                        { required: true, message: '请输入昵称' }
                    ],
                    passwd: [
                        { required: true, pattern: /^[\w_-]{6,12}$/g, message: '请输入密码' }
                    ],
                    repasswd: [
                        { required: true, message: '请再次输入密码' },
                        {
                            validator: (rule, value, callback) => {
                                if (value !== this.form.passwd) {
                                    callback(new Error('两次密码不一致'))
                                }
                                callback()
                            }
                        }
                    ]
                },
                code: {
                    captcha: '/api/captcha?t=' + new Date().getTime()
                }
            }
        },
        methods: {
            updateCaptcha() {
                this.captchaUrl = '/api/captcha?t=' + new Date().getTime()
            },
            handleRegister() {
                this.$refs.registerForm.validate(async (valid) => {
                    if (valid) {
                        console.log('校验成功')
                        const obj = {
                            email: this.form.email,
                            captcha: this.form.captcha,
                            nickname: this.form.nickname,
                            passwd: md5(this.form.passwd)
                            // repasswd: this.form.repasswd,
                        }
                        const ret = await this.$http.post('/user/register', obj)
                        if (ret.code === 0) {
                            this.$alert('注册成功', '成功', {
                                confirmButtonText: '去登录',
                                callback: () => {
                                    this.$router.push('/')
                                }
                            })
                        } else {
                            this.$message.error(ret.message)
                        }
                    } else {
                        console.log('校验失败')
                    }
                })
            }
        }
    }
</script>
<style lang="scss">

</style>