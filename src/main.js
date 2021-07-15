import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router';

Vue.use(VueRouter);
Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import Contacts from './pages/listContacts';
import People from "./pages/listPeople.vue";

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/', component: People },
    { path: '/contacts/:id', component: Contacts,  props: true },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
