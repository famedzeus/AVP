import Vue from 'vue'
import Vuex from 'vuex'
import App from './app.vue'
import '../assets/app.css'
import gameStore from './store/gameStore'
import { AudioShape } from "./classes/AudioShape.js";
// import vuetify from './plugins/vuetify'
import axios from "axios";

 
// Vue.use(KnobControl)
Vue.use(Vuex)

Vue.prototype.$audioShape = new AudioShape();
Vue.prototype.$http = axios;

const store = new Vuex.Store(gameStore)

new Vue({
  store,
  // vuetify,
  el: '#app',
  render: h => h(App)
})
