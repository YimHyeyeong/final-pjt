import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import vueMoment from 'vue-moment'
import moment from 'moment-timezone'

moment.tz.setDefault('Asia/Seoul')
Vue.prototype.$defaultUrl = 'https://moviereco.click';
Vue.prototype.$webSockettUrl = 'wss://moviereco.click/ws/chat';
Vue.config.productionTip = false
Vue.use(vueMoment, {
  moment,
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
