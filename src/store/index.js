import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import table from './table'

export default new Vuex.Store({
  modules: {
    table
  }
})