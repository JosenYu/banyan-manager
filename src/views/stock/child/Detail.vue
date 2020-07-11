<template>
  <div class="detail">
    <h2 class="detail__head-title">商品信息</h2>
    <el-form inline :model="detail" ref="ruleForm" label-width="100px">
      <el-form-item
        v-for="(item, index) in stockInfotitle"
        :key="index"
        :label="$t(item) + ':'"
      >
        <span>{{ detail[item] }}</span>
      </el-form-item>
      <el-form-item>
        <el-button type="info" @click="dialogStock = true">修改</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="商品信息修改" :visible.sync="dialogStock" width="30%">
      <el-form :model="detail" label-width="100px">
        <el-form-item label="单价">
          <el-input-number
            :min="0"
            @change="changePrice"
            v-model="detail.price"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总价格">
          <el-input-number
            v-model="detail.totalPrice"
            disabled
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogStock = false">取 消</el-button>
        <el-button type="primary" @click="updateStockSubmit">
          提 交
        </el-button>
      </span>
    </el-dialog>
    <h2 class="detail__head-title">出口信息</h2>
    <!-- 出售记录 -->
    <el-table :data="sellTableList">
      <el-table-column type="expand">
        <template #default="{row}">
          <el-form inline>
            <el-form-item
              v-for="(item, index) in sellMoreTitle"
              :key="index"
              :label="$t(item) + ':'"
            >
              <span>{{ row[item] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in sellTableTitle"
        :key="index"
        :label="$t(item)"
        :prop="item"
        width="200"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column label="操作">
        <template>
          <el-button
            icon="el-icon-edit"
            type="primary"
            @click="openUpdateSell"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import stock from "@/api/stock";
export default {
  data: () => ({
    dialogStock: false,
    dialogSell: false,
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
    stockInfotitle: [
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
    sellTableTitle: ["sellNumber", "retail", "totalRetail", "company"],
    sellMoreTitle: [
      "sellNumber",
      "retail",
      "totalRetail",
      "company",
      "linkman",
      "tel",
      "address",
      "_id",
      "__v",
      "stock_id",
      "createdAt",
      "updatedAt"
    ],
    sellTableList: [
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
  methods: {
    changePrice() {
      this.detail.totalPrice = this.detail.price * this.detail.totalNumber;
    },
    // 提交更新的 stock
    updateStockSubmit() {
      this.detail.price;
      this.detail.totalPrice;
      this.detail._id;
      stock.updateStock(this.detail).then(() => {
        this.searchOne();
      });
    },
    openUpdateSell() {},
    searchOne() {
      // debugger;
      stock.searchOne(this.$route.params.row._id).then(result => {
        // result.data;
        // debugger;
        this.detail = result.data.oneStock;
        this.sellTableList = result.data.sell.map(v => ({
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
  },
  mounted() {
    this.searchOne();
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
