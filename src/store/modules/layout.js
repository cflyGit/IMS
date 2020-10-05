import {resetRouter} from "@/router";
import yanRouter from "@/router";

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

const layout = {
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
                        name: '项目编辑',
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
                        name: '项目审核',
                        path: 'audit',
                        component: () => import('@/components/project/yan-project-audit'),
                        meta: {
                            icon: 'application',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '项目发布',
                        path: 'publish',
                        component: () => import('@/components/project/yan-project-publish'),
                        meta: {
                            icon: 'publish',
                            roles: [1, 2, 3, 4],
                        }
                    },
                    {
                        name: '项目签订',
                        path: 'signed',
                        component: () => import('@/components/project/yan-project-signed'),
                        meta: {
                            icon: 'signed',
                            roles: [1, 2, 3, 4],
                        }
                    }
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
            {
                name: '实习管理',
                path: '/internship',
                component: () => import('@/components/home/home'),
                meta: {
                    icon: 'calendar',
                    roles: [1, 2, 3, 4],
                }
            }
        ],

        collapse: false,
        menus: [],
        breads: ['index'],

        menu_dict: {'index': '首页',
            'user': '用户管理',
            'student': '学生管理',
            'tutor': '导师管理',
            'project': '项目管理',
            'statistics': '数据统计分析',
            'internship': '实习管理',
            'dashboard': '项目检索',
            'edit': '项目编辑',
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
    },

    mutations: {
        menuFold(state) {
            state.collapse = !state.collapse;
        },

        UPDATE_BREAD:(state, to) => {
            let res = to.split('/');
            for (let i = 0; i < res.length; i++) {
                if (res[i] == "") {
                    res.splice(i, 1);
                }
            }
            state.breads = res;
        },

        UPDATE_MENUS: (state, menus) => {
            state.menus = menus;
        }
    },

    actions: {
        initMenus: ({commit, state}) => {
            const menu = filterAsyncRoutes(state.route_tree, 1);
            if (menu !== undefined) {
                commit('UPDATE_MENUS', menu);
            }
        },

        changeMenus: ({commit}, menus) => {
            commit('UPDATE_MENUS', menus);
            resetRouter();
            yanRouter.push('/');
        },
    }

};

export default layout