<template>
  <div class="the-search">
    <el-form :model="form" :inline="true">
      <el-form-item label="名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="牌子">
        <el-input v-model="form.brand"></el-input>
      </el-form-item>
      <el-button @click="search">搜索</el-button>
    </el-form>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
export default {
  data: () => ({
    form: {
      name: "",
      brand: ""
    }
  }),
  methods: {
    search() {}
  },
  mounted() {}
};
</script>
