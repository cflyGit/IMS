<template>
    <div class="base-search">
        <a-select :default-value=base_search[0] style="width: 100px" @change="handleChange">
            <a-select-option v-for="(item, index) in base_search" :key=index>
                {{item}}
            </a-select-option>
        </a-select>

        <a-input-search placeholder="搜索" style="width: 400px" @search="onSearch" :loading="loading" enter-button />

        <a-button-group class="button-group">
            <a-button type="primary" @click="toEnroll">信息录入<a-icon type="right" /> </a-button>
        </a-button-group>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import {search} from '@/api/user'
    import {json2array} from "@/store/modules/json2array";

    export default {
        name: "yan-base-search",

        data() {
            return {
                loading: false,
                tag: "Name",
            };
        },

        computed: {
            ...mapGetters([
                'base_search',
                'base_search_en'
            ])
        },

        methods: {
            //搜索框点击事件
            onSearch(value) {
                var that = this;
                //设置加载中状态
                that.loading = true;

                search("base/findBy" + this.tag + "/" + value).then(res=>{
                    that.loading = false;
                    if (res.data.code == 200) {
                        this.$message.success("查询成功");
                        this.$store.dispatch('base_update_table_data', json2array(res.data.data))
                    }else {
                        this.$message.error(("查询结果不存在"));
                        this.$store.dispatch('base_update_table_data', null);
                    }
                });
                setTimeout(function () {
                    that.loading = false;
                }, 3000);
            },

            handleChange(value){
                this.tag = this.base_search_en[value];
            },

            toEnroll() {
                this.$router.push("/user/base/enroll");
            }
        },

    }
</script>

<style scoped>
    .base-search{
        text-align: center;
        padding: 20px;
    }

    .button-group{
        float: right;
    }
</style>