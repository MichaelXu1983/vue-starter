import request from "@/utils/request";
// 根据业务模块命名，和 /views/* 一一对应

export function fetchException(params) {
  // 模拟 Exception
  return request({
    url: `/fail/${params}`,
    method: "get"
  });
}
