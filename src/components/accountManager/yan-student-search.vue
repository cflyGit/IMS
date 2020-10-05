<template>
    <div class="student-search">
        <a-select :default-value=st_search[0] style="width: 100px" @change="handleChange">
            <a-select v-for="(item, index) in st_search" :key=index>
                {{item}}
            </a-select>
        </a-select>

        <a-input-search placeholder="搜索" style="width: 400px" @search="onSearch" :loading="loading" enter-button />

        <a-button-group class="button-group">
            <a-button type="primary" @click="toEnroll">信息录入<a-icon type="right" /> </a-button>
        </a-button-group>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "yan-student-search",

        data() {
            return {
                loading: false,
            };
        },

        computed: {
            ...mapGetters([
                'st_search',
            ])
        },

        methods: {
            //搜索框点击事件
            onSearch(value) {
                var that = this;
                //设置加载中状态
                that.loading = true;
                console.log(value);
                setTimeout(function () {
                    that.loading = false;
                }, 3000);
            },

            handleChange(value){
                console.log(value);
            },

            toEnroll() {
                this.$router.push("/user/student/enroll");
            }
        },

    }
</script>

<style scoped>
    .student-search{
        text-align: center;
        padding: 20px;
    }

    .button-group{
        float: right;
    }
</style>