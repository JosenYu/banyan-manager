<template>
  <nav class="the-left-nav" :class="{ 'hide-left-nav': isCollapse }">
    <el-menu
      router
      class="el-menu"
      :collapse="isCollapse"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <!-- 没有子选项 -->
      <el-menu-item
        v-for="(item, index) in router"
        :key="'i' + index"
        :index="item.path"
      >
        <i :class="item.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
      <!-- 具有子选项 -->
      <el-submenu
        v-for="(item, index) in children"
        :key="index"
        :index="item.path"
      >
        <template #title>
          <i :class="item.icon"></i>
          <span>{{ item.name }}</span>
        </template>
        <el-menu-item
          v-for="(itemm, indexx) in item.children"
          :key="indexx"
          :index="item.path + '/' + itemm.path"
          >{{ itemm.name }}</el-menu-item
        >
      </el-submenu>
    </el-menu>
  </nav>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    router() {
      return this.$router.options.routes.filter(v => !v.children);
    },
    children() {
      let list = this.$router.options.routes.filter(v => v.children);
      list = list.map(item => {
        item.children = item.children.filter(v => v.show);
        return item;
      });
      return list;
    },
    // 是否崩塌 true 隐藏 false 展开
    isCollapse() {
      let isCollapse = this.$store.state.isCollapse;
      return isCollapse;
    }
  }
};
</script>

<style lang="stylus" scoped>
.the-left-nav
  background-color #545c64
  z-index 10
  width 200px
  transition-duration 1s
  overflow hidden
  .el-menu
    border none
.hide-left-nav
  width 65px
</style>
