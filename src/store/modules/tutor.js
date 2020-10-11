const tutor={
    state: {
        tt_columns: [
            {
                title: '教工号',
                dataIndex: 'tutor_id',
                require: true,
                enroll: true,
            },
            {
                title: '姓名',
                dataIndex: 'name',
                scopedSlots: { customRender: 'name' },
                require: true,
                enroll: true,
            },
            {
                title: '学院',
                dataIndex: 'academy',
                scopedSlots: {customRender: 'academy'},
                require: false,
                enroll: false,
            },
            {
                title: '年龄',
                dataIndex: 'age',
                scopedSlots: {customRender: 'age' },
                require: false,
                enroll: true,
            },
            {
                title: '电话',
                dataIndex: 'phone',
                scopedSlots: {customRender: 'phone'},
                require: false,
                enroll: true,
            },
            {
                title: 'QQ',
                dataIndex: 'qq',
                scopedSlots: {customRender: 'qq'},
                require: false,
                enroll: true,
            },
            {
                title: '微信',
                dataIndex: 'wechat',
                scopedSlots: {customRender: 'wechat'},
                require: false,
                enroll: true,
            },
            {
                title: '邮箱',
                dataIndex: 'email',
                scopedSlots: {customRender: 'email'},
                require: false,
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
            },
        ],
        tt_edit: ['name', 'academy', 'age', 'phone', 'qq', 'wechat', 'email'],
        tt_search: ['教工号','姓名', '学院', '年龄', '电话', 'QQ', '微信', '邮箱'],
        tt_search_en: ['Id', 'Name', 'Academy', 'Age', 'Phone', 'QQ', 'Wechat', 'Email'],
        tt_academy_list: ['计算机学院', '网络安全学院', '数字媒体与技术', '数学学院'],

        tt_table_data: [],
    },

    getters: {
        tt_columns: state => state.tt_columns,
        tt_edit: state => state.tt_edit,
        tt_academy_list: state => state.tt_academy_list,
        tt_search: state => state.tt_search,
        tt_search_en: state => state.tt_search_en,
        tt_table_data: state => state.tt_table_data,
    },

    mutations: {
        tt_update_table_data(state, data) {
            state.tt_table_data = data;
        },

        splice_table_data(state, index) {
            state.tt_table_data.splice(index, 1);
        },
    },

    actions:{
        tt_splice_table_data({commit}, index) {
            commit('splice_table_data', index);
        }
    }
};

export default tutor;