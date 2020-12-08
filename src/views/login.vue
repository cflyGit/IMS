<template>
    <div class="login_page">

        <transition name="form-fade" mode="in-out">
            <section class="form_contianer">

                <div class="titleArea">
                    <img class="logo" :src="cloud" alt="云研">
                    <span>云<span style="color: #FF6C60">Yan</span></span>
                </div>

                <a-form id="form-login" :form="form" class="login-form" @submit="handleSubmit">
<!--                    <a-form-item>-->
<!--                        <a-select defaultValue="admin" @change="handleSelectChange" v-decorator="['actor', {valuePropName: 'actor',initialValue: 'admin',}]">-->
<!--                            <a-select-option value="admin">-->
<!--                                管理员-->
<!--                            </a-select-option>-->
<!--                            <a-select-option value="tutor">-->
<!--                                导师-->
<!--                            </a-select-option>-->
<!--                            <a-select-option value="student">-->
<!--                                学生-->
<!--                            </a-select-option>-->
<!--                            <a-select-option value="base">-->
<!--                                基地-->
<!--                            </a-select-option>-->
<!--                        </a-select>-->
<!--                    </a-form-item>-->
                    <a-form-item>
                        <a-input
                                v-decorator="['user_id',{ rules: [{ required: true, message: '请输入账号!' }] },]" placeholder="账号">
                            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-input
                                v-decorator="['password',{ rules: [{ required: true, message: '请输入密码!' }] },]" type="password" placeholder="密码">
                            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)"/>
                        </a-input>
                    </a-form-item>
                    <a-form-item>
                        <a-row>
                            <a-col :span="12">
                                <a-input v-decorator="['identify', {rules: [{reuired: true, message:'验证码错误！'}] }, ]" type="identify" placeholder="验证码"></a-input>
                            </a-col>
                            <a-col :span="12">
                                <div class="code" @click="refreshCode">
                                    <s-identify :identifyCode="identifyCode"></s-identify>
                                </div>
                            </a-col>
                        </a-row>
                    </a-form-item>
                    <a-form-item>
                        <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true,},]">
                            下次自动登录
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
    import {login} from '@/api/login'
    import SIdentify from '@/components/identify/identify'

    export default {
        name: "login",

        data() {
            return {
                logo: logoImg,
                cloud: cloudImg,

                loginForm: {
                    username: '账号',
                    password: '密码',
                },

                identifyCodes: "1234567890abcdefghijklmnopqrstuvwxyz",
                identifyCode: "",
            }
        },

        components:{
            SIdentify,
        },

        beforeCreate() {
            this.form = this.$form.createForm(this, {name: 'normal_login'});
        },

        mounted() {
            this.identifyCode = "";
            this.makeCode(this.identifyCodes, 4);
        },

        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        if (values.identify === this.identifyCode) {
                            this.loginForm.username = values.user_id;
                            this.loginForm.password = values.password;
                            login(values.actor, this.loginForm).then(res => {
                                if (res.code === 200 || res.code === "200") {
                                    let data = {
                                        'user': res.username,
                                        'token': res.token,
                                        'actor': res.actor,
                                    }
                                    this.$store.dispatch('setUserInfo', data);
                                    this.$store.dispatch('changeMenus', this.$store.getters.actor2roles[this.$store.getters.actor]);
                                }
                            });
                        }else {
                            this.$message.error("验证码错误");
                        }
                    }else {
                        this.$message.error("用户名或密码不能为空！");
                    }
                })
            },

            randomNum(min, max) {
                return Math.floor(Math.random() * (max - min) + min);
            },
            refreshCode() {
                this.identifyCode = "";
                this.makeCode(this.identifyCodes, 4);
            },
            makeCode(o, l) {
                for (let i = 0; i < l; i++) {
                    this.identifyCode += this.identifyCodes[
                        this.randomNum(0, this.identifyCodes.length)
                        ];
                }
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