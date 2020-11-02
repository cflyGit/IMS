<template>
    <section>
        <div class="project-application-title"><h1>项目申请</h1></div>
        <a-form :form="form" :label-col="labelCol" :wrapper-col="wrapperCol" @submit="handleSubmit">
            <template v-for="(item, index) in pro_application">
                <a-form-item  :key=index :label=item>
                    <a-input v-decorator="[pro_application_en[index], { rules: [{ required: true, message: item+'不能为空' }] },]" :placeholder=item />
                </a-form-item>
            </template>
            <template>
                <a-form-item label="标签">
                    <yan-tag @updateTags="updateTags" ref="yanTag"></yan-tag>
                </a-form-item>
            </template>
            <template>
                <a-form-item label="详细信息">
                    <a-textarea placeholder="详细信息" v-decorator="['info', {valuePropName: 'info',initialValue: '详细信息',}]" :rows="5" />
                </a-form-item>
            </template>
            <template>
                <a-form-item label="申请文件">
                    <a-upload
                            name="uploadFile"
                            method="post"
                            :headers="headers"
                            :multiple="true"
                            :action=upload_url
                            :default-file-list=defaultFileList>
                        <a-button> <a-icon type="upload" /> 上传 </a-button>
                    </a-upload>
                </a-form-item>
            </template>

            <a-col :span="24" :push="5" :style="{ marginTop: '30px'}">
                <a-button type="danger"  html-type="submit">提交申请</a-button>
                <a-button type="default" :style="{ marginLeft: '8px' }" @click="handleClear">清空</a-button>
            </a-col>
        </a-form>
    </section>
</template>

<script>
    import {getTime} from "@/store/modules/getTime";
    import {mapGetters} from "vuex";
    import {insert} from "@/api/user"
    import {baseUrl} from '@/config/request'
    import yanTag from '@/components/project/yan-tag'

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
                tags: [],
                upload_url: baseUrl + 'project/application/uploadFile',
            }
        },

        components:{
            yanTag,
        },

        computed:{
            ...mapGetters([
               'project_item',
                'pro_application',
                'pro_application_en',
            ]),

            headers(){
                return {
                    'Authorization': this.$store.getters.token,
                }
            }
        },

        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, values) => {
                    if (!err) {
                        values.application_time = getTime("yyyy-MM-dd hh:mm:ss");
                        values.status = 0;
                        values.tags = this.tags.join("|");
                        console.log(values);
                        insert("project", values).then(res => {
                            if (res.success === true) {
                                this.$message.success("提交成功");
                                this.handleClear();
                            }
                        })
                    }
                })
            },

            handleClear() {
                this.form.resetFields();
                this.tags=[];
                this.$refs.yanTag.handleClear();
            },

            updateTags(tags) {
                this.tags = tags;
            }
        }
    }
</script>

<style scoped>
    .project-application-title {
        text-align: center;
        padding: 10px;
    }
</style>