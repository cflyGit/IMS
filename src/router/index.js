import Vue from 'vue'
import router from 'vue-router'
import store from '../store'

import login from '@/views/login'
import Home from '@/views/Home'

Vue.use(router)
const originalPush = router.prototype.push
router.prototype.push = function push (location) {
    return originalPush.call(this, location).catch(err => err)
}
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
    store.dispatch("initMenus")
    staticRoutes[0].children = store.getters.menus;
    const newRouter = createRouter(staticRoutes);
    yanRouter.matcher = newRouter.matcher;
}

store.dispatch("initMenus")
staticRoutes[0].children = store.getters.menus;
const yanRouter = createRouter(staticRoutes);

export default yanRouter;