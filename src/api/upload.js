import request from "@/utils/request";
export { aaa, aaa2 };
const aaa = data =>
  request({
    url: "/upload/aaa",
    method: "post",
    data: data
  });
const aaa2 = name =>
  request({
    url: "/upload/aaa2",
    method: "post",
    data: {
      name: name
    }
  });
