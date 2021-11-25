import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.prototype.$defaultUrl = 'https://moviereco.click';
Vue.prototype.$webSockettUrl = 'wss://moviereco.click/ws/chat';
Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
