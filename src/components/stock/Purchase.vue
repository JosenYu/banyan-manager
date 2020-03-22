<template>
  <!-- 创建入库 -->
  <div class="create">
    <el-form class="el-form-purchase" ref="form" :model="form" :rules="rules">
      <!-- 进口商 -->
      <el-form-item label="进货源：">
        <el-autocomplete
          class="create__import__input"
          v-model="importer.linkman"
          :fetch-suggestions="queryImporter"
          placeholder="请输入内容"
          @select="selectImporter"
        >
          <template #default="{item}">
            <div class="name">联系人：{{ item.linkman }}</div>
            <div class="tel">联系方式：{{ item.tel }}</div>
          </template>
        </el-autocomplete>
        <!-- <p>{{ importer }}</p> -->
      </el-form-item>
      <!-- 商品采购内容 -->
      <el-form-item label="商品名称：">
        <el-autocomplete
          v-model="form.name"
          :fetch-suggestions="querySearch"
          placeholder="请输入商品名称"
          @select="handleSelectName"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="商品模型：">
        <span> {{ form.model }} </span>
      </el-form-item>
      <el-form-item label="商品品牌：">
        <span> {{ form.brand }}</span>
      </el-form-item>
      <el-form-item label="商品数量（只）:">
        <el-input-number
          v-model="form.totalNumber"
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
import custom from "@/api/custom";
export default {
  data() {
    return {
      importer: {
        _id: "",
        linkman: "",
        tel: ""
      },
      rules: {
        name: { required: true, message: "请输入商品名称" },
        number: { type: "number", message: "请输入数字" },
        price: { type: "number", message: "请输入数字" },
        totalPrice: { type: "number", message: "请输入数字" }
      },
      // 提交的表单数据
      form: {
        name: "",
        model: "/",
        brand: "/",
        surplusNumber: 1,
        totalNumber: 1,
        price: 1,
        totalPrice: 1,
        importer_id: ""
      }
    };
  },
  methods: {
    // 查询进口商
    queryImporter(e, cb) {
      custom.getImporter(e).then(result => {
        cb(
          result.data.doc.map(v => {
            return {
              value: v.linkman,
              linkman: v.linkman,
              tel: v.tel,
              _id: v._id
            };
          })
        );
      });
    },
    // 选装进口商
    selectImporter(e) {
      this.importer = e;
      this.form.importer_id = this.importer._id;
    },
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
              brand: v.brandecharts
            };
          })
        );
      });
    },
    // 改变 price or number 时触发重新计算
    handleChangeNumber() {
      this.form.totalPrice = this.form.price * this.form.totalNumber;
    },
    // 提交创建表单
    submitForm() {
      if (!(this.form.importer_id && this.form.name)) {
        this.$message({
          message: "输入内容有误！！！",
          type: "warning"
        });
      } else {
        this.form.surplusNumber = this.form.totalNumber;
        stock.purchase(this.form).then(() => {
          this.$message.success("创建成功");
          this.form = {
            name: "",
            model: "/",
            brand: "/",
            surplusNumber: 1,
            totalNumber: 1,
            price: 1,
            totalPrice: 1,
            importer_id: ""
          };
        });
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
    .create__import__input
      .tel
        font-size 12px
        color gray
</style>
