import dt from 'datatables.net-se';
import dts from 'datatables.net-scroller';

import Vue from 'vue';
import VueChatScroll from 'vue-chat-scroll';
import Trend from 'vuetrend';
import TreeView from "vue-json-tree-view";

import App from './App';
import router from './router';
import store from './store';

var $ = require('jquery'); // eslint-disable-line

Vue.use(VueChatScroll);
Vue.use(Trend);
Vue.use(TreeView);

dt(window, $);
dts(window, $);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: '<App/>',
}).$mount('#app');
