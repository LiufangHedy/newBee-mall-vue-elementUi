<template>
  <div>
    <simple-header name="关于我们"></simple-header>
    <div class="content-box mar-top">
      <h1>简介</h1>
      <h3 style="color: #1baeae">
        该项目完全按照
        <a href="https://github.com/newbee-ltd/newbee-mall-vue-app"
          >https://github.com/newbee-ltd/newbee-mall-vue-app项目</a
        >，利用ElementUI代替vant仿写的，
        接口数据方面的代码几乎完全一致，对雷同代码也保留了原项目的开头注释。
      </h3>
      <div class="introduce">
        newbee-mall 项目是一套电商系统，包括 newbee-mall 商城系统及
        newbee-mall-admin 商城后台管理系统， 基于 Spring Boot 2.X
        及相关技术栈开发。 前台商城系统包含首页门户、商品分类、新品上线、
        首页轮播、商品推荐、商品搜索、商品展示、购物车、订单结算、订单流程、个人订单管理、会员中心、
        帮助中心等模块。
        后台管理系统包含数据面板、轮播图管理、商品管理、订单管理、会员管理、分类管理、设置等模块。
      </div>
      <h1>开源地址</h1>
      <div class="introduce">
        <div>
          掘金小册配套学习文档：<a
            target="_blank"
            href="https://juejin.im/book/6844733826191589390"
            >《Vue 商城项目开发实战》</a
          >
        </div>
        <br />
        <div>
          后端 API 地址：<a
            target="_blank"
            href="https://github.com/newbee-ltd/newbee-mall-api"
            >https://github.com/newbee-ltd/newbee-mall-api</a
          >
        </div>
        <br />
        <div>
          前端 Vue 开源地址：<a
            target="_blank"
            href="https://github.com/newbee-ltd/newbee-mall-vue-app"
            >https://github.com/newbee-ltd/newbee-mall-vue-app</a
          >
        </div>
        <br />
        <div>
          线上预览地址：<a target="_blank" href="http://47.99.134.126:5000/"
            >http://vue-app.newbee.ltd</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
export default {
  name: "AboutComponent",
  components: { SimpleHeader },
};
</script>

<style lang="less" scoped>
.mar-top {
  margin-top: 60px;
}
.content-box {
  padding: 20px;
}
.introduce {
  padding: 10px 0;
  border-top: 1px solid #1baeae;
}
</style>
