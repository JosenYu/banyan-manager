<template>
  <div class="detail">
    <h1 class="detail__head-title">商品信息</h1>
    <el-form inline :model="detail" ref="ruleForm" label-width="100px">
      <el-form-item
        v-for="(item, index) in title"
        :key="index"
        :label="$t(item) + ':'"
      >
        <span>{{ detail[item] }}</span>
      </el-form-item>
    </el-form>
    <h1 class="detail__head-title">出口信息</h1>
    <!-- 出售记录 -->
    <el-table :data="sellList">
      <el-table-column label="ID" prop="_id"></el-table-column>
      <el-table-column label="商品编号" prop="stock_id"></el-table-column>
      <el-table-column label="出售数量" prop="sellNumber"></el-table-column>
      <el-table-column label="售价" prop="retail"></el-table-column>
      <el-table-column label="总售价" prop="totalRetail"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import stock from "@/api/stock";
export default {
  data: () => ({
    detail: {
      unit: "只",
      surplusNumber: 1,
      totalNumber: 0,
      price: 2,
      totalPrice: 1,
      _id: "5e554338870cb4b22aff8bcd",
      name: "1",
      model: "1",
      brand: "1",
      createdAt: "2020-02-25T15:54:32.869Z",
      updatedAt: "2020-02-25T15:54:32.869Z",
      __v: 0
    },
    title: [
      "_id",
      "__v",
      "name",
      "model",
      "brand",
      "unit",
      "surplusNumber",
      "totalNumber",
      "price",
      "totalPrice",
      "createdAt",
      "updatedAt"
    ],
    sellList: [
      {
        sellNumber: 1,
        retail: 1,
        totalRetail: 1,
        _id: "5e5619a011e024bbcaa09085",
        stock_id: "5e554338870cb4b22aff8bcd",
        createdAt: "2020-02-26T07:09:20.785Z",
        updatedAt: "2020-02-26T07:09:20.785Z",
        __v: 0
      }
    ]
  }),
  methods: {},
  mounted() {
    // console.log(this.$route.params.row);
    this.detail = this.$route.params.row;
    // debugger;
    stock.getSell(this.$route.params.row._id).then(result => {
      // console.log(result);
      this.sellList = result.data;
    });
  }
};
</script>

<style lang="stylus" scoped>
.detail
  .el-form
    .el-form-item
      width 30%
  .detail__head-title
    border-bottom 1px solid
</style>
