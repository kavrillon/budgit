import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      mobileNavigation: false
    },

    actions: {
      toggleNavigation: ({ commit }) => commit('toggleNavigation'),
      setNavigation: ({ commit }) => commit('setNavigation'),
    },

    mutations: {
      toggleNavigation (state) {
        state.mobileNavigation = !state.mobileNavigation
      },
      setNavigation (state, status) {
        state.mobileNavigation = status
      }
    },

    getters: {
      mobileNavigation (state) {
        return state.mobileNavigation
      }
    }
  })
}
