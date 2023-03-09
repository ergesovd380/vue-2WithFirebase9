import Vue from 'vue'
import VueRouter from 'vue-router'
import routerGuard from './routerGuard'
import HomePage from '../components/HomePage.vue'
import AdPage from '../components/Ads/AdPage.vue'
import LoginPage from '../components/Auth/LoginPage.vue'
import MyAdsPage from '../components/Ads/MyAdsPage.vue'
import NewAdPage from '../components/Ads/NewAdPage.vue'
import OrdersPage from '../components/User/MyOrdersPage.vue'
import OrderAdPage from '../components/Order/OrderAdPage.vue'
import RegistrationPage from '../components/Auth/RegistrationPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/list',
    name: 'list',
    component: MyAdsPage,
    beforeEnter: routerGuard
  },
  {
    path: '/newads',
    name: 'newads',
    component: NewAdPage,
    beforeEnter: routerGuard
  },
  {
    path: '/orders',
    name: 'orders',
    component: OrdersPage,
    beforeEnter: routerGuard
  },
  {
    path: '/registration',
    name: 'registration',
    component: RegistrationPage
  },
  {
    path: '/ad/:id',
    name: 'ad',
    props: true,
    component: AdPage,
    beforeEnter: routerGuard
  },
  {
    path: '/order/:id',
    name: 'order',
    props: true,
    component: OrderAdPage,
    beforeEnter: routerGuard
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
