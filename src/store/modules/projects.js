const projects = {
    state: {
        project_item: {
            "name": "项目名称",
            "base": "项目基地",
            "leader": "负责人",
            "position": "地址",
            "label": "标签",
            "number": "招收人数",
        },
        project_item_auto: {
            "project_id": "项目编号",
            "file": "申请文件",
            "info": "详细信息",
            "recoreded": "已招人数",
            "application_time": "申请时间",
            "audit_time": "审核时间",
            "signed_time": "签订时间",
            "publish_time": "发布时间",
            "finished_time": "结束时间",
            "status": "状态",
        },

        pro_application: ['项目名称', '项目基地', '负责人', '地址', '招收人数'],
        pro_application_en: ['name', 'base', 'leader', 'address', 'number'],

        current_project: [],
        current_project_list: [],
        audit_info: {},
        tab_pane_title: {'application': '申请', 'audit': '审核', 'signed': '签订', 'publish': '发布', 'finished': '结束'},
        title2number: {'application': '0', 'audit': '1', 'signed': '2', 'publish': '3', 'finished': '4'},
        number2title: {'0': '申请', '1': '审核', '2': '签订', '3': '发布', '4': "结束"},
        number2title_en: {'0': 'application', '1': 'audit', '2': 'signed', '3': 'publish', '4': 'finished'}
    },

    getters: {
        current_project: state => state.current_project,
        tab_pane_title: state => state.tab_pane_title,
        project_item: state => state.project_item,
        project_item_auto: state => state.project_item_auto,
        current_project_list: state => state.current_project_list,
        pro_application: state => state.pro_application,
        pro_application_en: state => state.pro_application_en,
        title2number: state => state.title2number,
        number2title: state => state.number2title,
        number2title_en: state => state.number2title_en,
        audit_info: state => state.audit_info,
        audit_comments: state => {
            let audit = {};
            for (let s in state.tab_pane_title) {
                if (state.audit_info[s+"_comments"] != null && state.audit_info[s+"_reviewer"] != null) {
                    audit[s] = state.audit_info[s+"_comments"] + "\n核对人:" + state.audit_info[s+"_reviewer"];
                }
            }
            return audit;
        }
    },

    mutations: {
        update_current_project(state, project) {
            state.current_project = project;
        },

        update_current_project_list(state, project_list) {
            state.current_project_list = project_list;
        },

        update_audit_info(state, audit_info) {
            state.audit_info = audit_info;
        }
    },

    actions: {
        pro_update_current_project({commit}, project) {
            commit('update_current_project', project);
        },

        pro_update_current_project_list({commit}, project_list) {
            commit('update_current_project_list', project_list);
        },

        pro_update_audit_info({commit}, audit_info) {
            commit('update_audit_info', audit_info);
        }

    }
}

export default projects;