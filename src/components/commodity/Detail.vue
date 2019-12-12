<template>
  <!-- 详情 -->
  <div class="detail">
    <div class="detail__line-box">
      <el-switch
        v-model="disabled"
        active-text="不可编辑"
        inactive-text="可编辑"
      ></el-switch>
    </div>
    <el-form class="el-form" ref="form" :model="form" :rules="rules">
      <!-- 输入信息 -->
      <el-form-item
        class="el-form-item"
        v-for="(item, key, index) in formTitle1"
        :key="index"
        :label="item + ':'"
        :prop="key"
      >
        <el-input
          :disabled="key === '_id' || disabled"
          :placeholder="'请输入' + item"
          clearable
          class="el-input"
          v-model="form[key]"
        ></el-input>
      </el-form-item>
      <!-- 输入数量  -->
      <el-form-item
        class="el-form-item"
        v-for="(item, key, index) in formTitle2"
        :key="'i:' + index"
        :label="item + ':'"
        :prop="key"
      >
        <el-input
          :disabled="disabled"
          type="number"
          :placeholder="'请输入' + item"
          clearable
          class="el-input"
          v-model.number="form[key]"
        ></el-input>
      </el-form-item>
      <!-- 备注信息 -->
      <el-form-item label="备注信息" prop="textarea">
        <el-input
          :disabled="disabled"
          type="textarea"
          placeholder="请输入备注信息"
          v-model="form.remarks"
          show-word-limit
        ></el-input>
      </el-form-item>
      <!-- 创建时间 -->
      <el-form-item label="创建时间">
        <el-date-picker
          disabled
          v-model="form.createdAt"
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <!-- 更新时间 -->
      <el-form-item label="更新时间">
        <el-date-picker
          v-model="form.updatedAt"
          disabled
          type="date"
          placeholder="选择日期"
        ></el-date-picker>
      </el-form-item>
      <!-- 修改 -->
      <!-- <el-form-item>
        <el-button type="primary" @click="submitForm">立即修改</el-button>
        <el-button @click="$router.go(-1)">取消</el-button>
      </el-form-item> -->
    </el-form>
  </div>
</template>

<script>
import { updateCommodity } from "@/api/commodity";
export default {
  data() {
    return {
      disabled: true,
      title: {
        _id: "编号",
        __v: "版本号",
        name: "名称",
        model: "型号/规格",
        brand: "品牌",
        number: "数量",
        unit: "单位/只",
        price: "单价/元",
        totalPrice: "总价格/元",
        MSRP: "建议零售价",
        TMSRP: "建议零售价总合",
        source: "来源",
        remarks: "备注",
        updatedAt: "更新时间",
        createdAt: "创建时间"
      },
      rules: {
        name: { required: true, message: "请输入商品名称" },
        model: { required: true, message: "请输入商品型号" },
        brand: { required: true, message: "请输入商品品牌" },
        number: { type: "number", message: "请输入数字" },
        price: { type: "number", message: "请输入数字" },
        totalPrice: { type: "number", message: "请输入数字" },
        retail: { type: "number", message: "请输入数字" }
      },
      form: {}
    };
  },
  methods: {
    submitForm() {
      if (this.disabled) {
        this.$message.warning("不可编辑状态");
      } else {
        updateCommodity(this.form).then(reslut => {
          if (reslut.status === 200) {
            this.$router.go(-1);
            this.$message.success("保存成功，已经修改数据");
          } else {
            this.$message.error("出错了错了哦");
          }
        });
      }
    }
  },
  computed: {
    formTitle1() {
      let list = JSON.parse(JSON.stringify(this.title));
      for (const key in list) {
        if (list.hasOwnProperty(key)) {
          switch (key) {
            case "_id":
            case "__v":
            case "name":
            case "model":
            case "brand":
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
            case "_id":
            case "__v":
            case "name":
            case "brand":
            case "model":
            case "source":
            case "unit":
            case "createdAt":
            case "updatedAt":
            case "remarks":
              delete list[key];
              break;

            default:
              break;
          }
        }
      }
      return list;
    }
  },
  mounted() {
    if ("name" in this.$route.params) {
      this.form = this.$route.params;
    } else {
      this.$router.push("/commodity/quantity");
    }
  }
};
</script>
<style lang="stylus" scoped>
.detail
  .el-form
    width 50%
</style>
