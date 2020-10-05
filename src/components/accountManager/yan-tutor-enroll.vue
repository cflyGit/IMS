<template>
    <div>
        <div class="tutor-enroll">
            <label class="enroll-title">导师信息录入</label>
            <a-button-group class="button-group">
                <a-button type="primary" @click="toTable">信息查询<a-icon type="right" /> </a-button>
            </a-button-group>
        </div>

        <div class="enroll-wrapper">
            <a-row type="flex" justify="space-around" :gutter="20">
                <a-col style="background: rgba(102,102,102,0.06); border-radius: 10px" :span="15">
                    <tutor-individual></tutor-individual>
                </a-col>
                <a-col style="background: rgba(102,102,102,0.06); border-radius: 10px" :span="8">
                    <tutor-batch></tutor-batch>
                </a-col>
            </a-row>
        </div>


    </div>
</template>

<script>
    import tutorIndividual from './enroll/tutor-individual'
    import tutorBatch from './enroll/upload-batch'

    export default {
        name: "yan-tutor-enroll",

        components: {
            tutorIndividual,
            tutorBatch,
        },

        methods: {
            toTable() {
                this.$router.push("/user/tutor/table");
            },
        }
    }
</script>

<style scoped>
    .tutor-enroll{
        text-align: center;
        padding: 10px;
    }

    .enroll-title {
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