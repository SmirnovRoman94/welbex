import axios from "axios"
export default {
    state: {
      package: []
    },
    mutations: {
      SET_PACKAGE(state, list){
        state.package = list
      }
    },
    actions: {
        INIT_PACKAGE({commit}){
            return axios.get('https://welbex-76ef1-default-rtdb.firebaseio.com/package.json')
            .then(res => {
                //res
                commit('SET_PACKAGE', res.data)
            })
            .catch(e => console.log(e))
        },
    },
    getters: {
      GET_PACKAGE (state) {
        return state.package
      },
      
    }
  }