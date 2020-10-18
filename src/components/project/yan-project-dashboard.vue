<template>
    <section class="project_publish_wrapper">
        <a-date-picker
                v-model="startValue"
                :disabled-date="disabledStartDate"
                :locale="locale"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="起始时间"
                @openChange="handleStartOpenChange"
        />
        <a-date-picker
                v-model="endValue"
                :disabled-date="disabledEndDate"
                :locale="locale"
                show-time
                format="YYYY-MM-DD HH:mm:ss"
                placeholder="截止时间"
                :open="endOpen"
                @openChange="handleEndOpenChange"
        />

        <a-input-search placeholder="搜索" style="width: 400px" @search="onSearch" :loading="loading" enter-button />

        <a-tabs :tab-position="tabPosition" @change="tab_change">
            <a-tab-pane v-for="(_tab, index) in tab_pane_title" :key=index :tab=_tab>
                <a-list :data-source=current_project_list bordered>
                    <a-list-item slot="renderItem" :key="`a-${item.id}`" slot-scope="item">
                        <a slot="actions" @click="showDrawer(item)"><a-icon type="double-left" /></a>
                        <a-list-item-meta :description=item.base>
                            <a slot="title" @click="to_project_edit(item)">{{ item.name }}</a>
                            <a-avatar
                                    slot="avatar"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                            />
                        </a-list-item-meta>
                    </a-list-item>
                </a-list>
            </a-tab-pane>
        </a-tabs>

        <a-drawer width="650" placement="right" :closable="false" :visible="visible" @close="onClose">
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
                    <a-badge status="processing" :text="tab_pane_title[current_tab]+'中'" />
                </a-descriptions-item>
                <a-descriptions-item label="已招人数/招收人数" :span="3">
                    {{current_project.recoreded}}/{{current_project.number}}
                </a-descriptions-item>
                <a-descriptions-item v-if="current_project.tags!=null" label="标签" :span="3">
                    <a-tag v-for="tag in current_project.tags.split('|')" :key=tag color="grey">
                        {{tag}}
                    </a-tag>
                </a-descriptions-item>
                <a-descriptions-item label="详细信息" :span="3">
                    {{current_project.info}}
                </a-descriptions-item>
            </a-descriptions>
        </a-drawer>
    </section>
</template>

<script>
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import {mapGetters} from "vuex";
    import {search} from "@/api/user";

    export default {
        name: "yan-project-dashboard",

        data() {
            return {
                startValue: null,
                endValue: null,
                endOpen: false,

                locale,

                visible: false,
                // current_project: [],
                tabPosition: 'top',
                loading: false,
                current_tab: "application",
            }
        },
        computed:{
            ...mapGetters([
                'tab_pane_title',
                'current_project_list',
                'title2number',
                'current_project',
            ]),
        },

        mounted: function() {
            this.tab_change(this.current_tab);
        },

        methods: {
            onSearch(value) {
                var that = this;
                //设置加载中状态
                that.loading = true;
                let url = null;
                if (!(value === "" || value === null)) {
                    url = "project/findByName/" + value;
                }else if (this.startValue != null || this.endValue != null) {
                    url = "project/findByDate/" + this.startValue + "/" + this.endValue + "/" + this.current_tab;
                }
                if (url !== null) {
                    search(url).then(res => {
                        that.loading = false;
                        if (res.data.code == 200) {
                            this.$store.dispatch('pro_update_current_project_list', res.data.data);
                            this.$message.success("查询成功");
                        }else {
                            this.$store.dispatch('pro_update_current_project_list', []);
                            this.$message.error("出错!请稍后再试");
                        }
                    });
                }else {
                    this.$message.error("请输入搜索内容！");
                }

                setTimeout(function () {
                    that.loading = false;
                }, 3000);
            },

            tab_change(activeKey) {
                this.current_tab = activeKey;
                search("project/findByStatus/" + this.title2number[this.current_tab]).then(res => {
                    if (res.data.code == 200) {
                        this.$store.dispatch('pro_update_current_project_list', res.data.data);
                    }else {
                        this.$store.dispatch('pro_update_current_project_list', []);
                    }
                })
            },

            to_project_edit(item) {
                this.$store.commit('update_current_project', item);
                search("audit/findById/" + this.current_project.project_id).then(res => {
                    if (res.data.code == 200) {
                        this.$store.dispatch('pro_update_audit_info', res.data.data);
                    }else {
                        this.$message.error("出错了,请稍后再试");
                    }
                })
                // let toPath = "/project/" + item.status;
                // console.log(item);
                this.$router.push("/project/edit");
                this.$store.commit("updateBread", "/project/edit");
            },

            showDrawer(item) {
                this.visible = true;
                this.$store.dispatch('pro_update_current_project', item);
            },
            onClose() {
                this.visible = false;
            },

            disabledStartDate(startValue) {
                const endValue = this.endValue;
                if (!startValue || !endValue) {
                    return false;
                }
                return startValue.valueOf() > endValue.valueOf();
            },
            disabledEndDate(endValue) {
                const startValue = this.startValue;
                if (!endValue || !startValue) {
                    return false;
                }
                return startValue.valueOf() >= endValue.valueOf();
            },
            handleStartOpenChange(open) {
                if (!open) {
                    this.endOpen = true;
                }
            },
            handleEndOpenChange(open) {
                this.endOpen = open;
            },
        },
    }

</script>

<style scoped>
    .project_publish_wrapper{
        margin:0 auto;
        /*text-align: center;*/
        padding: 20px 40px 40px 20px;
    }

    .project-wrapper {
        /*background: dodgerblue;*/
    }

    .project_card {
        height: 40vh; width: 95%;
        padding: 10px 20px 20px 10px;
        background: rgba(92, 162, 116, 0.81);
        border-radius: 10px;
        display: block;
        margin: 20px auto;
    }

    .pStyle {
        fontSize: 16px;
        color: rgba(0,0,0,0.85);
        lineHeight: 24px;
        display: block;
        marginBottom: 16px;
    }

    .pStyle2 {
        marginBottom: 24px;
    }
</style>