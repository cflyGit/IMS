<template>
    <div class="login_page">

        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">

                <div class="titleArea">
                    <img class="logo" :src="cloud" alt="云研">
                    <span>云<span style="color: #FF6C60">Yan</span></span>
                </div>

                <a-form id="form-login" :form="form" class="login-form" @submit="handleSubmit">
                    <a-form-item>
                        <a-select defaultValue="admin" @change="handleSelectChange">
                            <a-select-option value="admin">
                                管理员
                            </a-select-option>
                            <a-select-option value="user">
                                用户
                            </a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                                v-decorator="['user',{ rules: [{ required: true, message: '请输入账号!' }] },]" placeholder="账号">
                            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input v-decorator="['password',{ rules: [{ required: true, message: '请输入密码!' }] },]" type="password" placeholder="密码">
                            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,},]">
                            记住密码
                        </a-checkbox>
                        <a class="login-form-forgot" href="">
                            忘记密码
                        </a>
                        <a-button type="primary" html-type="submit" class="login-form-button">
                            登录
                        </a-button>
                        <a href="">
                            马上注册!
                        </a>
                    </a-form-item>
                </a-form>

            </section>
        </transition>

    </div>
</template>

<script>
    import logoImg from "@/assets/img/logo.png"
    import cloudImg from '@/assets/icon/cloud.png'
    export default {
        name: "login",

        data() {
            return {
                logo: logoImg,
                cloud: cloudImg,
            }
        },

        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },

        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        console.log('Received values of form: ', values);
                    }
                });
            },

            handleSelectChange() {

            }
        },
    }
</script>

<style scoped>
    .login_page {
        position: absolute;
        width: 100%;
        height: 100%;
        background: #2c3e50;
        background_size: 100% 100%;
    }

    .form_contianer {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        width: 370px;
        border-radius: 5px;
        padding: 25px;
        text-align: center;
    }
    .titleArea {
        justify-content: center;
        align-items: center;
        text-transform: uppercase;
        font-size: 22px;
        width: 100%;
        padding-bottom: 20px;
    }

    .logo {
        width: 40px;
        margin-right: 10px;
    }

    #form-login .login-form {
        max-width: 300px;
    }
    #form-login .login-form-forgot {
        float: right;
    }
    #form-login .login-form-button {
        width: 100%;
    }
</style>