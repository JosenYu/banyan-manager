<template>
  <div class="out">
    <TheSearch @search="search" />
    <el-table :data="tableData" class="out__table">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form inline>
            <el-form-item
              v-for="(item, index) in tableTitle"
              :key="index"
              :label="$t(item) + ':'"
            >
              <span>{{ props.row[item] }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="型号/规格" prop="model"></el-table-column>
      <el-table-column label="品牌" prop="brand"></el-table-column>
      <el-table-column label="单位" prop="unit"></el-table-column>
      <el-table-column label="零售" prop="retail"></el-table-column>
      <el-table-column label="数量" prop="number"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button @click="OpenOut(scope)">出库</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 打开出售框 -->
    <el-dialog class="dialog" title="出库提示" :visible.sync="dialogVisible">
      <div class="dialog__info">
        <!-- 信息 -->
        <div v-for="(item, key, index) in outForm.commodity" :key="index">
          <span>{{ $t(key) }} :{{ item }}</span>
        </div>
        <!-- 选择数量 -->
        <div class="dialog__check-number">
          <h3>出售数量 / {{ outForm.commodity.unit }}</h3>
          <el-input-number v-model="outForm.number"></el-input-number>
          <span class="check-number__max"
            >最多{{ outForm.commodity.number }}</span
          >
        </div>
        <!-- 售价 -->
        <div class="dialog___retail">
          <h3>出售单价 / 元</h3>
          <el-input-number v-model="outForm.retail"></el-input-number>
          <h3>￥ {{ totalRetail }} 元</h3>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitOut">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 分页 -->
    <el-pagination
      @current-change="changeCurrent"
      :total="total"
    ></el-pagination>
  </div>
</template>

<style lang="stylus" scoped>
.out
  .el-form
    .el-form-item
      width 45%
  .dialog
    .dialog__check-number
      .check-number__max
        color red
        margin-left 10px
</style>
<script>
import { getCommodity, updateCommodity } from "@/api/commodity.js";
export default {
  components: {
    TheSearch: () => import("@/components/TheSearch")
  },
  data() {
    return {
      tableTitle: [
        "_id",
        "__v",
        "name",
        "model",
        "brand",
        "number",
        "unit",
        "price",
        "totalPrice",
        "retail",
        "source",
        "remarks",
        "updatedAt",
        "createdAt"
      ],
      tableData: [],
      searchForm: {},
      total: 1,
      outForm: { commodity: {}, number: 0, retail: 0, totalRetail: 0 },
      dialogVisible: false
    };
  },
  methods: {
    // 提交出售单
    submitOut() {
      this.outForm.commodity.number =
        this.outForm.commodity.number - this.outForm.number;
      console.log(this.outForm.commodity);
      updateCommodity(this.outForm.commodity).then(result => {
        console.log(result);
        if (result.data.msg === "success") {
          this.dialogVisible = false;
        }
      });
    },
    OpenOut({ row }) {
      this.outForm.commodity = row;
      console.log(this.outForm);
      this.dialogVisible = true;
    },
    // 改变当前页码
    changeCurrent(v) {
      console.log("当前页码", v);
      this.getCommodity(
        this.searchForm.name,
        this.searchForm.model,
        this.searchForm.brand,
        v
      );
    },
    // 搜索按钮
    search(form) {
      console.log("详情页", form);
      this.getCommodity(form.name, form.model, form.brand);
      this.searchForm = form;
    },
    /**
     * 获取商品数据
     * @param name 商品名称
     * @param model 商品名称
     * @param brand 商品名称
     * @param pageCurrent 当前页码
     */
    getCommodity(name, model, brand, pageCurrent) {
      getCommodity(name, model, brand, pageCurrent).then(result => {
        this.tableData = result.data.list.documents;
        this.total = result.data.list.totalCounts;
      });
    }
  },
  computed: {
    // 出售总价格
    totalRetail() {
      return this.outForm.number * this.outForm.retail;
    }
  },
  watch: {
    outForm: {
      handler(n) {
        if (n.number >= n.commodity.number) {
          n.number = n.commodity.number;
        }
        n.totalRetail = n.number * n.retail;
      },
      deep: true
    }
  },
  mounted() {
    this.getCommodity();
  }
};
</script>
