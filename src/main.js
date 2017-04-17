// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Router from 'vue-router';
import trainMain from './components/trainMain/trainMain.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

Vue.use(Router);
Vue.use(ElementUI);

/* eslint-disable no-new */
const routes = [{path: '/trainMain', component: trainMain}];
const router = new Router({routes: routes});

const app = new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app');
