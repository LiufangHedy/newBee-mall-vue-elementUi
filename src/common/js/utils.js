/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */

export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  } else {
    return null;
  }
}

export const getLocal = (name) => {
  return localStorage.getItem(name);
};

export const setLocal = (name, value) => {
  localStorage.setItem(name, value);
};
// 图片前缀方法
export const prefix = (url) => {
  if (url && url.startsWith("http")) {
    return url;
  } else {
    url = `http://backend-api-01.newbee.ltd${url}`;
    return url;
  }
};

export function NewbeeCityNameToElementArea(provinceName, cityName) {
  let names = [];
  if (
    provinceName === "北京" ||
    provinceName === "天津" ||
    provinceName === "上海" ||
    provinceName === "重庆"
  ) {
    names.push(provinceName + "市");
    names.push("市辖区");
  } else {
    names.push(provinceName);
    names.push(cityName);
  }
  return names;
}
export function ElementAreaCityNameToNewbee(provinceName, cityName) {
  let names = [];
  if (
    provinceName === "北京市" ||
    provinceName === "天津市" ||
    provinceName === "上海市" ||
    provinceName === "重庆市"
  ) {
    names.push(provinceName.substr(0, 2));
    names.push(provinceName);
  } else {
    names.push(provinceName);
    names.push(cityName);
  }
  return names;
}
