<template>
    <section class="batch-section">
        <h3 style="color: dodgerblue">批量导入</h3>

        <a-upload-dragger
                name="uploadFile"
                method="post"
                :multiple="true"
                :action=upload_url
                @change="handleChange"
        >
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
                点击或将文件拖拽到此处
            </p>
            <p class="ant-upload-hint">
                支持文件格式：xlsx、xls.
            </p>
        </a-upload-dragger>
    </section>
</template>

<script>
    import {baseUrl} from '@/config/request'

    export default {
        name: "upload-batch",
        data() {
            return{
                // admin 功能
                upload_url: baseUrl + '/admin/' + 'upload/' + this.$router.currentRoute.path.split('/')[2],
            }
        },
        methods: {
            handleChange(info) {
                const status = info.file.status;
                if (status === 'done') {
                    if (info.file.response.code === 200)
                        this.$message.success(`${info.file.name} 文件上传成功, 记录已导入.`);
                    else
                        this.$message.warning(`文件中行数为:${info.response.data.data.toString()}的记录导入失败，请检查后重新导入`);
                } else if (status === 'error') {
                    this.$message.error(`文件格式可能不正确，${info.file.name} 文件上传失败.`);
                }
            },
        },

        handlePreview(file) {
            console.log("uploadfile: " + file);
        }
    }
</script>

<style scoped>
    .batch-section{
        text-align: left;
        margin-top: 10px;
    }
</style>