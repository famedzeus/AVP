import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import '../assets/app.css'
import gameStore from './store/gameStore'
// import vuetify from './plugins/vuetify'

Vue.use(Vuex)

const store = new Vuex.Store(gameStore)

new Vue({
  store,
  // vuetify,
  el: '#app',
  render: h => h(App)
})
