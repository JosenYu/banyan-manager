<template>
  <div class="detail_sell">
    <h3 class="detail_sell-title">出售信息</h3>
    <!-- 记录详情 -->
    <el-table :data="sellTableList">
      <el-table-column type="expand">
        <template #default="{row}">
          <el-form inline>
            <el-form-item
              style="width:30%"
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
        <template #default="scope">
          <el-button
            icon="el-icon-edit"
            type="primary"
            @click="openSellDialog(scope)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog title="修改出售信息" :visible.sync="dialogVisible" width="30%">
      <el-form :model="sellForm" label-width="100px">
        <el-form-item label="出售数量">
          <el-input-number
            :min="1"
            :max="detail.surplusNumber"
            @change="changePrice"
            v-model="sellForm.sellNumber"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="单价">
          <el-input-number
            :min="0"
            @change="changePrice"
            v-model="sellForm.retail"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总价格">
          <el-input-number
            v-model="sellForm.totalRetail"
            disabled
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSubmit">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    detail: Object,
    sellTableList: {
      type: Array,
      default: () => ({
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
      })
    }
  },
  data() {
    return {
      dialogVisible: false,
      sellTableTitle: ["sellNumber", "retail", "totalRetail", "createdAt"],
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
      sellForm: {}
    };
  },
  methods: {
    changePrice() {
      this.sellForm.totalRetail =
        this.sellForm.retail * this.sellForm.sellNumber;
    },
    openSellDialog({ row }) {
      this.sellForm = row;
      // console.log(this.sellForm);
      this.dialogVisible = true;
    },
    // 更新出售
    updateSubmit() {
      this.dialogVisible = false;
      this.$emit("updateSell", this.sellForm);
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail_sell
  .detail_sell-title
    border-left 2px solid green
    padding-left 10px
</style>
