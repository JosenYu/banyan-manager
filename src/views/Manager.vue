<template>
  <!-- 管理页面 -->
  <div class="manager">
    <TheSearch />
    <el-table :data="tableData" height="500px">
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="品牌" prop="brand"></el-table-column>
      <el-table-column label="数量" prop="num"></el-table-column>
      <el-table-column label="单价" prop="price"></el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button @click="lookUp(scope)">查看</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<style lang="stylus" scoped></style>
<script>
export default {
  components: {
    TheSearch: () => import("@/components/TheSearch")
  },
  data: () => ({
    tableData: [
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      },
      {
        name: "三极管",
        brand: "三星",
        num: 10,
        price: 10
      }
    ]
  }),
  methods: {
    lookUp(scope) {
      console.log(scope);
    }
  },
  mounted() {}
};
</script>
