import request from "@/utils/request";
export default {
  // 查询进口商信息
  getImporter: (linkman = "") =>
    request({
      url: "/customer/getImporter",
      params: { linkman }
    }),
  // 创建进口商信息
  createImporter: data =>
    request({
      url: "/customer/createImporter",
      method: "post",
      data: data
    }),
  // 修改进口商
  updateImporter: () =>
    request({
      url: ""
    }),
  // 查询出口商
  getExporter: (linkman = "") =>
    request({
      url: "/customer/getExporter",
      params: { linkman }
    }),
  // 创建出口商
  createExporter: data =>
    request({
      url: "/customer/createExporter",
      method: "post",
      data: data
    })
};
