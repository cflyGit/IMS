import Vue from 'vue'
import router from 'vue-router'
import store from '../store'

import login from '@/views/login'
import Home from '@/views/Home'

Vue.use(router);
const originalPush = router.prototype.push;
router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
};

const WhiteListRouter = ['/login', 'notFound'];

export const staticRoutes = [
    {
        path: '/',
        name: '根',
        redirect: '/index',
        component: Home,
        children: [],
    },
    {
        path: '/login',
        component: login,
    },
    {
        path: '/error',
        name: '404',
        component: () => import('@/views/NotFound')
    },
];

const createRouter = (routes) => new router({
    // mode: 'history'
    scrollBehavior: (to, from, savePosition) => {
        if (savePosition) {
            return savePosition
        } else {
            return {x: 0, y: 0}
        }
    },
        routes: routes,
});

export function resetRouter() {
    store.dispatch("initMenus");
    staticRoutes[0].children = store.getters.menus;
    const newRouter = createRouter(staticRoutes);
    yanRouter.matcher = newRouter.matcher;
}

function checkLogin(isLogin) {
    if (!isLogin) { // 未登录设置路由
        resetRouter();
        store.commit('updateLoginStatus');
    }
}

const yanRouter = createRouter(staticRoutes);

yanRouter.beforeEach((to, from, next) => {
    let user = store.getters.userInfo;
    let token = store.getters.token;
    let actor = store.getters.actor;
    let isLogin = store.getters.isLogin;
    var hasAuth = user !== null && token != null && actor !== null && user !== undefined && token !== undefined && actor !== undefined;

    if (to.path == '/login') {
        if (hasAuth) {
            checkLogin(isLogin);
            next({path: '/'});
        }else {
            next();
        }
    }else {
        if (!hasAuth) {
            if (WhiteListRouter.indexOf(to.path) !== -1) {
                next();
            }else {
                next( {
                    path: '/login',
                })
            }
        }else {
            checkLogin(isLogin);
            next();
        }
    }
});

export default yanRouter;