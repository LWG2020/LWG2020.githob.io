import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import router from './router/router';
import './assets/index.css'
import Vueaxios from 'vue-axios'
import axios from 'axios'
Vue.use(Vueaxios,axios)
Vue.use(router)
Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
