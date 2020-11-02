<template>
    <section class="individual-section">
        <h3 style="color: dodgerblue">单个基地信息录入</h3>

        <a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="handleSubmit">
            <template v-for="(item, index) in base_columns">
                <a-form-item  :key=index :label=item.title v-if=item.enroll>
                    <a-input v-decorator="[item.dataIndex, { rules: [{ required: item.require, message: item.title+'不能为空' }] },]" :placeholder=item.title />
                </a-form-item>
            </template>

            <a-form-item label="密码">
                <a-input v-decorator="['password', {valueProName: 'password', initialValue: '123456'}]"/>
            </a-form-item>


            <a-col :span="24" :push="5" :style="{ marginTop: '30px'}">
                <a-button type="primary" html-type="submit">
                    提交
                </a-button>
                <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
                    清空
                </a-button>
            </a-col>
        </a-form>
    </section>
</template>

<script>
    import {mapGetters} from 'vuex';
    import {getTime} from '@/store/modules/getTime';
    import {insert} from '@/api/user';

    export default {
        name: "base-individual",

        data() {
            return {
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 5 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 12 },
                },

                base_columns_require: [],

                form: this.$form.createForm(this, { name: 'enroll' }),
            };
        },

        computed: {
            ...mapGetters([
                'base_columns',
            ]),
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    console.log(values);
                    if (!err) {
                        values.register_time = getTime("yyyy-MM-dd hh:mm:ss");
                        insert("base", values).then(res=>{
                            if (res.success !== undefined && res.success === true) {
                                this.$message.success("提交成功");
                                this.handleReset();
                            }
                        })
                    }
                })
            },

            handleReset(){
                this.form.resetFields();
            },
        }
    }
</script>

<style scoped>
    .individual-section{
        text-align: left;
        margin-top: 10px;
    }
</style>