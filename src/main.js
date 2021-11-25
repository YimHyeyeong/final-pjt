import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.prototype.$defaultUrl = 'http://13.125.210.253/';
Vue.prototype.$webSockettUrl = 'ws://13.125.210.253/ws/chat';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
