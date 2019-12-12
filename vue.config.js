module.exports = {
  devServer: {
    // proxy: {
    //   "/": {
    //     target: "http://10.0.0.32：3000", //对应自己的接口
    //     changeOrigin: true,
    //     ws: true
    //   }
    // }
    proxy: "http://10.0.0.32:3000" //对应自己的接口
  }
};
