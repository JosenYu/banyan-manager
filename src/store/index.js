import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isCollapse: false,
    headBar: ["首页"]
  },
  mutations: {
    // 改变导航栏状态
    changeNav(state, is) {
      state.isCollapse = is;
    },
    // 设置头部定位
    setHeadBar(state, { path }) {
      state.headBar = path;
    }
  },
  getters: {
    // headTitle: state => {}
  },
  actions: {},
  modules: {}
});
