<template>
    <section>
        <div class="project-application-title"><h1>项目申请</h1></div>
        <a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol">
            <template v-for="(item, index) in project_item">
                <a-form-item  :key=index :label=item >
                    <a-input v-decorator="[item, { rules: [{ required: true, message: item+'不能为空' }] },]" :placeholder=item />
                </a-form-item>
            </template>

            <template>
                <a-form-item label="详细信息">
                    <a-textarea placeholder="详细信息" :rows="5" />
                </a-form-item>
            </template>
            <template>
                <a-form-item label="申请文件">
                    <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            :default-file-list=defaultFileList>
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                    </a-upload>
                </a-form-item>
            </template>

            <a-col :span="24" :push="5" :style="{ marginTop: '30px'}">
                <a-button type="danger"  @click="handleSubmit">提交申请</a-button>
                <a-button type="default" :style="{ marginLeft: '8px' }" @click="handleClear">清空</a-button>
            </a-col>
        </a-form>
    </section>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "yan-project-application",

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
                form: this.$form.createForm(this, { name: 'enroll' }),

                defaultFileList: [],
            }
        },

        computed:{
            ...mapGetters([
               'project_item',
            ])
        },

        methods: {
            handleSubmit() {

            },

            handleClear() {

            },
        }
    }
</script>

<style scoped>
    .project-application-title {
        text-align: center;
        padding: 10px;
    }
</style>