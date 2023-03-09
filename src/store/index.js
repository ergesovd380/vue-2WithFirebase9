import Vue from 'vue'
import Vuex from 'vuex'
import Ads from './Ads'
import Auth from './Coman'
import User from './User'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Ads,
    Auth,
    User
  }
})
