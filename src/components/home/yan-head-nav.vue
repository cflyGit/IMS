<template>
    <a-layout-header style="background: rgba(102,102,102,0.21); padding: 0">
        <a-icon
                :type="isCollapse ? 'menu-unfold' : 'menu-fold'"
                @click="menuFold"
                class="trigger"
        />

        <yan-bread></yan-bread>

        <div class="header-right-wrapper">
            <a-badge count="0">
                <a-icon type="message"/>
            </a-badge>
            <a-badge count="5">
                <a-icon type="notification" />
            </a-badge>
            <a-popover placement="bottom" trigger="click">
                <a @click="logout" slot="content">退出登录</a>
                <a-avatar class="avatar" icon="user" style="backgroundColor:#4397f8"/>
            </a-popover>
        </div>

    </a-layout-header>
</template>

<script>
    import { mapGetters } from 'vuex'
    import YanBread from "@/components/home/yan-bread";
    import {logout} from "@/api/logout";

    export default {
    name: "yanHeadNav",
    components: {YanBread},
    data() {
        return {}
    },

    computed: {
        ...mapGetters([
          'isCollapse',
        ])
    },

    methods: {
        menuFold() {
            this.$store.commit('menuFold');
        },

        logout() {
            this.$store.commit('logout');
            logout();
            // this.$router.push('/login');
        },
    },
}
</script>

<style scoped>
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 3px 24px;
        cursor: pointer;
        transition: color 0.3s;
        float: left;
    }

    .trigger:hover {
        color: #4397f8;
    }

    .header-right-wrapper{
        position: absolute !important;
        right: 0;
        top: 0;
    }

    .avatar{
        margin-right: 20px;
    }

    .ant-badge{
        margin-right: 20px;
        font-size: large;
    }

    .anticon:hover {
        color: #4397f8;
        cursor: pointer;
    }

    @keyframes scale_animate {
        0% {
            transform: scale(1);
        }
        20% {
            transform: scale(0.8);
        }
        70% {
            transform: scale(1.6);
        }
        100% {
            transform: scale(1);
        }
    }

    .ant-badge:hover {
        animation: scale_animate .5s;
        animation-timing-function: cubic-bezier(0.1, -0.6, 0.2, 0);
    }

    .ant-breadcrumb {
        text-align: left;
        line-height: 64px;
        width: 80%;
    }
</style>