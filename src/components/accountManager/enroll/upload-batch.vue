<template>
    <section class="batch-section">
        <h3 style="color: dodgerblue">批量导入</h3>

        <a-upload-dragger
                name="file"
                :multiple="true"
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                @change="handleChange"
        >
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
                点击或将文件拖拽到此处
            </p>
            <p class="ant-upload-hint">
                支持文件格式：xlsx、txt.
            </p>
        </a-upload-dragger>
    </section>
</template>

<script>
    export default {
        name: "upload-batch",
        data() {
            return{}
        },
        methods: {
            handleChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    this.$message.success(`${info.file.name} 文件上传成功.`);
                } else if (status === 'error') {
                    this.$message.error(`${info.file.name} 文件上传失败.`);
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