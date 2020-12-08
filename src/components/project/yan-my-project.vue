<template>
    <a-list :grid="{ gutter: 16, column: 1}" :data-source="my_project_data">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card :title="`我的项目${index+1}`">
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
                    <a-descriptions-item label="已招人数/招收人数">
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
                </a-descriptions>
            </a-card>
        </a-list-item>
    </a-list>
</template>

<script>
    import {mapGetters} from "vuex";
    import {IMSget} from "../../api/user";

    export default {
        name: "yan-my-project",

        mounted: function() {
            this.init_data();
        },

        computed: {
            ...mapGetters([
                'my_project_data',
            ])
        },

        methods: {
            init_data() {
                IMSget("/project/getProjects").then(res => {
                    if(res.success == true) {
                        this.$store.dispatch('pro_update_my_project_data', res.data);
                        console.log(res.data);
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>