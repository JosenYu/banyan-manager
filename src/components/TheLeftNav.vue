<template>
  <el-menu router class="the-left-nav">
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">主页</span>
    </el-menu-item>
    <el-menu-item index="/manager">
      <i class="el-icon-s-management"></i>
      <span slot="title">管理库存</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {};
</script>

<style lang="stylus" scoped></style>
