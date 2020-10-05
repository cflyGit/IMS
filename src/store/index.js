import Vue from 'vue'
import Vuex from 'vuex'

import main from './modules/main'
import student from './modules/student'
import tutor from './modules/tutor'
import projects from './modules/projects'
// import login from './modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        main,
        student,
        tutor,
        projects,
        // login,
    },
})