<template>
    <a-breadcrumb separator="/" >
        <a-breadcrumb-item v-for="item in breads" :key=item >
            <a @click="handle_bread(breads, item)">{{menu_dict[item]}}</a>
        </a-breadcrumb-item>
    </a-breadcrumb>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "yan-bread",

        computed: {
            ...mapGetters([
                'breads',
                'menu_dict',
            ])
        },

        methods: {
            handle_bread(breads, item) {
                // console.log(breads + " || " + item);
                let toPath = "/";
                for (let b in breads) {
                    if (b !== item) {
                        toPath = toPath + breads[b] + '/';
                    }
                }
                // console.log(toPath);
                if (toPath !== this.$router.currentRoute){
                    this.$router.push(toPath);
                }
            }
        }
    }
</script>

<style scoped>

</style>