import Vue from 'vue'
import Vuex from 'vuex'

import imsMain from './modules/imsMain'
import student from './modules/student'
import tutor from './modules/tutor'
import projects from './modules/projects'
// import login from './modules/login'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        imsMain,
        student,
        tutor,
        projects,
        // login,
    },
})