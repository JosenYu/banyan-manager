import request from "@/utils/request";
export default {
  // 查询进口商信息
  getImporter: (linkman = "") =>
    request({
      url: "/custom/getImporter",
      params: { linkman }
    }),
  // 创建进口商信息
  createImporter: data =>
    request({
      url: "/custom/createImporter",
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
      url: "/custom/getExporter",
      params: { linkman }
    }),
  // 创建出口商
  createExporter: data =>
    request({
      url: "/custom/createExporter",
      method: "post",
      data: data
    }),
  // 修改出口商
  updateExporter: () =>
    request({
      url: ""
    })
};
