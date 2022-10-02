import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/components/Home.vue';
import Movie from '@/components/Movie.vue';
import About from '@/components/About.vue';

import Tab1 from '@/components/tabs/Tab1.vue';
import Tab2 from '@/components/tabs/Tab2.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: Home,
            props: true,
        },
        {
            path: '/movie',
            component: Movie,
        },
        {
            path: '/movie/:id',
            component: Movie,
        },
        {
            path: '/about',
            component: About,
            children: [
                {
                    path: 'tab1',
                    component: Tab1,
                },
                {
                    path: 'tab2',
                    component: Tab2,
                },
            ],
        },
    ],
});

router.beforeEach((to, from, next) => {
    console.log('全局前置守卫');
    console.log(to);
    console.log(from);
    console.log(next);
    next();
});

export default router;
