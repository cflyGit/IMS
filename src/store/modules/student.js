const student ={
    state: {
        // 学生表格columns
        st_columns: [
            {
                title: '学号',
                dataIndex: 'id',
                scopedSlots: { customRender: 'id' },
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
                dataIndex: 'time',
                scopedSlots: {customRender: 'time'},
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
        st_academy_list: ['计算机学院', '网络安全学院', '数字媒体与技术', '数学学院'],
    },

    getters: {
        st_columns: state => state.st_columns,
        st_edit: state => state.st_edit,
        st_academy_list: state => state.st_academy_list,
        st_search: state => state.st_search,
    },

    mutations: {

    },
};

export default student;