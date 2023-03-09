export default {
  state: {
    user: null
  },
  getters: {
    user (state) {
      return state.user
    },
    isUserLogined (state) {
      return state.user === null
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    setUser ({ commit }, payload) {
      commit('setUser', payload)
    }
  }
}
