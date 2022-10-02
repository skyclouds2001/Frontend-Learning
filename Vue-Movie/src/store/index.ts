import { createStore } from 'vuex'

export default createStore({
  state: {
    isShowBack: false
  },
  getters: {
    getIsShowBack (state: { isShowBack: boolean }) {
      return state.isShowBack
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
