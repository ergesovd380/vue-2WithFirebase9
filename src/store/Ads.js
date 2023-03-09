import { collection, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/firebase'
export default {
  state: {
    ads: [],
    orders: []
  },
  mutations: {
    myAds (state) {
      onSnapshot(collection(db, 'ads'), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const ad = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            promo: doc.data().promo,
            imageSrc: doc.data().imageSrc,
            ownerId: doc.data().ownerId,
            image: doc.data().image
          }
          state.ads.push(ad)
        })
      })
    },
    myOrders (state) {
      onSnapshot(collection(db, 'orders'), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const order = {
            id: doc.id,
            name: doc.data().name,
            phone: doc.data().phone,
            ownerId: doc.data().ownerId,
            adId: doc.data().adId,
            title: doc.data().title,
            imageSrc: doc.data().imageSrc,
            description: doc.data().description,
            image: doc.data().image
          }
          state.orders.push(order)
        })
      })
    }
  },
  actions: {
    myAds ({ commit }) {
      commit('myAds')
    },
    myOrders ({ commit }) {
      commit('myOrders')
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => {
        return ad.promo
      })
    },
    myAds (state, getters) {
      return state.ads.filter(ad => {
        return ad.ownerId === getters.user.uid
      })
    },
    myOrders (state, getters) {
      return state.orders.filter(order => {
        return order.ownerId === getters.user.uid
      })
    },
    adById (state) {
      return adId => {
        return state.ads.find(ad => ad.id === adId)
      }
    },
    orderById (state) {
      return orderId => {
        return state.orders.find(order => order.id === orderId)
      }
    }
  }
}
