/**
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 */
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    meta: {
      index: 1,
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/category",
    name: "category",
    meta: {
      index: 1,
    },
    component: () => import(/*webpackChunkName: "home"*/ "../views/Category"),
  },
  {
    path: "/product-list",
    name: "product-list",
    meta: {
      index: 2,
    },
    component: () =>
      import(/*webpackChunkName: "home"*/ "../views/ProductList"),
  },
  {
    path: "/login",
    name: "login",
    meta: {
      index: 2,
    },
    component: () => import(/*webpackChunkName: "home"*/ "../views/Login"),
  },
  {
    path: "/user",
    name: "user",
    meta: {
      index: 1,
    },
    component: () => import(/*webpackChunkName: "user"*/ "../views/User"),
  },
  {
    path: "/cart",
    name: "cart",
    meta: {
      index: 1,
    },
    component: () => import(/*webpackChunkName: "home"*/ "../views/Cart"),
  },
  {
    path: "/product/:productId",
    name: "product",
    meta: {
      index: 2,
    },
    component: () =>
      import(/*webpackChunkName: "product"*/ "../views/ProductDetail"),
  },
  {
    path: "/address",
    name: "address",
    meta: {
      index: 2,
    },
    component: () => import(/*webpackChunkName: "user"*/ "../views/Address"),
  },
  {
    path: "/address-edit",
    name: "address-edit",
    meta: {
      index: 3,
    },
    component: () =>
      import(/*webpackChunkName: "user"*/ "../views/AddressEdit"),
  },
  {
    path: "/create-order",
    name: "create-order",
    meta: {
      index: 3,
    },
    component: () =>
      import(/*webpackChunkName: "order"*/ "../views/CreateOrder"),
  },
  {
    path: "/order",
    name: "order",
    meta: {
      index: 3,
    },
    component: () => import(/*webpackChunkName: "order"*/ "../views/Order"),
  },
  {
    path: "/order-detail",
    name: "order-detail",
    meta: {
      index: 3,
    },
    component: () =>
      import(/*webpackChunkName: "order"*/ "../views/OrderDetail"),
  },
  {
    path: "/setting",
    name: "setting",
    meta: {
      index: 2,
    },
    component: () => import(/*webpackChunkName: "order"*/ "../views/Setting"),
  },
  {
    path: "/about",
    name: "about",
    meta: {
      index: 2,
    },
    component: () => import(/*webpackChunkName: "order"*/ "../views/About"),
  },
];
const router = new VueRouter({
  // mode: "hash",
  // mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
