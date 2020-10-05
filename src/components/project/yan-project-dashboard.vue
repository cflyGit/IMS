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
                <a-list :data-source=projects_publish bordered>
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
                    <a-badge status="processing" :text="tab_pane_title[current_tab]+'中'" />
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
        </a-drawer>
    </section>
</template>

<script>
    import {projects_publish_test} from "@/store/modules/projects";
    import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
    import {mapGetters} from "vuex";
    export default {
        name: "yan-project-dashboard",

        data() {
            return {
                startValue: null,
                endValue: null,
                endOpen: false,

                locale,

                visible: false,
                current_project: [],
                tabPosition: 'top',
                loading: false,
                current_tab: "application",
            }
        },
        computed:{
            projects_publish: function() {
                return projects_publish_test;
            },
            ...mapGetters([
                'tab_pane_title',
            ]),
        },

        methods: {
            onSearch(value) {
                var that = this;
                //设置加载中状态
                that.loading = true;
                console.log(value);
                setTimeout(function () {
                    that.loading = false;
                }, 3000);
            },

            tab_change(activeKey) {
                this.current_tab = activeKey;
                // console.log(this.current_tab);
            },

            to_project_edit(item) {
                this.$store.commit('update_current_project', item);
                // let toPath = "/project/" + item.status;
                // console.log(item);
                this.$router.push("/project/edit");
            },

            showDrawer(item) {
                this.visible = true;
                this.current_project = item;
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