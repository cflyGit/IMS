<template>
    <div
        class="backTop"
        :style="{'opacity':opacity}"
        v-show="gotop"
        @mouseenter="enterBackTop"
        @mouseout="outBackTop"
        @click="handleScrollTop"
    >
        <div class="back"></div>
    </div>
</template>

<script>
    export default {
        name: "yan-back2top",

        data() {
            return {
                opacity: '.3',
                gotop: false,
                scrollHeight: 100,
            }
        },

        props: ['ele'],

        mounted() {
            window.addEventListener("scroll", this.handleScroll, true);
        },

        methods: {
            enterBackTop() {
                this.opacity = '1';
            },

            outBackTop() {
                this.opacity = '.3';
            },

            handleScroll(e) {
                let scrolltop = e.target.scrollTop;
                scrolltop > this.scrollHeight ? (this.gotop = true) : (this.gotop = false);
            },

            handleScrollTop() {
                this.$emit('back2top');
            }
        }
    }
</script>

<style scoped>
    .backTop {
        position: fixed;
        right: 50px;
        bottom: 50px;
        z-index: 99;
        cursor: pointer;
    }
    .back {
        background: url('../../assets/img/backTop.png') no-repeat;
        background-position: center;
        background-size: 16px;
        background-color: #1475ff;
        width: 40px;
        height: 40px;
        overflow: hidden;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        transition: all .3s;
        box-shadow: 0 0 15px 1px rgba(69, 65, 78, 0.25)
    }

</style>