<template>
  <div id="app">
    <!-- 登入后的 box -->
    <div class="right" v-if="isSingIn">
      <TheLeftNav class="left" />
      <TheHeadBar class="the-head-bar" />
      <router-view class="view" :class="{ 'max-right': isCollapse }" />
    </div>
    <!-- 未登入 box -->
    <router-view class="view" v-else />
  </div>
</template>

<style lang="stylus">
@import url('~@/style/element.css')
#app
  &:after
    content ''
    display block
    clear both
  .the-head-bar
    position sticky
    top 0
    z-index 1
  .left
    position fixed
    height 100%
    z-index 2
  .right
    z-index 1
    transition-duration 1s
    .view
      padding 10px
      margin-left 200px
      transition-duration 1s
    .max-right
      margin-left 65px
</style>

<script>
export default {
  components: {
    TheLeftNav: () => import("@/components/TheLeftNav.vue"),
    TheHeadBar: () => import("@/components/TheHeadBar")
  },
  data() {
    return {};
  },
  computed: {
    classObject() {
      return {};
    },
    isCollapse() {
      return this.$store.state.isCollapse;
    },
    isSingIn() {
      return this.$store.state.isLogin;
    }
  },
  methods: {
    // 检测屏幕视图部分（client）宽度
    windSize() {
      let clientWidth = document.documentElement.clientWidth;
      if (clientWidth < 1000) {
        this.$store.commit("changeNav", true);
      } else {
        this.$store.commit("changeNav", false);
      }
    }
  },
  mounted() {
    this.windSize();
    window.onresize = () => {
      this.windSize();
    };
    this.$router.push("/");
  },
  destroyed() {
    window.onresize = null;
    debugger;
  }
};
</script>
