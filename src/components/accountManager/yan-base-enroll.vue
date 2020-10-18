<template>
    <div>
        <div class="base-enroll">
            <label class="base-title">基地信息录入</label>
            <a-button-group class="button-group">
                <a-button type="primary" @click="toTable">信息查询<a-icon type="right" /> </a-button>
            </a-button-group>
        </div>

        <div class="enroll-wrapper">
            <a-row type="flex" justify="space-around" :gutter="20">
                <a-col style="background: rgba(102,102,102,0.06); border-radius: 10px" :span="15">
                    <base-individual></base-individual>
                </a-col>
                <a-col style="background: rgba(102,102,102,0.06); border-radius: 10px" :span="8">
                    <base-batch></base-batch>
                </a-col>
            </a-row>
        </div>


    </div>
</template>

<script>
    import baseIndividual from './enroll/base-individual'
    import baseBatch from './enroll/upload-batch'

    export default {
        name: "yan-base-enroll",

        components: {
            baseIndividual,
            baseBatch,
        },

        methods: {
            toTable() {
                this.$router.push("/user/base/table");
            },
        }
    }
</script>

<style scoped>
    .base-enroll{
        text-align: center;
        padding: 10px;
    }

    .base-title {
        font-size: 15px;
    }

    .button-group{
        float: right;
    }

    .enroll-wrapper{
        margin-top: 20px;
    }

    .enroll-individual {
        align: center;
        margin-top: 20px;
    }
</style>