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

export const WhiteListRouter = ['/login', 'notFound'];

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
    staticRoutes[0].children = store.getters.menus;
    const newRouter = createRouter(staticRoutes);
    yanRouter.matcher = newRouter.matcher;
}

function getAuth() {
    let user = store.getters.userInfo;
    let token = store.getters.token;
    let actor = store.getters.actor;
    var hasAuth = user !== null && token != null && actor !== null && user !== undefined && token !== undefined && actor !== undefined;

    return hasAuth;
}

let auth = getAuth();
if (auth) {
    let actor = store.getters.actor2roles[store.getters.actor];
    store.dispatch("initMenus", actor);
    staticRoutes[0].children = store.getters.menus;
}
const yanRouter = createRouter(staticRoutes);

yanRouter.beforeEach((to, from, next) => {
    let hasAuth = getAuth();
    // store.commit('logout');
    if (to.path == '/login') {
        if (hasAuth) {
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
            next();
        }
    }
});

export default yanRouter;