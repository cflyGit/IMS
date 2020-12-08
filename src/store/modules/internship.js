import {json2array} from "./json2array";

const internship={
    state: {
        internship_tab: ['进行中', '已结束'],
        internship_tab_en: ['publish', 'finished'],
        internship_title2number: {'publish': 0, 'finished': 1},
        internship_description_drawer: ['项目名称', '项目编号', '负责人', '发布时间', '状态', '实习生', '导师'],
        internship_description_drawer_en: ['project_name', 'project_id', 'leader', 'publish_time', 'internship_status', 'interns', 'tutor'],
        internship_audit_number2title: {0: "审核中", 1: "审核通过", 2: "审核未通过"},
        current_internship: [],
        internship_list: [],

        internship_audit_info: {},
        internship_audit_data: {},
        internship_data: {},
    },

    getters: {
        internship_tab: state => state.internship_tab,
        internship_tab_en: state => state.internship_tab_en,
        internship_list: state => state.internship_list,
        current_internship: state => state.current_internship,
        internship_description_drawer: state => state.internship_description_drawer,
        internship_description_drawer_en: state => state.internship_description_drawer_en,
        internship_title2number: state => state.internship_title2number,
        internship_audit_info: state => state.internship_audit_info,
        internship_data: state => json2array(state.internship_data),
        internship_audit_number2title: state => state.internship_audit_number2title,
        internship_audit_data: state => state.internship_audit_data,
    },

    mutations: {
        update_current_internship(state, internship) {
            state.internship = internship;
        },

        update_internship_list(state, internship_list) {
            state.internship_list = internship_list;
        },

        update_current_insternship_project(state, project) {
            state.current_internship = project;
        },

        update_internship_audit_info(state, data) {
            state.internship_audit_info = data;
        },

        update_internship_data(state, data) {
            state.internship_data = data;
        },

        update_internship_audit_data(state, data) {
            state.internship_audit_data = data;
        }

    },

    actions: {
        pro_update_current_internship_project_list({commit}, internship_project_list) {
            commit('update_internship_list', internship_project_list);
        },

        pro_update_internship_audit_info({commit}, data) {
            commit('update_internship_audit_info', data);
        },

        pro_update_internship_data({commit}, data) {
            commit('update_internship_data', data);
        },

        pro_update_internship_audit_data({commit}, data) {
            commit('update_internship_audit_data', data);
        }
    }
};

export default internship;