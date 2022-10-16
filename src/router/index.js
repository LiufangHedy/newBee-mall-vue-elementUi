import Vue from "vue";
import { Message } from "element-ui";
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
// 添加导航守卫，如果此时用户未登录，且没有没有跳到登录页面，则应该自动跳到登录页面进行登录
router.beforeEach((to, from, next) => {
  if (!localStorage.getItem("token") && to.name !== "login") {
    Message({
      message: "请登录",
      type: "warning",
    });
    return next({
      path: "/login",
    });
  }
  next();
});
export default router;
