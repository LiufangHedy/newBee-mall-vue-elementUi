import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import md5 from "js-md5";
import "lib-flexible/flexible";
// 移动端适配？？？

import {
  Button,
  Badge,
  Carousel,
  CarouselItem,
  Tabs,
  TabPane,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Form,
  FormItem,
  Checkbox,
  CheckboxGroup,
  InputNumber,
  Switch,
  Cascader,
  Popconfirm,
  Popover,
  Pagination,
  Message,
} from "element-ui";
import { prefix } from "@/common/js/utils";
Vue.config.productionTip = false;

Vue.use(Button);
Vue.use(Badge);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(Cascader);
Vue.use(Popconfirm);
Vue.use(Popover);
Vue.use(Pagination);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

Vue.prototype.prefix = prefix;
Vue.prototype.$message = Message;
Vue.prototype.$md5 = md5;
// 注册serviceworker，处理兼容性问题
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(() => {
        console.log("serviceWorker注册成功了");
      })
      .catch(() => {
        console.log("serviceWorker注册失败了");
      });
  });
}
