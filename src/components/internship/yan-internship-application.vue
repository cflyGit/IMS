<template>
    <div  v-if="current_internship.length !== 0">
        <a-descriptions :title=current_internship.name bordered>
            <a-descriptions-item label="项目编号">
                {{current_internship.project_id}}
            </a-descriptions-item>
            <a-descriptions-item label="项目基地">
                {{current_internship.base}}
            </a-descriptions-item>
            <a-descriptions-item label="负责人">
                {{current_internship.leader}}
            </a-descriptions-item>
            <a-descriptions-item label="地址">
                {{current_internship.leader}}
            </a-descriptions-item>
            <a-descriptions-item label="状态">
                <a-badge status="processing" :text="number2title[current_internship.status]+'中'" />
            </a-descriptions-item>
            <a-descriptions-item label="已招人数/招收人数">
                {{current_internship.recoreded}}/{{current_internship.number}}
            </a-descriptions-item>
            <a-descriptions-item v-if="current_internship.tags!=null" label="标签">
                <a-tag v-for="tag in current_internship.tags.split('|')" :key=tag color="grey">
                    {{tag}}
                </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="详细信息">
                {{current_internship.info}}
            </a-descriptions-item>
        </a-descriptions>

        <a-upload-dragger
                name="uploadFile"
                method="post"
                :headers="headers"
                :multiple="true"
                :action=upload_url
                @change="handleChange"
        >
            <p class="ant-upload-drag-icon">
                <a-icon type="inbox" />
            </p>
            <p class="ant-upload-text">
                上传简历<br>
                点击或将文件拖拽到此处
            </p>
            <p class="ant-upload-hint">
                支持文件格式：pdf
            </p>
        </a-upload-dragger>

        <div class="applyButton">
            <a-button type="primary" style="width: 10%" @click="handleApply">
                申请
            </a-button>
        </div>

    </div>
    <div v-else>
        <a-result title="还未添加项目!">
            <template #icon>
                <!--                    <a-icon type="smile" theme="twoTone" />-->
                <a-icon type="question" />
            </template>
            <template #extra>
                <a-button type="primary" icon="plus" @click="handleImport">
                    添加
                </a-button>
            </template>
        </a-result>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {IMSget} from "../../api/user";
    import {baseUrl} from "../../config/request";

    export default {
        name: "yan-job-application",

        data() {
            return{
                upload_url: baseUrl + '/student/uploadCV',
                upload_file_UUID: "",

            }
        },

        computed: {
            ...mapGetters([
                'current_internship',
                'number2title'
            ]),

            headers() {
                return {
                    'Authorization': this.$store.getters.token,
                }
            }
        },

        methods: {
            handleImport() {
                this.$router.push("/index");
                this.$store.commit('updateBread', "/index");
            },

            handleApply() {
                console.log(this.upload_file_UUID);
                IMSget("/student/apply/" + this.current_internship.project_id + "/" + this.upload_file_UUID).then(res => {
                    if (res.success == true) {
                        this.$message.success("申请成功");
                        this.$router.push("/internship/myInternship")
                        this.$store.commit('updateBread', "/internship/MyInternship");
                    }
                });
            },

            handleChange(info) {
                const status = info.file.status;
                const res = info.file.response;
                console.log(info);
                console.log(res);
                if (status === 'done') {
                    this.$message.success(`${info.file.name} 文件上传成功`);
                    this.upload_file_UUID = res.data;
                } else if (status === 'error') {
                    this.$message.error(`文件格式可能不正确，${info.file.name} 文件上传失败.`);
                }
            },
        }
    }
</script>

<style scoped>
.applyButton {
    margin-top: 20px;
    text-align: center;
}
</style>