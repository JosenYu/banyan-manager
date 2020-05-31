<template>
  <div class="the-header-bar" :class="{ 'max-right': isCollapse }">
    <i class="el-icon-s-fold" @click="hide"></i>
    <el-breadcrumb separator="/" class="el-breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in title" :key="index">
        {{ item }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isHide: false
    };
  },
  methods: {
    hide() {
      this.isHide = !this.isHide;
      this.$store.commit("changeNav", this.isHide);
    }
  },
  computed: {
    title() {
      return this.$store.state.headBar;
    },
    // 是否崩塌 true 隐藏 false 展开
    isCollapse() {
      let isCollapse = this.$store.state.isCollapse;
      return isCollapse;
    }
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
.the-header-bar
  margin-left 200px
  background-color darksalmon
  padding 10px
  transition-duration 1s
  .el-breadcrumb
    margin-left 10px
    display inline-block
.max-right
  margin-left 65px
</style>
