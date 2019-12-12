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
          :disabled="key === 'TMSRP' || key === 'totalPrice'"
          type="number"
          :placeholder="'请输入' + item"
          class="el-input"
          v-model.number="form[key]"
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
        MSRP: { type: "number", message: "请输入数字" },
        TMSRP: { type: "number", message: "请输入数字" }
      },
      title: {
        name: "商品名称",
        model: "型号/规格",
        brand: "品牌",
        unit: "单位/只",
        number: "数量",
        price: "单价/元",
        totalPrice: "总价/元",
        MSRP: "建议零售/元",
        remarks: "备注",
        from: "来源"
      },
      // 提交的表单数据
      form: {
        name: "",
        model: "",
        brand: "",
        unit: "只",
        number: 0,
        price: 0,
        totalPrice: 0,
        MSRP: 0,
        remarks: "",
        from: ""
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
            case "MSRP":
            case "TMSRP":
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
            case "model":
            case "brand":
            case "unit":
            case "remarks":
            case "from":
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
            case "from":
            case "unit":
            case "remarks":
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
    },
    MSRP() {
      return this.form.MSRP;
    }
  },
  watch: {
    number() {
      this.form.totalPrice = this.form.number * this.form.price;
      this.form.TMSRP = this.form.number * this.form.MSRP;
    },
    price() {
      this.form.totalPrice = this.form.number * this.form.price;
    },
    MSRP() {
      this.form.TMSRP = this.form.number * this.form.MSRP;
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
