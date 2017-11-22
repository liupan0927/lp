import Vue from 'vue'
import ElementUI from 'element-ui'
import app from "./App";
import 'element-ui/lib/theme-chalk/index.css'
import store from "./components/app/info/store/store.js"
import router from "./router/index.js";
import Vuex from 'vuex'
Vue.use(ElementUI)
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.component("app",app);


new Vue({
  el: '#app',
  router,
  store,
  template: '<app />',
})
