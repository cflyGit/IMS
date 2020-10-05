<template>
    <div class = "student">
        <router-view/>
    </div>
</template>

<script>

    export default {
        name: "yanStudent",

        components:{
        }
    }

</script>

<style scoped>
    .student {
        border-radius: 10px;
        /*background: rgba(212, 212, 212, 0.69);*/
    }
</style>