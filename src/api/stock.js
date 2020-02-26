import request from "@/utils/request";

export default {
  // 根据条件获取所有商品
  queryCondition: ({ name = "", model = "", brand = "", currentPage = 1 }) => {
    return request({
      url: "/stock/queryCondition",
      params: {
        name,
        model,
        brand,
        currentPage
      }
    });
  },
  // 创建模型规格
  createModel: ({ name = "", model = "", brand = "" }) =>
    request({
      url: "/stock/createModel",
      method: "post",
      data: {
        name,
        model,
        brand
      }
    }),
  // 更新模型
  updateModel: ({ id = "", name = "", model = "", brand = "" }) =>
    request({
      url: "/stock/updateModel",
      method: "post",
      data: { id, name, model, brand }
    }),
  // 查询商品模型
  getModel: ({ name = "", model = "", brand = "" }) =>
    request({
      url: "/stock/getModel",
      params: { name, model, brand }
    }),
  // 库存采购
  purchase: ({
    name = "",
    model = "",
    brand = "",
    curNumber = 0,
    totalNumber = 0,
    price = 0,
    totaPrice = 0
  }) =>
    request({
      url: "/stock/purchase",
      method: "post",
      data: { name, model, brand, curNumber, totalNumber, price, totaPrice }
    }),
  // 出售
  sell: ({
    stock_id = "",
    sellnumber = "",
    surplusNumber = "",
    reatil = "",
    totalRetal = ""
  }) =>
    request({
      url: "/stock/sell",
      method: "post",
      data: { stock_id, sellnumber, surplusNumber, reatil, totalRetal }
    }),
  getSell: stock_id =>
    request({
      url: "/stock/getSell",
      params: { stock_id }
    })
};
