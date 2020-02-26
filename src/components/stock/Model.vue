<template>
  <!-- 模型 -->
  <div class="model">
    <TheSearch @search="search" />
    <el-button @click="dialogVisible = true">创建模型</el-button>
    <!-- 已有模型 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="名称"> </el-table-column>
      <el-table-column prop="model" label="规格/模型"> </el-table-column>
      <el-table-column prop="brand" label="品牌"> </el-table-column>
    </el-table>
    <!-- 创建模型弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="模型名称:" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="模型规格:" prop="model">
          <el-input v-model="form.model" />
        </el-form-item>
        <el-form-item label="模型品牌:" prop="brand">
          <el-input v-model="form.brand" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createModel">
          确 定
        </el-button>
      </span>
    </el-dialog>
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
  data: () => ({
    dialogVisible: false,
    rules: {
      name: { required: true, message: "请输入商品名称" },
      model: { required: true, message: "请输入商品型号" },
      brand: { required: true, message: "请输入商品品牌" }
    },
    tableData: [],
    form: {
      name: "",
      model: "",
      brand: "",
      currentPage: 1
    },
    total: 0
  }),
  methods: {
    search(form) {
      this.form = form;
      this.getModel();
    },
    changeCurrent(v) {
      this.form.currentPage = v;
      this.getModel();
    },
    // 创建商品模型
    createModel() {
      if (!(this.form.name && this.form.model && this.form.brand)) return;
      stock.getModel(this.form).then(result => {
        // 如果数量大于 1 说明已经有了
        if (result.data.doc.length >= 1) {
          this.$message({
            message: "已经存在模型",
            type: "warning"
          });
        } else {
          stock.createModel(this.form).then(() => {
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.dialogVisible = false;
            this.form = { name: "", model: "", brand: "" };
            this.getModel();
          });
        }
      });
    },
    // 获取商品模型
    getModel() {
      stock.getModel(this.form).then(result => {
        this.tableData = result.data.doc;
        this.total = result.data.count;
      });
    }
  },
  mounted() {
    this.getModel();
  }
};
</script>

<style lang="stylus" scoped></style>
