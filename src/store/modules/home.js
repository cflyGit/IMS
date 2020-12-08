const IMSHome={
    state: {
        head_info: [],

        head_image: [],

        head_projects: [],
    },

    getters: {
        head_info: state => state.head_info,
        head_image: state => state.image,
        head_projects: state => state.head_projects,
    },

    mutations: {
        set_head(state, data) {
            let n = data.info.length;
            for (let i = 0;  i < n; i++) {
                state.head_info[i] = data.info[i];
                state.head_image[i] = data.images[i];
                state.head_projects[i] = data.projects[i];
            }
            console.log(state.head_info);
        }
    },

    actions: {
        pro_set_head({commit}, data) {
            commit('set_head', data);
        }
    }
};

export default IMSHome;