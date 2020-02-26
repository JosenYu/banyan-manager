<template>
  <div class="sell">
    <TheSearch @search="search" />
    <el-table :data="tableData" class="out__table" max-height="700">
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="型号/规格" prop="model"></el-table-column>
      <el-table-column label="品牌" prop="brand"></el-table-column>
      <el-table-column label="单位" prop="unit"></el-table-column>
      <el-table-column label="数量" prop="surplusNumber"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button @click="openSell(scope)">出库</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changeCurrent"
      :total="total"
    ></el-pagination>
    <!-- 打开出售框 -->
    <el-dialog class="dialog" title="出库提示" :visible.sync="dialogVisible">
      <div class="dialog__info">
        <!-- 信息 -->
        <ul>
          <li v-for="(item, key, index) in stock" :key="index">
            {{ $t(key) }} : {{ item }}
          </li>
        </ul>
        <!-- 出售数量 :max="form.surplusNumber"-->
        <div class="dialog__check-number">
          <h3>出售数量（只）</h3>
          <el-input-number
            v-model="form.sellNumber"
            :max="form.max"
            :min="0"
            @change="changeSellNumber"
          ></el-input-number>
          <span class="check-number__max">
            剩余共: {{ form.surplusNumber }}
          </span>
        </div>
        <!-- 售价/总价 -->
        <div class="dialog___retail">
          <h3>售价（只/元）</h3>
          <el-input-number
            @change="changeSellNumber"
            :min="0"
            v-model="form.retail"
          ></el-input-number>
          <h3>￥ {{ form.totalRetail }} 元</h3>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitOut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import stock from "@/api/stock";
export default {
  components: {
    TheSearch: () => import("@/components/TheSearch")
  },
  data() {
    return {
      a: {
        max: 1,
        min: 0,
        val: 0
      },
      tableData: [
        {
          unit: "只",
          surplusNumber: 100,
          retail: 0.2,
          totalRetail: 20,
          _id: "5e4251b4b7fb6130a1108855",
          name: "323",
          model: "323",
          brand: "qwe",
          createdAt: "2020-02-11T07:03:16.748Z",
          updatedAt: "2020-02-11T07:03:16.748Z"
        }
      ],
      searchForm: {
        name: "",
        model: "",
        brand: "",
        currentPage: 1
      },
      total: 1,
      // 需要出售的商品信息
      stock: {
        unit: "只",
        surplusNumber: 100,
        totalNumber: 100,
        retail: 0.2,
        totalRetail: 20,
        _id: "5e4251b4b7fb6130a1108855",
        name: "323",
        model: "323",
        brand: "qwe",
        createdAt: "2020-02-11T07:03:16.748Z",
        updatedAt: "2020-02-11T07:03:16.748Z"
      },
      // 提交出售表单
      form: {
        stock_id: "",
        sellnumber: 0,
        surplusNumber: 0,
        retail: 0,
        totalRetail: 0
      },
      dialogVisible: false
    };
  },
  methods: {
    // 改变出售数量时发生的变化
    changeSellNumber() {
      this.form.surplusNumber = this.stock.surplusNumber;
      this.form.surplusNumber = this.form.surplusNumber - this.form.sellNumber;
      this.form.totalRetail = this.form.retail * this.form.sellNumber;
    },
    // 提交出售单
    submitOut() {
      stock.sell(this.form).then(() => {
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.dialogVisible = false;
        this.getStock();
      });
    },
    // 打开出售框
    openSell({ row }) {
      this.dialogVisible = true;
      this.stock = row;
      this.form = {
        stock_id: row._id,
        sellNumber: 0,
        max: this.stock.surplusNumber,
        retail: 0,
        totalRetail: 0,
        surplusNumber: row.surplusNumber
      };
    },
    // 改变当前页码
    changeCurrent(v) {
      this.searchForm.currentPage = v;
      this.getStock();
    },
    // 搜索按钮
    search(form) {
      this.searchForm = form;
      this.getStock();
    },
    /**
     * 获取商品数据
     * @param {String} name 商品名称
     * @param {String} model 商品名称
     * @param {String} brand 商品名称
     * @param {String} pageCurrent 当前页码
     */
    getStock() {
      stock.queryCondition(this.searchForm).then(result => {
        this.tableData = result.data.doc;
        this.total = result.data.count;
      });
    }
  },
  computed: {},
  watch: {},
  mounted() {
    this.getStock(this.searchForm);
  }
};
</script>

<style lang="stylus" scoped>
.sell
  .el-form
    .el-form-item
      width 45%
  .dialog
    .dialog__check-number
      .check-number__max
        color red
        margin-left 10px
</style>
