/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
import axios from "axios";
import router from "../router";
import { Message } from "element-ui";

axios.defaults.baseURL =
  process.env.NODE_ENV == "development"
    ? "http://backend-api-01.newbee.ltd/api/v1"
    : "http://backend-api-01.newbee.ltd/api/v1";
axios.defaults.withCredentials = true;
axios.defaults.headers["X-Requested-With"] = "XMLHttpRequest";
// 每个请求头都加入token属性，以便后端验证身份
axios.defaults.headers["token"] = localStorage.getItem("token") || "";
axios.defaults.headers.post["Content-Type"] = "application/json";

axios.interceptors.response.use((res) => {
  if (typeof res.data !== "object") {
    Message({
      message: "服务端异常！",
      type: "error",
    });
    return Promise.reject(res);
  }
  if (res.data.resultCode != 200) {
    if (res.data.message)
      Message({
        message: res.data.message,
        type: "error",
      });
    if (res.data.resultCode == 416) {
      router.push({ path: "/login" });
    }
    return Promise.reject(res.data);
  }

  return res.data;
});

// 设置axios请求拦截器，实时获取token，防止用户手动清除浏览器token后axios请求头中还保留原来的token
axios.interceptors.request.use(function (config) {
  console.log("axios拦截器参数config：", config);
  config.headers.token = localStorage.getItem("token") || "";
  return config;
});
export default axios;
