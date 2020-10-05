<template>
    <a-layout id="layout" style="width: 100vw; height: 100vh" ref="menu_right">
        <yan-left-menu></yan-left-menu>
            <a-layout>
                <yan-head-nav></yan-head-nav>
                    <yan-content></yan-content>
            </a-layout>
    </a-layout>
</template>

<script>
    import yanLeftMenu from "@/components/home/yan-left-menu"
    import yanHeadNav from "@/components/home/yan-head-nav"
    import yanContent from "@/components/home/yan-content"
    // import YanBack2top from "@/components/home/yan-back2top";
    // import yanFooterNav from "@/components/home/yan-footer-nav"

    export default {
        name: "Home",
        components: {
            // YanBack2top,
            yanLeftMenu,
            yanHeadNav,
            yanContent,
            // yanFooterNav,
        },
    }
</script>

<style scoped>

</style>