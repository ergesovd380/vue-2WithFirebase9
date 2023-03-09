import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import vuetify from './plugins/vuetify'
import app from './firebase/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import OrderPage from './components/Order/OrderPage.vue'
Vue.component('appOrder', OrderPage)

new Vue({
  vuetify,
  router,
  store,
  app,
  created () {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        this.$store.dispatch('setUser', user)
      }
    })
    this.$store.dispatch('myAds')
    this.$store.dispatch('myOrders')
  },
  render: function (h) { return h(App) }
}).$mount('#app')
