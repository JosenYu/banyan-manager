<template>
  <div class="the-search">
    <el-form :model="form" inline>
      <el-form-item label="名称 :">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="型号/规格 :">
        <el-input v-model="form.model"></el-input>
      </el-form-item>
      <el-form-item label="品牌 :">
        <el-input v-model="form.brand"></el-input>
      </el-form-item>
      <el-button @click="search">搜索</el-button>
    </el-form>
  </div>
</template>

<style lang="stylus" scoped></style>

<script>
export default {
  data() {
    return {
      form: { name: "", model: "", brand: "" }
    };
  },
  methods: {
    search() {
      this.$emit("search", this.form);
    }
  },
  mounted() {}
};
</script>
