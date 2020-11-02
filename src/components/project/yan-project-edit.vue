<template>
    <div>
        <div  v-if="current_project.length !== 0">
            <a-row>
                <a-col class="edit-left" :span="12">

                    <a-descriptions :title=current_project.name bordered>
                        <a-descriptions-item label="项目编号">
                            {{current_project.project_id}}
                        </a-descriptions-item>
                        <a-descriptions-item label="项目基地" :span="2">
                            {{current_project.base}}
                        </a-descriptions-item>
                        <a-descriptions-item label="申请时间">
                            {{current_project.application_time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="审核时间" :span="2">
                            {{current_project.audit_time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="签订时间" >
                            {{current_project.signed_time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="发布时间" :span="2">
                            {{current_project.publish_time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="结束时间">
                            {{current_project.finished_time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="状态" :span="2">
                            <a-badge status="processing" :text="number2title[current_project.status]+'中'" />
                        </a-descriptions-item>
                        <a-descriptions-item label="已招人数/招收人数" :span="3">
                            {{current_project.recoreded}}/{{current_project.number}}
                        </a-descriptions-item>
                        <a-descriptions-item v-if="current_project.tags!=null" label="标签" :span="3">
                            <a-tag v-for="tag in current_project.tags.split('|')" :key=tag color="grey">
                                {{tag}}
                            </a-tag>
                        </a-descriptions-item>
                        <a-descriptions-item label="详细信息" :span="2">
                            {{current_project.info}}
                        </a-descriptions-item>
                    </a-descriptions>

                    <a-divider>意见</a-divider>
                    <a-row>
                        <a-col :span="20">
                            <a-list item-layout="horizontal">
                                <a-list-item v-for="(item, index) in tab_pane_title" :key=index>
                                    <label>{{item}}</label>
                                    <template >
                                        <a-textarea :placeholder=item v-model=audit_comments[index] autoSize allowClear :disabled="number2title[current_project.status] !== item"/>
                                    </template>
                                </a-list-item>
                            </a-list>
                            <a-form :form="form">
                                <a-form-item label="核对人">
                                    <a-input v-decorator="['audit',{rules: [{ required: true, message: '核对人不能为空!' }],}]" placeholder="核对人"></a-input>
                                </a-form-item>
                            </a-form>
                        </a-col>

                        <a-col class="timeline-wrapper" :span="4">
                            <a-timeline mode="right">
                                <a-timeline-item v-for="(item, index) in tab_pane_title" :key=index :color=pro_color(index)>
                                    <a-icon v-if="title2number[index] == current_project.status" slot="dot" type="clock-circle-o" style="{font-size: 16px;}" />
                                    {{item}}
                                </a-timeline-item>
                            </a-timeline>
                        </a-col>
                    </a-row>
                    <div class="agreeButton">
                        <a-button type="danger" icon="close" @click="handleDisagree">
                            退回
                        </a-button>
                        <a-button type="primary" icon="check" style="margin-left: 30px" @click="handleAgree">
                            同意
                        </a-button>
                    </div>

                </a-col>

                <a-col class="edit-right" :span="12">
                    <div class="show_file">
                        <span class="right-title">项目文件</span><br>
                        <span v-if="hasPrePage" @click="prePage">
                             <a-icon type="left" style="fontSize: 20px; color: white"></a-icon>
    <!--                        <label style="font-size: 10px">上一页</label>-->
                            &nbsp;&nbsp;
                        </span>
                        <img src="../../assets/img/page_000001.png" width="80%" />
                        <span v-if="hasNextPage" @click="nextPage">
                            &nbsp;&nbsp;
    <!--                        <label style="font-size: 10px">下一页</label>-->
                            <a-icon type="right" style="fontSize: 20px; color: white"></a-icon>
                        </span>
                    </div>
                </a-col>
            </a-row>
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
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {update, post} from "@/api/user"

    export default {
        name: "yan-project-edit",

        data() {
            return {
                hasNextPage: true,
                hasPrePage: true,

                cur_file_index: 0,
                file_list: ["/img/page_000001.png"],

                form: this.$form.createForm(this, { name: 'audit' }),
            }
        },

        computed: {
            pro_color() {
                return function (index) {
                    let dict = {};
                    let count = 0;
                    for (let t in this.$store.getters.title2number) {
                        dict[t] = count++;
                    }
                    if (this.$store.getters.current_project.status > dict[index]) {
                        return "green";
                    } else if (this.$store.getters.current_project.status === dict[index]) {
                        return "red";
                    }

                    return "grey";
                }
            },
            ...mapGetters([
                'current_project',
                'tab_pane_title',
                'number2title',
                'title2number',
                'number2title_en',
                'audit_info',
                'audit_comments',
            ])
        },
        methods: {
            handleAgree() {
                this.form.validateFields((err, value) => {
                    if (!err) {
                        let param = {};
                        let status = this.number2title_en[this.current_project.status];
                        param[status + "_comments"] = this.audit_comments[status];
                        param[status + "_reviewer"] = value["audit"];
                        param["project_id"] = this.current_project.project_id;
                        update("audit", param).then(res => {
                            if (res.success === true) {
                                this.$message.success("操作成功！");
                            }
                        });
                    }
                })

            },

            handleDisagree() {
                post(("audit/statusBack"), this.audit_info).then(res => {
                    if (res.success === true) {
                        this.$message.success("操作成功");
                    }
                })
            },

            handleImport() {
                this.$router.push("/project/dashboard");
                this.$store.commit('updateBread', "/project/dashboard");
            },

            nextPage() {
                this.cur_file_index++;
                if (this.cur_file_index === this.file_list.length) {
                    this.hasNextPage = false;
                }

                // console.log("下一页");
            },

            prePage() {
                this.cur_file_index--;
                if (this.cur_file_index === 0) {
                    this.hasPrePage = false;
                }
                // console.log("上一页")
            }
        },


    }
</script>

<style scoped>
    .timeline-wrapper {
        display: block;
        margin-top: 10%;
    }

    .edit-left{
        padding: 20px 40px 40px 20px;
        border-left-radius: 10px;
    }

    .right-title {
        color: white;
        font-weight: bold;
    }
    .show_file{
        /*margin-top: 20px;*/
        padding: 20px 40px 40px 20px;
        background: rgba(36, 36, 36, 0.89);
        text-align: center;
        border-right-radius: 10px;
    }

    .agreeButton{
        text-align: center;
    }
</style>