<template>
  <!-- 创建商品 -->
  <div class="create">
    <el-form class="el-form" ref="form" :model="form" :rules="rules">
      <!-- 文字内容 -->
      <el-form-item
        class="el-form-item"
        v-for="(item, key, index) in formTitle1"
        :key="index"
        :label="item + ':'"
        :prop="key"
      >
        <el-input
          :placeholder="'请输入' + item"
          clearable
          class="el-input"
          v-model="form[key]"
        ></el-input>
      </el-form-item>
      <!-- 数字内容 -->
      <el-form-item
        class="el-form-item"
        v-for="(item, key, index) in formTitle2"
        :key="'i:' + index"
        :label="item + ':'"
        :prop="key"
      >
        <el-input
          type="number"
          :placeholder="'请输入' + item"
          clearable
          class="el-input"
          v-model.number="form[key]"
        ></el-input>
      </el-form-item>
      <el-form-item label="总价格">
        <el-input type="number" v-model="form.totalPrice" disabled></el-input>
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input
          type="textarea"
          placeholder="请输入备注信息"
          v-model="form.remarks"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">立即创建</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createCommodity } from "@/api/commodity";
export default {
  data() {
    return {
      rules: {
        name: { required: true, message: "请输入商品名称" },
        model: { required: true, message: "请输入商品型号" },
        brand: { required: true, message: "请输入商品品牌" },
        number: { type: "number", message: "请输入数字" },
        price: { type: "number", message: "请输入数字" },
        totalPrice: { type: "number", message: "请输入数字" },
        retail: { type: "number", message: "请输入数字" }
      },
      title: {
        name: "商品名称",
        model: "型号/规格",
        brand: "品牌",
        source: "来源",
        unit: "单位/个",
        number: "数量",
        price: "单价/元",
        totalPrice: "总价/元",
        retail: "零售/元"
        // remarks: "备注"
      },
      form: {
        name: "",
        model: "",
        brand: "",
        unit: "",
        source: "",
        number: 0,
        price: 0,
        totalPrice: 0,
        retail: 0,
        remarks: ""
      }
    };
  },
  methods: {
    // 提交创建表单
    submitForm() {
      const object = this.form;
      if (!(object.name && object.model && object.brand)) return;
      createCommodity(this.form).then(result => {
        if (result.status === 200) {
          this.$message.success("创建成功");
          this.$router.push("/commodity/quantity");
        } else {
          this.$message.error("网络出错了哦");
        }
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
            case "retail":
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
  computed: {
    formTitle1() {
      let list = JSON.parse(JSON.stringify(this.title));
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          switch (key) {
            case "name":
            case "brand":
            case "model":
            case "source":
            case "unit":
              break;
            default:
              delete list[key];
              break;
          }
        }
      }
      return list;
    },
    formTitle2() {
      let list = JSON.parse(JSON.stringify(this.title));
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          switch (key) {
            case "name":
            case "brand":
            case "model":
            case "source":
            case "unit":
            case "totalPrice":
              delete list[key];
              break;
            default:
              break;
          }
        }
      }
      return list;
    },
    number() {
      return this.form.number;
    },
    price() {
      return this.form.price;
    }
  },
  watch: {
    number() {
      this.form.totalPrice = this.form.number * this.form.price;
    },
    price() {
      this.form.totalPrice = this.form.number * this.form.price;
    }
  }
};
</script>

<style lang="stylus" scoped>
.create
  padding 20px
  .el-form
    width 50%
</style>
