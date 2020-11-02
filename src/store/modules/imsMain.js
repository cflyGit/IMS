import {resetRouter} from "@/router";
import yanRouter from "@/router";
import {setToken} from "@/config/auth";

function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.includes(roles)
    }else {
        return true;
    }
}

function filterAsyncRoutes(routes, roles) {
    const res = [];
    routes.forEach(route => {
        const r = {...route};

        if (hasPermission(roles, r)) {
            if (r.children) {
                r.children = filterAsyncRoutes(r.children, roles)
            }
            res.push(r);
        }
    });
    return res;
}

const imsMain = {
    state: {
        route_tree: [
            {
                name: '首页',
                path: '/index',
                component:() =>import('@/components/home/home'),
                meta: {
                    icon: 'home',
                    roles: [1, 2, 3, 4],
                }
            },
            {
                name: '用户管理',
                path: '/user',
                component: () => import('@/views/user'),
                meta: {
                    icon: 'user',
                    roles: [1, 2, 3, 4],
                },
                children: [
                    {
                        name: '学生管理',
                        path: 'student',
                        redirect: '/user/student/table/',
                        component: () => import('@/components/accountManager/yan-student'),
                        meta: {
                            icon: 'student',
                            roles: [1, 2, 3, 4]
                        },
                        children: [
                            {
                                path: 'enroll',
                                component: () => import('@/components/accountManager/yan-student-enroll'),
                                meta: {
                                    icon: 'enroll',
                                    roles: [1, 2, 3, 4],
                                }
                            },
                            {
                                path: 'table',
                                component: () => import('@/components/accountManager/yan-student-table'),
                                meta: {
                                    icon: 'table',
                                    roles: [1, 2, 3, 4],
                                }
                            },
                        ],
                    },
                    {
                        name: '导师管理',
                        path: 'tutor',
                        redirect: '/user/tutor/table',
                        component: () => import('@/components/accountManager/yan-tutor'),
                        meta: {
                            icon: 'tutor',
                            roles: [1, 2, 3, 4],
                        },
                        children: [
                            {
                                path: 'enroll',
                                component: ()=> import('@/components/accountManager/yan-tutor-enroll'),
                                meta: {
                                    icon: 'enroll',
                                    roles: [1, 2, 3, 4],
                                }
                            },
                            {
                                path: 'table',
                                component: ()=> import('@/components/accountManager/yan-tutor-table'),
                                meta: {
                                    icon: 'table',
                                    roles: [1, 2, 3, 4],
                                }
                            },
                        ]
                    },
                    {
                        name: "基地管理",
                        path: 'base',
                        redirect: '/user/base/table',
                        component: () => import('@/components/accountManager/yan-base'),
                        meta: {
                            icon: 'base',
                            roles: [1, 2, 3, 4],
                        },
                        children: [
                            {
                                path: 'enroll',
                                component: ()=> import('@/components/accountManager/yan-base-enroll'),
                                meta: {
                                    icon: 'enroll',
                                    roles: [1, 2, 3, 4],
                                }
                            },
                            {
                                path: 'table',
                                component: ()=> import('@/components/accountManager/yan-base-table'),
                                meta: {
                                    icon: 'table',
                                    roles: [1, 2, 3, 4],
                                }
                            },
                        ]
                    }
                ],
            },
            {
                name: '项目管理',
                path: '/project',
                redirect: '/project/application',
                component: () => import('@/views/project'),
                meta: {
                    icon: 'project',
                    roles: [1, 2, 3, 4],
                },
                children: [
                    {
                        name: '项目检索',
                        path: 'dashboard',
                        component: () => import('@/components/project/yan-project-dashboard'),
                        meta: {
                            icon: 'dashboard',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '项目审核',
                        path: 'edit',
                        component: () => import ('@/components/project/yan-project-edit'),
                        meta: {
                            icon: 'edit',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '项目申请',
                        path: 'application',
                        component: () => import('@/components/project/yan-project-application'),
                        meta: {
                            icon: 'application',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '我的项目',
                        path: 'myProject',
                        component: () => import('@/components/project/yan-project-audit'),
                        meta: {
                            icon: 'myProject',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    // {
                    //     name: '项目发布',
                    //     path: 'publish',
                    //     component: () => import('@/components/project/yan-project-publish'),
                    //     meta: {
                    //         icon: 'publish',
                    //         roles: [1, 2, 3, 4],
                    //     }
                    // },
                    // {
                    //     name: '项目签订',
                    //     path: 'signed',
                    //     component: () => import('@/components/project/yan-project-signed'),
                    //     meta: {
                    //         icon: 'signed',
                    //         roles: [1, 2, 3, 4],
                    //     }
                    // }
                ]
            },
            {
                name: '实习管理',
                path: '/internship',
                redirect: "/internship/internShipDashboard",
                component: () => import('@/views/internship'),
                meta: {
                    icon: 'calendar',
                    roles: [1, 2, 3, 4],
                },
                children: [
                    {
                        name: '实习检索',
                        path: 'internShipDashboard',
                        component: () => import('@/components/internship/yan-internship-dashboard'),
                        meta: {
                            icon: 'interShipDashboard',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '实习申请',
                        path: 'internShipApplication',
                        // component: () => import('@/components/project/yan-project-audit'),
                        meta: {
                            icon: 'internShipApplication',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '实习审核',
                        path: 'internShipAudit',
                        meta: {
                            icon: 'internShipAudit',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '我的实习',
                        path: 'myInternship',
                        // component: () => import('@/components/project/yan-project-audit'),
                        meta: {
                            icon: 'myInternship',
                            roles: [1, 2, 3, 4],
                        }
                    },
                ]
            },
            {
                name: '数据统计',
                path: '/statistics',
                component: () => import('@/components/home/home'),
                meta: {
                    icon: 'radar-chart',
                    roles: [1, 2, 3, 4],
                }
            },

            // {
            //     name: '出错',
            //     path: 'error',
            //     component: ()=> import('@/components/error/serve-error'),
            // }
        ],

        collapse: false,
        menus: [],
        breads: ['index'],
        actor2roles: {'Admin': 1, 'Tutor': 2, 'Base': 3, 'Student': 4, 'default': 999},

        userInfo: null,
        token: null,
        actor: null,

        menu_dict: {'index': '首页',
            'user': '用户管理',
            'student': '学生管理',
            'tutor': '导师管理',
            'base': '基地管理',
            'project': '项目管理',
            'statistics': '数据统计分析',
            'internship': '实习管理',
            'dashboard': '项目检索',
            'edit': '项目审核',
            'application': '项目申请',
            'audit': '项目审核',
            'publish': '项目发布',
            'signed': '项目签订'},
    },

    getters: {
        isCollapse: state => state.collapse,
        menus: state => state.menus,
        breads: state=> state.breads,
        menu_dict: state => state.menu_dict,
        actor2roles: state => state.actor2roles,

        actor: state => {
            if (state.actor == null) {
                let sessionActor = sessionStorage.getItem('actor');
                if (sessionActor != null) {
                    state.actor = JSON.parse(sessionActor);
                    return sessionActor;
                }else {
                    let localActor = localStorage.getItem('actor');
                    if (localActor != null) {
                        state.actor = localStorage.getItem('actor');
                    }
                    return localActor;
                }
            }
            return state.actor;
        },

        userInfo: state => {
            if (state.userInfo == null) {
                let sessionUser = sessionStorage.getItem('user');
                if (sessionUser != null) {
                    state.userInfo = JSON.parse(sessionUser);
                    return sessionUser
                }else {
                    let localeUser = localStorage.getItem('user');
                    if (localeUser != null) {
                        state.userInfo = JSON.parse(localeUser);
                    }
                    return localeUser;
                }
            }
            return state.userInfo;
        },

        token: state => {
            if (state.token == null) {
                let sessionToken = sessionStorage.getItem('token');
                if (sessionToken != null) {
                    state.token = sessionToken;
                    return sessionToken;
                }else {
                    let localeToken = localStorage.getItem('token');
                    state.token = localeToken;
                    return localeToken;
                }
            }
            return state.token;
        },
    },

    mutations: {
        updateLoginStatus(state) {
            state.isLogin = !state.isLogin;
        },

        menuFold(state) {
            state.collapse = !state.collapse;
        },

        updateBread:(state, to) => {
            let res = to.split('/');
            for (let i = 0; i < res.length; i++) {
                if (res[i] == "") {
                    res.splice(i, 1);
                }
            }
            state.breads = res;
        },

        updateMenus: (state, menus) => {
            state.menus = menus;
        },

        setToken(state, token, flag = true) {
            if (flag) {
                localStorage.setItem('token', token)
            }else {
                sessionStorage.setItem('token', token)
            }
        },

        setActor(state, actor, flag=true) {
            if (flag) {
                localStorage.setItem('actor', actor)
            }else {
                sessionStorage.setItem('actor', actor)
            }
        },

        logout(state) {
            state.userInfo = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            yanRouter.push("/login");
        }
    },

    actions: {
        initMenus: ({commit, state}, actor) => {
            const menu = filterAsyncRoutes(state.route_tree, actor);
            // console.log(menu);
            if (menu !== undefined) {
                commit('updateMenus', menu);
            }
        },

        changeMenus: ({commit, state}, actor) => {
            const menu = filterAsyncRoutes(state.route_tree, actor);
            if (menu !== undefined) {
                commit('updateMenus', menu);
                resetRouter();
                yanRouter.push('/');
            }
        },

        setUserInfo({commit, state}, userInfo, flag=true) {
            state.userInfo = userInfo;
            state.token = userInfo.token;
            state.actor = userInfo.actor;
            if (flag) {
                localStorage.setItem('user', JSON.stringify(userInfo))
            }else {
                sessionStorage.setItem('user', JSON.stringify(userInfo))
            }
            setToken('token', state.token);
            commit('setToken', userInfo.token, flag);
            commit('setActor', userInfo.actor, flag);
        },
    }

};

export default imsMain