import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import VueScrollBehavior from 'vue-scroll-behavior'
// VueAutosize is used for the textarea used to edit a recipe's ingredients/method
import VueAutosize from 'vue-autosize'
import 'vuetify/dist/vuetify.css'
import App from './App'
import router from './router'
import store from './store/store'

Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueAutosize)
Vue.use(VueScrollBehavior, { router: router })

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
