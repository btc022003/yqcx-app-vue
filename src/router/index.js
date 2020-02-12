import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/around',
    name: 'Around',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Around.vue')
  },
  {
    path: '/guide',
    name: 'Guide',
    component: () => import('../views/Guide.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import('../views/News.vue')
  }
];

const router = new VueRouter({
  routes
});

export default router;
