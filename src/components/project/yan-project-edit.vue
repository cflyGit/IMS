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
                            {{current_project.time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="审核时间" :span="2">
                            {{current_project.time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="签订时间" >
                            {{current_project.time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="发布时间" :span="2">
                            {{current_project.time}}
                        </a-descriptions-item>
                        <a-descriptions-item label="状态" :span="3">
                            <a-badge status="processing" :text="tab_pane_title[current_project.status]+'中'" />
                        </a-descriptions-item>
                        <a-descriptions-item label="已招人数/招收人数" :span="3">
                            {{current_project.recoreded}}/{{current_project.number}}
                        </a-descriptions-item>
                        <a-descriptions-item label="标签" :span="3">
                            <a-tag v-for="tag in current_project.label" :key=tag color="grey">
                                {{tag}}
                            </a-tag>
                        </a-descriptions-item>
                        <a-descriptions-item label="详细信息" :span="3">
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
                                        <a-textarea :placeholder=item autoSize :disabled="current_project.status !== index"/>
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
                                    <a-icon v-if="index == current_project.status" slot="dot" type="clock-circle-o" style="{font-size: 16px;}" />
                                    {{item}}
                                </a-timeline-item>
                            </a-timeline>
                        </a-col>
                    </a-row>
                    <a-button type="danger" icon="check" style="display:block;margin:0 auto" @click="handleAgree">
                        同意并移交给下一阶段
                    </a-button>
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
                    for (let t in this.$store.getters.tab_pane_title) {
                        dict[t] = count++;
                    }
                    if (dict[this.$store.getters.current_project.status] > dict[index]) {
                        return "green";
                    } else if (dict[this.$store.getters.current_project.status] === dict[index]) {
                        return "red";
                    }

                    return "grey";
                }
            },
            ...mapGetters([
                'current_project',
                'tab_pane_title',
            ])
        },
        methods: {
            handleAgree() {
                this.$message.success("操作成功，已移交给***");
            },

            handleImport() {
                this.$router.push("/project/dashboard");
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
</style>