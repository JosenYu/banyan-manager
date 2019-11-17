<template>
  <div class="manager">
    <el-page-header @back="$router.go(-1)" content></el-page-header>
    <router-view class="manager__view" />
  </div>
</template>
<script>
export default {};
</script>
<style lang="stylus" scoped>
.manager__view
  margin-top 10px
</style>
