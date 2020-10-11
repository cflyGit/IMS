const student ={
    state: {
        // 学生表格columns
        st_columns: [
            {
                title: '学号',
                dataIndex: 'student_id',
                scopedSlots: { customRender: 'student_id' },
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
                title: '导师',
                dataIndex: 'tutor',
                scopedSlots: {customRender: 'tutor'},
                require: false,
                enroll: true,
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
            },],
        st_edit: ['name', 'academy', 'tutor', 'age', 'phone', 'qq', 'wechat', 'email'],
        st_search: ['学号','姓名', '学院', '导师', '年龄', '电话', 'QQ', '微信', '邮箱'],
        st_search_en: ['Id', 'Name', 'Academy', 'Tutor', 'Age', 'Phone', 'QQ', 'Wechat', 'Email'],
        st_academy_list: ['计算机学院', '网络安全学院', '数字媒体与技术', '数学学院'],
        st_table_data: [],
    },

    getters: {
        st_columns: state => state.st_columns,
        st_edit: state => state.st_edit,
        st_academy_list: state => state.st_academy_list,
        st_search: state => state.st_search,
        st_search_en: state => state.st_search_en,
        st_table_data: state => state.st_table_data,
    },

    mutations: {
        st_update_table_data(state, data) {
            state.st_table_data = data;
        },

        splice_table_data(state, index) {
            state.st_table_data.splice(index, 1);
        }
    },

    actions: {
        st_splice_table_data({commit}, index) {
            commit('splice_table_data', index);
        }
    }
};

export default student;