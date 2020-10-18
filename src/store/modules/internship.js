const internship={
    state: {
        internship_tab: ['进行中', '已结束'],
        internship_tab_en: ['ongoing', 'done'],
        internship_description_drawer: ['项目名称', '项目编号', '负责人', '发布时间', '状态', '实习生', '导师'],
        internship_description_drawer_en: ['project_name', 'project_id', 'leader', 'publish_time', 'internship_status', 'interns', 'tutor'],

        current_internship: [],
        internship_list: [],
    },

    getters: {
        internship_tab: state => state.internship_tab,
        internship_tab_en: state => state.internship_tab_en,
        internship_list: state => state.internship_list,
        current_internship: state => state.current_internship,
        internship_description_drawer: state => state.internship_description_drawer,
        internship_description_drawer_en: state => state.internship_description_drawer_en,
    },

    mutations: {
        update_current_internship(state, internship) {
            state.internship = internship;
        },

        update_internship_list(state, internship_list) {
            state.internship_list = internship_list;
        }
    },

    actions: {

    }
};

export default internship;