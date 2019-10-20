<template>
  <div id="app">
    <TheLeftNav class="nav box" />
    <router-view class="view box" />
  </div>
</template>

<style lang="stylus">
body
  margin 0
  #app
    &:after
      content ''
      display block
      clear both
    .box
      float left
      width 200px
    .nav
      position fixed
      height 100%
    .view
      margin-left 210px
      width 79%
@media screen and (max-width: 1000px)
  body
    width 1000px
</style>

<script>
export default {
  components: {
    TheLeftNav: () => import("@/components/TheLeftNav.vue")
  },
  data: () => ({})
};
</script>
