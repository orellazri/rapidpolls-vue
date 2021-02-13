import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null,
    loading: true,
    user: null,
  },
  mutations: {
    setError(state, error) {
      state.error = error;
      if (error)
        state.loading = false;
    },

    setLoading(state, loading) {
      state.loading = loading;
    },

    setUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    
  },
  modules: {
  }
})
