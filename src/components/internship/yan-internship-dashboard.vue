<template>
    <section class="internship_dashboard_wrapper">
        <a-input-search placeholder="搜索" style="width: 400px" @search="onSearch" :loading="loading" enter-button />

        <a-tabs :tab-position="tabPosition" @change="tab_change">
            <a-tab-pane v-for="(_tab, index) in internship_tab" :key=internship_tab_en[index] :tab=_tab>
                <a-list :data-source=internship_list bordered>
                    <a-list-item slot="renderItem" :key="`a-${item.id}`" slot-scope="item">
                        <a slot="actions" @click="showDrawer(item)"><a-icon type="double-left" /></a>
                        <a-list-item-meta :description=item.base>
                            <a slot="title" @click="to_internship_audit(item)">{{ item.name }}</a>
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
            <a-descriptions :title="current_internship[internship_description_drawer_en[0]]" bordered>
                <a-descriptions-item v-for="(item, index) in internship_description_drawer.slice(1, -1)" :key=index :label="item" :span="2">
                    {{current_internship[internship_description_drawer_en[index+1]]}}
                </a-descriptions-item>
            </a-descriptions>
        </a-drawer>
    </section>
</template>

<script>

    import {mapGetters} from "vuex";
    import {search} from "@/api/user";

    export default {
        name: "yan-internship-dashboard",

        data() {
            return {
                tabPosition: 'top',
                visible: false,
                current_tab: 'ongoing',
                loading: false,
                offset: 3,
            }
        },
        computed:{
            ...mapGetters([
                'internship_tab',
                'internship_tab_en',
                'internship_list',
                'internship_description_drawer',
                'internship_description_drawer_en',
                'current_internship',
            ])
        },

        mounted: function() {
            this.tab_change(this.current_tab);
        },

        methods: {
            onSearch(value) {
                console.log(value);
            },

            getInternshipInfo(id) {
                search("internship/findByProjectId/" + id).then(ans => {
                    if (ans.success === true) {
                        let itemList = ans.data.data;
                        return itemList;
                    }
                    return null;
                })
            },

            tab_change(activeKey){
                this.current_tab = activeKey;
                search("internship/getItemList/" + this.internship_tab_en.findIndex(activeKey) + this.offset).then(res => {
                    if (res.success === true) {
                        this.$store.commit('update_internship_list', res.data.data);
                    }else {
                        this.$store.commit('update_internship_list', []);
                    }
                })
            },

            showDrawer(item) {
                this.visible = true;
                this.$store.commit('update_current_internship', item);
            },

            to_internship_audit(item) {
                console.log(item);
            },

            onClose(){
                this.visible = false;
            },
        },
    }
</script>

<style scoped>
    .internship_dashboard_wrapper{
        margin:0 auto;
        text-align: center;
        padding: 20px 40px 40px 20px;
    }

</style>