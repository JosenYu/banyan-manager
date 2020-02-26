<template>
  <!-- 创建入库 -->
  <div class="create">
    <el-form class="el-form-purchase" ref="form" :model="form" :rules="rules">
      <!-- 文字内容 -->
      <el-form-item label="商品名称">
        <el-autocomplete
          v-model="form.name"
          :fetch-suggestions="querySearch"
          placeholder="请输入商品名称"
          @select="handleSelectName"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="商品模型:">
        <span> {{ form.model }} </span>
      </el-form-item>
      <el-form-item label="商品品牌:">
        <span> {{ form.brand }}</span>
      </el-form-item>
      <el-form-item label="商品数量（只）:">
        <el-input-number
          v-model="form.number"
          @change="handleChangeNumber"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品进价（只/元）:">
        <el-input-number
          v-model="form.price"
          @change="handleChangeNumber"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="商品总进价（元）:">
        <el-input-number disabled v-model="form.totalPrice"></el-input-number>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import stock from "@/api/stock";
export default {
  data() {
    return {
      rules: {
        name: { required: true, message: "请输入商品名称" },
        // model: { required: true, message: "请输入商品型号" },
        // brand: { required: true, message: "请输入商品品牌" },
        number: { type: "number", message: "请输入数字" },
        price: { type: "number", message: "请输入数字" },
        totalPrice: { type: "number", message: "请输入数字" }
      },
      title: {
        name: "商品名称",
        model: "型号/规格",
        brand: "品牌",
        number: "数量",
        price: "单价/元",
        totalPrice: "总价/元"
      },
      // 提交的表单数据
      form: {
        name: "",
        model: "/",
        brand: "/",
        number: 1,
        price: 1,
        totalPrice: 1
      }
    };
  },
  methods: {
    handleSelectName(v) {
      this.form.name = v.name;
      this.form.model = v.model;
      this.form.brand = v.brand;
    },
    querySearch(queryString, cb) {
      stock.getModel({ name: queryString }).then(result => {
        // console.log(result.data.doc);
        cb(
          result.data.doc.map(v => {
            return {
              value: v.name,
              name: v.name,
              model: v.model,
              brand: v.brand
            };
          })
        );
      });
    },
    // 改变 price or number 时触发重新计算
    handleChangeNumber() {
      this.form.totalPrice = this.form.price * this.form.number;
    },
    // 提交创建表单
    submitForm() {
      if (!(this.form.name && this.form.model && this.form.brand)) return;
      stock.purchase(this.form).then(() => {
        this.$message.success("创建成功");
        this.form = {
          name: "",
          model: "/",
          brand: "/",
          number: 1,
          price: 1,
          totalPrice: 1
        };
      });
    },
    // reset
    resetForm() {
      for (const key in this.form) {
        if (this.form.hasOwnProperty(key)) {
          switch (key) {
            case "number":
            case "price":
            case "totalPrice":
              this.form[key] = 0;
              break;
            default:
              this.form[key] = "";
              break;
          }
        }
      }
    }
  },
  computed: {},
  watch: {}
};
</script>

<style lang="stylus" scoped>
.create
  padding 20px
  .el-form-purchase
    width 50%
</style>
