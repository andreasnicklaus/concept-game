import { createStore } from 'vuex'
import mutations from './mutations'
import actions from './actions'
import fields from './fields.json'

export default createStore({
  state: {
    fields
  },
  getters: {
  },
  mutations: {
    ...mutations
  },
  actions: {
    ...actions
  },
  modules: {
  }
})
