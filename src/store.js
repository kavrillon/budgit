import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      user: null,
    },

    actions: {
      fetchUser({ commit }, id) {
        const uri = `http://localhost:4000/users/${id}`

        return axios.get(uri).then(response => {
          commit('setUser', response.data)
        })
      },
    },

    mutations: {
      setUser(state, user) {
        Vue.set(state, 'user', user)
      },
    },

    getters: {}
  })
}
