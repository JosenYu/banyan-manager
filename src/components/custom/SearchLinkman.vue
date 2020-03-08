<template>
  <!-- 搜索联系人 -->
  <div class="search-linkman">
    <label class="search-linkman__label">联系人：</label>
    <el-input
      v-model="linkman"
      placeholder="联系人："
      class="search-linkman__input"
    ></el-input>
    <el-button class="search-linkman__button" type="primary" @click="onSubmit">
      查询
    </el-button>
    <el-button class="search-linkman__button" @click="add">
      新增
    </el-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    linkman: ""
  }),
  methods: {
    onSubmit() {
      this.$emit("search", this.linkman);
    },
    add() {
      this.$emit("add");
    }
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.search-linkman
  text-align center
  .search-linkman__label
  .search-linkman__input
    width 50%
  .search-linkman__button
    margin-left 10px
</style>
