<template>
  <div class="login">
    <div class="login-box">
      <h3 class="login-box__title">榕树后台系统</h3>
      <el-input
        v-model="password"
        placeholder="密码"
        type="password"
        @keyup.enter.native="singIn"
      ></el-input>
      <el-button type="primary" class="login-box__singIn" @click="singIn">
        登 入
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      password: ""
    };
  },
  methods: {
    singIn() {
      if (this.password === "123") {
        sessionStorage.setItem("token", 123);
        this.$store.commit("setLogin", true);
        this.$router.push("/");
      } else {
        this.$message({
          message: "警告哦，密码错误",
          type: "warning"
        });
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.login
  height 100vh
  width 100vw
  display flex
  justify-content center
  align-items center
  background-image url('//res.wx.qq.com/a/wx_fed/webwx/res/static/img/2zrdI1g.jpg')
  background-repeat no-repeat
  background-size 100%
  .login-box
    background-color white
    padding 50px 20px
    .login-box__title
      text-align center
    .login-box__singIn
      width 100%
      margin-top 20px
</style>
