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
        <el-form-item label="剩余数量">
          <el-input-number
            :min="0"
            :max="detail.totalNumber"
            @change="changePrice"
            v-model="detail.surplusNumber"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总数量">
          <el-input-number
            :min="0"
            @change="changePrice"
            v-model="detail.totalNumber"
          ></el-input-number>
        </el-form-item>
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
    <!-- 出售信息 -->
    <DetailSell
      @updateSell="updateSell"
      :sellTableList="sellTableList"
      :detail="detail"
    />
  </div>
</template>

<script>
import stock from "@/api/stock";
export default {
  components: {
    DetailSell: () => import("./DetailSell")
  },
  data: () => ({
    dialogStock: false,
    detail: {
      unit: "只",
      surplusNumber: 1,
      totalNumber: 10,
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
    sellTableList: []
  }),
  methods: {
    changePrice() {
      this.detail.totalPrice = this.detail.price * this.detail.totalNumber;
    },
    // 更新厂库 stock
    updateStockSubmit() {
      stock.updateStock(this.detail).then(() => {
        this.dialogStock = false;
        this.searchOne();
      });
    },
    // 更新出售
    updateSell(sellForm) {
      stock.updateSell(sellForm).then(() => {
        this.searchOne();
      });
    },
    // 查询某一个商品的详细信息
    searchOne() {
      stock.searchOne(this.$route.params.row._id).then(result => {
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
