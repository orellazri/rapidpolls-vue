import Vue from 'vue'
import Vuex from 'vuex'

import firebase from '@/firebase';
import { LayoutPlugin } from 'bootstrap-vue';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    changeUser(state, user) {
      state.user = user;
    }
  },
  actions: {
    async loginGoogle() {
      const provider = new firebase.auth.GoogleAuthProvider();
			await firebase.auth().signInWithPopup(provider);
    },

    logout() {
      firebase.auth().signOut();
      
    },
  },
  modules: {
  }
})
