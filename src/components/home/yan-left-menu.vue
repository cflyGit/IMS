<template>
    <a-layout-sider v-model="isCollapse" :trigger="null" collapsible style="background: #ffffff">
        <transition mode="out-in" name="component-fade">
            <transition mode="out-in" name="component-fade">
                <div class="logo">
                    <img :src="cloud" alt="云研">
                    <span v-if="!isCollapse">云<span style="color: #FF6C60">YAN</span></span>
                </div>
            </transition>
        </transition>
        <route2menu/>
        <yan-footer-nav v-if="!isCollapse"></yan-footer-nav>
    </a-layout-sider>
</template>

<script>
    import logoImg from "@/assets/img/logo.png"
    import cloudImg from '@/assets/icon/cloud.png'
    import {mapGetters} from "vuex";
    import route2menu from "@/components/home/route2menu";
    import yanFooterNav from "@/components/home/yan-footer-nav"
    export default {
        name: "yanLeftMenu",
        components: {
            route2menu,
            yanFooterNav,
        },

        data() {
            return {
                logo: logoImg,
                cloud: cloudImg,
            }
        },

        computed:{
            ...mapGetters([
                'isCollapse',
            ])
        }
    }
</script>

<style scoped>
    .logo {
        height: 32px;
        background: rgba(255, 255, 255, 0.2);
        margin: 16px;
    }

    .logo-icon {
        color: #e96f81
    }
</style>