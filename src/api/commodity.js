import request from "@/utils/request";
export { getCommodity, createCommodity, updateCommodity, aaa, aaa2 };
//
function getCommodity(
  name = "",
  model = "",
  brand = "",
  pageCurrent = 1,
  pageSize = 10
) {
  return request({
    url: "/getCommodity",
    params: {
      name,
      model,
      brand,
      pageSize,
      pageCurrent
    }
  });
}

function createCommodity(params) {
  return request({
    url: "/createCommodity",
    method: "post",
    data: params
  });
}

function updateCommodity(params) {
  return request({
    url: "/updateCommodity",
    method: "post",
    data: params
  });
}
const aaa = data =>
  request({
    url: "/aaa",
    method: "post",
    data: data
  });
const aaa2 = name =>
  request({
    url: "/aaa2",
    method: "PUT",
    data: {
      name: name
    }
  });
