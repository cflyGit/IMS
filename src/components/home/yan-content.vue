<template>
    <a-layout-content class="content" >
        <transition mode="out-in" name="component-fade">
            <router-view/>
        </transition>
        <yan-back2top @back2top="toTop"></yan-back2top>
    </a-layout-content>
</template>


<script>
    import YanBack2top from "@/components/home/yan-back2top";
    export default {
        name: "yanContent",
        data() {
            return {
            }
        },
        components: {
            YanBack2top

        },
        methods: {
            toTop() {
                this.$el.scrollTop = 0;
            }
        }
    }
</script>

<style scoped>
    .content {
        /*border-radius: 10px;*/
        margin-left: 5px;
        margin-top: 5px;
        /*padding: 5px 10px 10px 5px;*/
        min-height: 280px;
        background: #ffffff;
        overflow: scroll;
        overflow: -moz-scrollbars-none;
        -ms-overflow-style: none;
    }
</style>