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
/* 设置滚动条的样式 */
::-webkit-scrollbar
  width 8px
  height 5px
  background-color #ddd
/* 滚动槽 */
::-webkit-scrollbar-track
  border-radius 10px
/* 滚动条滑块 */
::-webkit-scrollbar-thumb
  border-radius 10px
  background #aaa
html, body
  margin 0
  min-width 1080px
  #app
    &:after
      content ''
      display block
      clear both
    .left
      position fixed
      height 100%
    .right
      transition-duration 1s
      overflow hidden
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
  },
  computed: {
    isCollapse() {
      let isCollapse = this.$store.state.isCollapse;
      return isCollapse;
    }
  }
};
</script>
