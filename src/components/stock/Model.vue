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
      <el-table-column label="操作">
        <template #default="scope">
          <div>
            <el-button @click="update(scope)">修改</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 创建模型弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="50%">
      <el-form ref="form" :model="modelForm" label-width="100px" :rules="rules">
        <el-form-item label="模型名称:" prop="name">
          <el-input v-model="modelForm.name" />
        </el-form-item>
        <el-form-item label="模型规格:" prop="model">
          <el-input v-model="modelForm.model" />
        </el-form-item>
        <el-form-item label="模型品牌:" prop="brand">
          <el-input v-model="modelForm.brand" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitModel">
          提交
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
    // 查询条件
    selectForm: {
      name: "",
      model: "",
      brand: "",
      currentPage: 1
    },
    total: 0,
    // 创建/修改
    modelForm: {
      name: "",
      model: "",
      brand: ""
    }
  }),
  methods: {
    search(form) {
      this.selectForm = form;
      this.getModel();
    },
    changeCurrent(v) {
      this.selectForm.currentPage = v;
      this.getModel();
    },
    // 创建商品模型
    submitModel() {
      if (
        !(this.modelForm.name && this.modelForm.model && this.modelForm.brand)
      )
        return;
      if ("_id" in this.modelForm) {
        stock.updateModel(this.modelForm).then(() => {
          this.modelForm = { name: "", model: "", brand: "" };
          this.getModel();
          this.$message({
            message: "更新成功",
            type: "success"
          });
        });
      } else {
        stock.createModel(this.modelForm).then(result => {
          if (result.data.doc >= 1) {
            this.$message({
              message: "已经存在模型",
              type: "warning"
            });
          } else {
            this.modelForm = { name: "", model: "", brand: "" };
            this.$message({
              message: "创建成功",
              type: "success"
            });
            this.getModel();
          }
        });
      }
      this.dialogVisible = false;
    },
    // 获取商品模型
    getModel() {
      stock.getModel(this.selectForm).then(result => {
        this.tableData = result.data.doc;
        this.total = result.data.count;
      });
    },
    update({ row }) {
      this.dialogVisible = true;
      this.modelForm = row;
    }
  },
  mounted() {
    this.getModel();
  }
};
</script>

<style lang="stylus" scoped></style>
