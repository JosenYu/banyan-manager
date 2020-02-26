<template>
  <div class="the-header-bar">
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
    }
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
.the-header-bar
  background-color powderblue
  padding 10px
  .el-breadcrumb
    margin-left 10px
    display inline-block
</style>
