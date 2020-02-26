<template>
  <div class="quantity">
    <!-- 搜索 -->
    <TheSearch @search="search" />
    <!-- 表格 -->
    <el-table :data="tableData" max-height="700">
      <el-table-column
        v-for="(item, index) in tableTitle"
        :key="index"
        :label="$t(item)"
        :prop="item"
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
    <!-- 分页器 -->
    <el-pagination
      @current-change="changeCurrent"
      :total="total"
    ></el-pagination>
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
      // i18
      tableTitle: ["name", "model", "brand", "surplusNumber", "unit"],
      tableData: [
        {
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
        }
      ],
      // 查询表达
      searchForm: {
        name: "",
        model: "",
        brand: "",
        currentPage: 1
      },
      total: 1
    };
  },
  methods: {
    search(v) {
      this.searchForm = v;
      this.getData();
    },
    changeCurrent(v) {
      this.searchForm.currentPage = v;
      this.getData();
    },
    getData() {
      stock.queryCondition(this.searchForm).then(result => {
        this.tableData = result.data.doc;
        this.total = result.data.count;
      });
    },
    detail(scope) {
      this.$router.push({ name: "详情页", params: scope });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style></style>
