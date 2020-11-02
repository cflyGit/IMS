const base={
    state:{
        base_columns: [
            {
                title: '基地编号',
                dataIndex: 'base_id',
                require: true,
                enroll: true,
            },
            {
                title: '基地名称',
                dataIndex: 'name',
                scopedSlots: {customRender: 'name'},
                require: true,
                enroll: true,
            },
            {
                title: '联系电话',
                dataIndex: 'phone',
                scopedSlots: {customRender: 'phone'},
                require: true,
                enroll: true,
            },
            {
                title: '地址',
                dataIndex: 'address',
                scopedSlots: {customRender: 'address'},
                require: true,
                enroll: true,
            },
            {
                title: '注册时间',
                dataIndex: 'register_time',
                scopedSlots: {customRender: 'register_time'},
                require: false,
                enroll: false,
            },
            {
                title: '编辑',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
                require: false,
                enroll: false,
            },],

        base_search: ['基地名称'],
        base_search_en: ['Name'],
        base_edit: ['name', 'phone','address'],
        base_table_data: [],
    },

    getters: {
        base_columns: state => state.base_columns,
        base_search: state => state.base_search,
        base_edit: state => state.base_edit,
        base_table_data: state => state.base_table_data,
    },

    mutations: {
        update_table_data(state, data) {
            state.base_table_data = data;
        },

        splice_table_data(state, index) {
            state.base_table_data.splice(index, 1);
        }
    },

    actions: {
        base_update_table_data({commit}, data){
            commit('update_table_data', data);
        },

        base_splice_table_data({commit}, index) {
            commit('splice_table_data', index);
        }
    }

};

export default base;