<template>
    <div v-if="internship_audit_data.length !== 0">
        <a-list :grid="{ gutter: 16, column: 1}" :data-source="internship_audit_data">
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card :title="`实习项目审核${index}`">
                    <a-descriptions :title=item.name bordered>
                        <a-descriptions-item label="项目编号">
                            {{item.project_id}}
                        </a-descriptions-item>
                        <a-descriptions-item label="负责人">
                            {{item.leader}}
                        </a-descriptions-item>
                        <a-descriptions-item label="地址" span="2">
                            {{item.address}}
                        </a-descriptions-item>
                        <a-descriptions-item label="已招人数/共招人数">
                            {{item.recoreded}}/{{item.number}}
                        </a-descriptions-item>
                        <a-descriptions-item label="项目状态">
                            {{item.status}}
                        </a-descriptions-item>
                        <a-descriptions-item v-if="item.tags!=null" label="标签">
                            <a-tag v-for="tag in item.tags.split('|')" :key=tag color="grey">
                                {{tag}}
                            </a-tag>
                        </a-descriptions-item>
                        <a-descriptions-item label="详细信息">
                            {{item.info}}
                        </a-descriptions-item>
                        <a-descriptions-item label="申请人">
                            {{item.student_name}}
                        </a-descriptions-item>
                        <a-descriptions-item v-if= "auditActor('Admin')" label="研究生院">
                            {{internship_audit_number2title[item.school_audit]}}
                            <a-button type="primary" size="small" @click="handleAgree(item.order_id)">通过</a-button>
                        </a-descriptions-item>
                        <a-descriptions-item v-if= "auditActor('Base')" label="基地">
                            {{internship_audit_number2title[item.base_audit]}}
                            <a-button type="primary" size="small" @click="handleAgree(item.order_id)">通过</a-button>
                        </a-descriptions-item>
                        <a-descriptions-item v-if = "auditActor('Tutor')" label="导师1">
                            {{internship_audit_number2title[item.tutor1_audit]}}
                            <a-button type="primary" size="small" @click="handleAgree(item.order_id)">通过</a-button>
                        </a-descriptions-item>
                        <a-descriptions-item v-if = "auditActor('Tutor')" label="导师2">
                            {{internship_audit_number2title[item.tutor2_audit]}}
                            <a-button type="primary" size="small" @click="handleAgree(item.order_id)">通过</a-button>
                        </a-descriptions-item>
                    </a-descriptions>
                </a-card>

                <a-button-group>
                    <a-button type="primary" @click="prePage">上一页</a-button>
                    <a-button type="primary" @click="nextPage">下一页</a-button>
                </a-button-group>
                <div style="marginTop: 10px; color: #409EFF">{{ pageNum }} / {{ pageTotalNum }}</div>
                <div>
                    <pdf
                            :page="pageNum"
                            :src="item.file"
                            @progress="loadedRatio = $event"
                            @num-pages="pageTotalNum=$event"
                    ></pdf>
                </div>
            </a-list-item>
        </a-list>
    </div>
    <div v-else>
        <a-empty/>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {IMSget, post} from "../../api/user";
    import pdf from 'vue-pdf';
    // import { Empty } from 'ant-design-vue';

    export default {
        name: "yan-job-audit",

        data() {
            return {
                pageNum: 1,
                pageTotalNum: 1,
                loadedRatio: 0,
                // simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
            }
        },

        mounted: function() {
            this.init_data();
        },

        components: {
            pdf,
        },

        computed: {
            ...mapGetters([
                'internship_audit_data',
                'internship_audit_number2title',
                'actor',
            ])
        },

        methods: {
            init_data() {
                IMSget("/student/getInternshipAudit").then(res => {
                    if(res.success == true) {
                        this.$store.dispatch('pro_update_internship_audit_data', res.data);
                    }
                })
            },

            handleAgree(order_id) {
                post("student/auditAgree/" + order_id + "/" + this.actor).then(res => {
                    if (res.success == true) {
                        this.$message.success("操作完成！");
                    }
                })
            },

            // 上一页
            prePage() {
                let page = this.pageNum
                page = page > 1 ? page - 1 : this.pageTotalNum
                this.pageNum = page
            },

            // 下一页
            nextPage() {
                let page = this.pageNum
                page = page < this.pageTotalNum ? page + 1 : 1
                this.pageNum = page
            },

            auditActor(ac) {
                if (ac == this.actor)
                    return true;
                else return false;
            }
        }
    }
</script>

<style scoped>

</style>