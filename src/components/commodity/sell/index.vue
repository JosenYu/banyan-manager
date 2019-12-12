<template>
  <div class="out">
    <TheSearch @search="search" />
    <el-table :data="tableData" class="out__table" max-height="700">
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="型号/规格" prop="model"></el-table-column>
      <el-table-column label="品牌" prop="brand"></el-table-column>
      <el-table-column label="单位" prop="unit"></el-table-column>
      <el-table-column label="数量" prop="number"></el-table-column>
      <el-table-column label="建议零售" prop="MSRP"></el-table-column>
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
          <li v-for="(item, key, index) in commodity" :key="index">
            {{ $t(key) }} : {{ item }}
          </li>
        </ul>
        <!-- 选择数量 -->
        <div class="dialog__check-number">
          <h3>出售数量</h3>
          <el-input-number
            v-model="form.number"
            :max="commodity.number"
          ></el-input-number>
          <span class="check-number__max">共: {{ commodity.number }}</span>
        </div>
        <!-- 售价/总价 -->
        <div class="dialog___retail">
          <h3>售价(建议零售)</h3>
          <el-input-number v-model="form.retail"></el-input-number>
          <h3>￥ {{ totalRetail }} 元</h3>
        </div>
        <!-- 备注信息 -->
        <h3>备注信息</h3>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="remarks"
        ></el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitOut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getCommodity, updateCommodity } from "@/api/commodity.js";
export default {
  components: {
    TheSearch: () => import("@/components/TheSearch")
  },
  data() {
    return {
      remarks: "",
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
        "MSRP",
        "from",
        "remarks",
        "updatedAt",
        "createdAt"
      ],
      tableData: [],
      searchForm: {},
      total: 1,
      // 商品信息
      commodity: {},
      // 提交表单
      form: { number: 1, retail: 0, totalRetail: 0 },
      dialogVisible: false
    };
  },
  methods: {
    // 提交出售单
    submitOut() {
      this.form.remarks = this.remarks;
      this.form.number = this.commodity.number - this.form.number;
      this.form.ID = this.form._id;
      delete this.form._id;
      updateCommodity(this.form).then(result => {
        if (result.status === 200) {
          this.$message({
            message: "提交成功",
            type: "success"
          });
          this.dialogVisible = false;
        }
        this.getCommodity();
      });
    },
    // 打开出售框
    openSell({ row }) {
      this.commodity = row;
      Object.assign(this.form, row);
      this.form.retail = row.MSRP;
      this.form.remarks = "";
      this.dialogVisible = true;
    },
    // 改变当前页码
    changeCurrent(v) {
      this.getCommodity(
        this.searchForm.name,
        this.searchForm.model,
        this.searchForm.brand,
        v
      );
    },
    // 搜索按钮
    search(form) {
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
        this.tableData = result.data.documents;
        this.total = result.data.totalCounts;
      });
    }
  },
  computed: {
    // 出售总价格
    totalRetail() {
      return this.form.number * this.form.retail;
    }
  },
  watch: {
    totalRetail(n) {
      this.form.totalRetail = n;
    }
  },
  mounted() {
    this.getCommodity();
  }
};
</script>

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
