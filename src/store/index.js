import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false
  },
  mutations: {
    // 改变导航栏状态
    changeNav(state, is) {
      state.isCollapse = is;
    }
  },
  actions: {},
  modules: {}
});
