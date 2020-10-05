<template>
    <a-layout-footer class="footer">
        <a-space class="intro">
            <span>云<span style="color: #FF6C60">YAN</span></span>
            <span>联系我们: </span>
            <a :href='my_github' target="_blank" class="icon-link"><a-icon type="github" style="font-size: 20px"/></a>
            <a-icon type="wechat" style="font-size: 23px; color: green"/>
        </a-space>

        <p class="record">待备案</p>
    </a-layout-footer>
</template>

<script>
    // import {mapGetters} from "vuex";
    import {github} from "@/config/env"

        export default {
        name: "yan-footer-nav",

        data() {
            return {
                my_github: github,
            }
        },
    }
</script>

<style scoped>
    .footer {
        width: 100%;
        padding: 10px 0;
        font-size: 12px !important;
        text-align: center;
        background: #ffffff;
        position: absolute;
        bottom: 0;
    }
    .intro {
        width: 240px;
        margin: 5px auto;
        justify-content: space-between;
        align-items: center;
    }

    .record {
        font-size: 12px;
    }

    .icon-link {
        color: #363636;
    }
</style>