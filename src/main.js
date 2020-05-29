import Vue from 'vue'
import vuetify from './plugins/vuetify'
import store from "./store/store.js"
import router from './router/route'
import App from './App.vue'
import axios from 'axios'

Vue.config.productionTip = false
window.axios=axios

const token = localStorage.getItem('token')
if (token) {
  Vue.prototype.$http.defaults.headers.common['Authorization'] = token
}

new Vue({
  // component 'Welcome' was not loading when store was not included
  store,
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app')
