<template>
    <a-menu :style="{background: '#ffffff'}" :default-selected-keys='["/index"]' mode="inline" @click="handleMenu">
        <template v-for="item in menus">
            <a-sub-menu v-if="item.children && item.children.length >= 1" :key=item.path>
                <span slot="title"><a-icon :type=item.meta.icon /><span>{{item.name}}</span></span>
                <template v-if="item.children && item.children.length >= 1" >
                    <a-menu-item v-for="subitem in item.children" :key=subitem.path>
                        <span>{{subitem.name}}</span>
                    </a-menu-item>
                </template>
            </a-sub-menu>

            <a-menu-item v-else :key=item.path>
                <a-icon :type=item.meta.icon></a-icon>
                <span>{{item.name}}</span>
            </a-menu-item>
        </template>
    </a-menu>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "route2menu",

        computed: {
            ...mapGetters([
                'menus',
            ])
        },

        methods: {
            handleMenu(e) {
                var toPath = e.keyPath.reverse().join('/');
                var currentPath = this.$router.currentRoute.fullPath;
                // console.log("to: "+toPath + " current: "+currentPath);
                if (toPath !== currentPath) {
                    // console.log("to:" + toPath);
                    this.$router.push(toPath);
                    // 更新bread
                    this.$store.commit('updateBread', toPath);
                }
            }
        },
    }
</script>

<style scoped>

</style>