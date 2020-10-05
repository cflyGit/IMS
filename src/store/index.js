import Vue from 'vue'
import Vuex from 'vuex'

import layout from './modules/layout'
import student from './modules/student'
import tutor from './modules/tutor'
import projects from './modules/projects'

Vue.use(Vuex);

export default new Vuex.Store({
    modules:{
        layout,
        student,
        tutor,
        projects,
    },
})