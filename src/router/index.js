import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/pages/Index';
import Resume from '@/pages/Resume';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/resume',
      redirect: { path: '/resume/zh' }
    },
    {
      path: '/resume/:lang',
      name: 'Resume',
      component: Resume
    }
  ]
});
