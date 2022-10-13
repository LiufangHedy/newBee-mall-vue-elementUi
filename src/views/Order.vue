<template>
  <div>
    <simple-header name="我的订单" back="/user"></simple-header>
    <div class="content">
      <el-tabs
        type="border-card"
        @tab-click="changeTab"
        class="tabs"
        v-model="status"
      >
        <el-tab-pane
          v-for="(tab, index) in tabs"
          :key="index"
          class="tab-item"
          :label="tab.title"
          :name="tab.name"
        >
          <loading v-if="loading"></loading>
          <div v-else class="order-box">
            <div
              v-for="(order, index) in orderList"
              :key="index"
              class="order-item"
              @click="goOrderDetail(order)"
            >
              <div class="order-time">
                <div class="fl-left">订单时间：{{ order.createTime }}</div>
                <div class="fl-right">{{ order.orderStatusString }}</div>
              </div>
              <div
                v-for="(product, index) in order.newBeeMallOrderItemVOS"
                :key="index"
                class="product-item cl-both"
              >
                <product-order-card :product="product"></product-order-card>
              </div>
            </div>
          </div>
          <el-pagination
            v-if="totalPage"
            layout="total, prev, pager, next"
            :total="totalOrder"
            :page-size="5"
            :current-page.sync="page"
            @current-change="changePage"
            class="pagination width-box"
          ></el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import Loading from "@/components/Loading";
import ProductOrderCard from "@/components/ProductOrderCard";
import { getOrderList } from "@/service/order";

export default {
  name: "OrderComponent",
  components: { SimpleHeader, Loading, ProductOrderCard },
  data() {
    return {
      status: "all",
      loading: false,
      page: 1,
      totalPage: 1,
      totalOrder: 1,
      pageSize: 5,
      tabs: [
        {
          title: "全部",
          name: "all",
        },
        {
          title: "待付款",
          name: "0",
        },
        {
          title: "待确认",
          name: "1",
        },
        {
          title: "待发货",
          name: "2",
        },
        {
          title: "已发货",
          name: "3",
        },
        {
          title: "交易完成",
          name: "4",
        },
      ],
      orderList: [],
    };
  },
  mounted() {
    this.init();
  },
  watch: {
    status: {
      handler(val) {
        this.init();
        console.log("status改变啦", val);
      },
    },
  },
  methods: {
    async init() {
      let status = this.status === "all" ? "" : this.status;
      const {
        data,
        data: { list },
      } = await getOrderList({ pageNumber: this.page, status: status });
      this.orderList = list;
      this.pageSize = data.pageSize;
      this.totalPage = data.totalPage;
      this.totalOrder = data.totalCount;
      console.log("get orderList: ", data);
    },
    changeTab() {},
    changePage() {
      console.log("当前页数是：", this.page);
      this.init();
    },
    goOrderDetail(order) {
      this.$router.push(`/order-detail?id=${order.orderNo}`);
      console.log(order);
    },
  },
};
</script>

<style lang="less" scoped>
.width-box {
  width: 100%;
  box-sizing: border-box;
}
.content {
  margin-top: 60px;
}
.order-box {
  padding-bottom: 30px;
}
.tabs {
}
.tab-item {
}
.order-item {
  //margin-bottom: 30px;
}
.order-item::after {
  content: "";
  height: 30px;
  display: block;
  background-color: rgb(248, 248, 248);
}
.order-time {
  font-size: 16px;
}
.pagination {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 50px;
  padding: 6px 0;
  font-size: 16px;
  text-align: center;
  background-color: #ffffff;
  z-index: 999;
}
::v-deep .el-tabs__item {
  width: 150px;
}
::v-deep .el-tabs__item.is-active {
  color: #1baeae;
}
.fl-left {
  float: left;
}
.fl-right {
  float: right;
}
.cl-both {
  clear: both;
}
</style>
