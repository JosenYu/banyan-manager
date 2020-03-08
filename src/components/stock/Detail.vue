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
      <el-table-column
        v-for="(item, index) in sellTitle"
        :key="index"
        :label="$t(item)"
        :prop="item"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
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
      __v: 0,
      importer_id: "123"
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
      "updatedAt",
      "importer_id"
    ],
    sellTitle: [
      "_id",
      "__v",
      "stock_id",
      "sellNumber",
      "retail",
      "totalRetail",
      "createdAt",
      "updatedAt",
      "company",
      "linkman",
      "tel",
      "address"
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
        __v: 0,
        company: "2",
        linkman: "2",
        tel: 2,
        address: "2"
      }
    ]
  }),
  methods: {},
  mounted() {
    stock.searchOne(this.$route.params.row._id).then(result => {
      result.data;
      this.detail = result.data.oneStock;
      this.sellList = result.data.sell.map(v => ({
        sellNumber: v.sell.sellNumber,
        retail: v.sell.retail,
        totalRetail: v.sell.totalRetail,
        _id: v.sell._id,
        stock_id: v.sell.stock_id,
        createdAt: v.sell.createdAt,
        updatedAt: v.sell.updatedAt,
        __v: v.sell.__v,
        exporter_id: v.exporter._id,
        company: v.exporter.company,
        linkman: v.exporter.linkman,
        tel: v.exporter.tel,
        address: v.exporter.address
      }));
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
