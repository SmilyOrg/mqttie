import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/topics/list',
    },
    {
      path: '/messages',
      name: 'messages',
      component: require('@/components/Messages').default,
    },
    {
      path: '/topics/list',
      name: 'topics-list',
      component: require('@/components/TopicsList').default,
    },
    {
      path: '/topics/graph',
      name: 'topics-graph',
      component: require('@/components/TopicsGraph').default,
    },
    // {
    //   path: '/subscriptions',
    //   name: 'subscriptions',
    //   component: require('@/components/Subscriptions').default,
    // },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
