<template>
  <div id="app">
    <TheLeftNav class="left" />
    <div
      :class="{ 'max-right': isCollapse, 'min-right': !isCollapse }"
      class="right"
    >
      <TheHeadBar class="the-head-bar" />
      <router-view class="view" />
    </div>
  </div>
</template>

<style lang="stylus">
@import url('~@/style/element.css')
html, body
  margin 0
  min-width 1080px
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
.max-right
  margin-left 65px
.min-right
  margin-left 200px
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
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  }
};
</script>
