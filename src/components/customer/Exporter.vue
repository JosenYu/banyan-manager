<template>
  <div class="exporter">
    <!-- 搜索框 -->
    <SearchLinkman @search="search" @add="add" />
    <!-- 内容主体 -->
    <el-table :data="tableData">
      <el-table-column type="expand">
        <template #default="props">
          <el-form :model="props.row">
            <el-form-item label="联络人：">
              <span>{{ props.row.linkman }}</span>
            </el-form-item>
            <el-form-item label="联系电话：">
              <span>{{ props.row.tel }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="_id"
        :label="$t('_id')"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        prop="company"
        :label="$t('company')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="address"
        :label="$t('address')"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{row}">
          <el-button @click="updateExport(row)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog
      :title="form.type + '出库源'"
      :visible.sync="dialogVisible"
      width="50%"
    >
      <el-form ref="form" :model="form" label-width="120px" :rules="rules">
        <el-form-item label="联系人：" prop="linkman">
          <el-input v-model="form.linkman" />
        </el-form-item>
        <el-form-item label="公司名称：">
          <el-input v-model="form.company" />
        </el-form-item>
        <el-form-item label="联系电话：" prop="tel">
          <el-input type="number" v-model.number="form.tel" />
        </el-form-item>
        <el-form-item label="地址：">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="create">
          确 定
        </el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import custom from "@/api/customer";
export default {
  components: {
    SearchLinkman: () => import("./SearchLinkman")
  },
  data: () => ({
    rules: {
      linkman: [{ required: true, message: "请输入用户名称", trigger: "blur" }],
      tel: [
        { required: true, message: "电话不能为空" },
        { type: "number", message: "电话必须是数字值" }
      ]
    },
    dialogVisible: false,
    total: 1,
    title: ["_id", "company", "address"],
    tableData: [],
    form: {
      type: "添加",
      company: "",
      linkman: "",
      tel: 0,
      address: ""
    }
  }),
  methods: {
    updateExport(e) {
      this.dialogVisible = true;
      this.form = e;
      this.form.type = "更新";
    },
    search(e) {
      this.getExporter(e);
    },
    add() {
      this.dialogVisible = true;
      this.form.type = "添加";
    },
    create() {
      // 联系人和联系方式不能为空
      if (this.form.linkman && this.form.tel) {
        if (this.form.type === "添加") {
          custom.createExporter(this.form).then(() => {
            this.dialogVisible = false;
            this.getExporter();
          });
        } else {
          custom.updateExporter(this.form).then(() => {
            this.dialogVisible = false;
            this.getExporter();
          });
        }
      } else {
        this.$message({
          message: "联系人和联系电话有误",
          type: "warning"
        });
      }
    },
    // 获取出口源
    getExporter(linkman) {
      custom.getExporter(linkman).then(result => {
        this.tableData = result.data.doc;
      });
    }
  },
  mounted() {
    this.getExporter();
  }
};
</script>

<style lang="stylus" scoped></style>
