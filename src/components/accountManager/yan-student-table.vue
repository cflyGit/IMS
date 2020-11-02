<template>
    <div>
        <yan-student-search></yan-student-search>
        <section class="table-wrapper">
            <div v-if="selectedRowKeys.length > 0">
                <a-button icon="delete" type="danger" @click="confirmDelete"></a-button>
                <span style="margin-left: 8px">
                    {{ `已选中 ${selectedRowKeys.length} 条记录` }}
                </span>
            </div>
            <a-table :row-selection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :columns=st_columns :data-source="st_table_data" bordered>
                <template v-for="col in st_edit" :slot="col" slot-scope="text, record">
                    <div :key="col">
                        <a-input
                                v-if="record.editable"
                                style="margin: -5px 0"
                                :value="text"
                                @change="e => handleChange(e.target.value, record.key, col)"
                        />
                        <template v-else>
                            {{text}}
                        </template>
                    </div>
                </template>
                <template slot="operation" slot-scope="text, record">
                    <div class="editable-row-operations">
                        <span v-if="record.editable">
                            <a-popconfirm style="color: red" title="确认保存?" @confirm="() => save(record.key)">
                            <a> 保存</a>
                            </a-popconfirm>
                            <a-popconfirm title="确认取消?" @confirm="() => cancel(record.key)">
                            <a> 取消</a>
                            </a-popconfirm>
                        </span>
                        <span v-else>
                            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">修改</a>
                        </span>
                    </div>
                </template>
            </a-table>
        </section>
    </div>
</template>

<script>
    // const data = [];
    // for (let i = 0; i < 100; i++) {
    //     data.push({
    //         key: i.toString(),
    //         student_id: `${i}`,
    //         name: `Edrward ${i}`,
    //         age: 32,
    //         academy: `ee`,
    //         tutor: `LiMing`,
    //         phone: `11411411411`,
    //         qq: `2535682466`,
    //         wechat: `cfly`,
    //         email: `cfly@bupt.com`,
    //         time: `2020-10-1`,
    //     });
    // }

    import {mapGetters} from 'vuex';
    import yanStudentSearch from "@/components/accountManager/yan-student-search";
    import {deleteOne, update} from "@/api/user";

    export default {
        name: "yanStudentTable.vue",

        data() {
            return {
                editingKey: '',
                selectedRowKeys: [],
            };
        },

        computed:{
            ...mapGetters([
                'st_columns',
                'st_edit',
                'st_table_data',
            ])
        },

        components:{
          yanStudentSearch,
        },

        methods: {

            confirmDelete() {
                this.$confirm({
                    title: '确认删除选中的记录 ?',
                    onOk: this.handleDelete,
                })
            },

            async handleDelete() {
                // 先删除再刷新
                const all = this.selectedRowKeys.length;
                let [success, failsure] = [0, 0];

                while (this.selectedRowKeys.length > 0) {
                    const index = this.st_table_data.findIndex(item => item.key === this.selectedRowKeys[0]);
                    if (index >= 0) {
                        await deleteOne('/student/delete/' + this.st_table_data[index].student_id).then(res => {
                            if (res.success !== undefined && res.success === true) {
                                this.$store.dispatch('st_splice_table_data', index);
                                success++;
                            }else {
                                failsure++;
                            }
                        })
                    }else {
                        failsure++;
                    }
                    this.selectedRowKeys.shift();
                }
                this.$message.success(`共: ${all} 成功: ${success} 失败: ${failsure}`);
            },

            onSelectChange(selectedRowKeys) {
                this.selectedRowKeys = selectedRowKeys;
            },

            handleChange(value, key, column) {
                const newData = [...this.st_table_data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    target[column] = value;
                    this.$store.commit('st_update_table_data', newData);
                }
            },

            edit(key) {
                const newData = [...this.st_table_data];
                const target = newData.filter(item => key === item.key)[0];
                this.editingKey = key;
                if (target) {
                    target.editable = true;
                    this.$store.commit('st_update_table_data', newData);
                }
            },

            save(key) {
                const newData = [...this.st_table_data];
                const target = newData.filter(item => key === item.key)[0];
                if (target) {
                    delete target.editable;
                    this.$store.commit('st_update_table_data', newData)
                    update('student', target).then(res => {
                        if (res.success !== undefined && res.success === true) {
                            this.$message.success("修改成功");
                        }
                    })
                }
                this.editingKey = '';
            },

            cancel(key) {
                const newData = [...this.st_table_data];
                const target = newData.filter(item => key === item.key)[0];
                this.editingKey = '';
                if (target) {
                    delete target.editable;
                    this.$store.commit('st_update_table_data', newData);
                }
            },
        },
    };
</script>

<style scoped>
    .table-wrapper {
        background: #ffffff;
        border-radius: 10px;
        padding: 10px;
    }
</style>