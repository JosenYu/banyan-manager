<template>
  <!-- 库存查询 -->
  <div class="quantity">
    <TheSearch @search="search" />
    <el-table :data="tableData" height="700">
      <el-table-column
        v-for="(item, key, index) in tableTitle"
        :key="index"
        :label="item"
        :prop="key"
      ></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            @click="detail(scope)"
            icon="el-icon-tickets"
            title="详情"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="changeCurrent"
      :total="total"
    ></el-pagination>
  </div>
</template>

<style lang="stylus" scoped></style>
<script>
import { getCommodity } from "@/api/commodity.js";
export default {
  components: {
    TheSearch: () => import("@/components/TheSearch")
  },
  data() {
    return {
      tableTitle: {
        name: "名称",
        model: "型号/规格",
        brand: "品牌",
        number: "数量"
      },
      tableData: [
        {
          createdAt: "2019-11-09T05:47:30.784Z",
          model: "2",
          name: "3",
          number: 2,
          remarks: "222",
          retail: 2,
          source: "2",
          brand: "2",
          price: 2,
          totalPrice: 2,
          unit: "2",
          updatedAt: "2019-11-09T09:45:48.313Z",
          __v: 0,
          _id: "5dc652f2ffc70a28917bf929"
        }
      ],
      searchForm: {},
      total: 1
    };
  },
  methods: {
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
    // 详情
    detail(scope) {
      console.log("详情页", scope);
      this.$router.push({
        name: "详情页",
        params: scope.row
      });
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
  mounted() {
    this.getCommodity();
  }
};
</script>
