<template>
  <div style="background-color: rgb(246, 246, 246)">
    <simple-header name="订单详情"></simple-header>
    <div class="order-detail-container">
      <div class="order-operation bg-color">
        <div>
          <span class="label-color">订单状态：</span
          ><span>{{ order.orderStatusString }}</span>
        </div>
        <div>
          <span class="label-color">订单编号：</span
          ><span>{{ order.orderNo }}</span>
        </div>
        <div>
          <span class="label-color">下单时间：</span
          ><span>{{ order.createTime }}</span>
        </div>
        <el-button
          v-if="order.orderStatus === 0"
          class="next-step-btn width-box mar-tp btn"
          @click="openPayTypePopup"
          >去支付</el-button
        >
        <el-button
          v-if="order.orderStatus === 1"
          class="next-step-btn width-box mar-tp btn"
          style="margin-left: 0"
          @click="openConfirmReceiptPopup"
          >确认收货</el-button
        >
        <el-button
          v-if="[0, 1].includes(order.orderStatus)"
          class="cancel-btn width-box mar-tp btn"
          style="margin-left: 0"
          @click="openCancelOrderPopup"
          >取消订单</el-button
        >
      </div>
      <div class="order-operation mar-tp bg-color">
        <div>
          <span class="label-color">商品金额：</span
          ><span>{{ order.totalPrice }}</span>
        </div>
        <div>
          <span class="label-color">配送方式：</span> <span>普通快递</span>
        </div>
      </div>
      <div class="order-operation bg-color mar-tp">
        <product-order-card
          v-for="(product, index) in order.newBeeMallOrderItemVOS"
          :product="product"
          :key="index"
        ></product-order-card>
      </div>
      <pay-type
        v-if="showPay"
        @close="closePayType"
        @payType="goPay"
        @closeBlank="closePayType"
      ></pay-type>
      <confirm-dialog
        v-if="showConfirmReceipt"
        @cancelPopup="closeConfirmReceiptPopup"
        @confirmPopup="confirmReceipt"
      >
        <div>是否确认收货</div>
      </confirm-dialog>
      <confirm-dialog
        v-if="showCancel"
        @cancelPopup="closeCancelOrderPopup"
        @confirmPopup="cancelOrder"
      >
        <div>确认取消订单?</div>
      </confirm-dialog>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import ProductOrderCard from "@/components/ProductOrderCard";
import ConfirmDialog from "@/components/ConfirmDialog";
import PayType from "@/components/PayType";
import {
  getOrderDetail,
  payOrder,
  confirmOrder,
  cancelOrder,
} from "@/service/order";

export default {
  name: "OrderDetail",
  components: { SimpleHeader, ProductOrderCard, ConfirmDialog, PayType },
  data() {
    return {
      order: {},
      orderNo: "",
      showPay: false,
      showCancel: false,
      showConfirmReceipt: false,
    };
  },
  mounted() {
    this.orderNo = this.$route.query.id;
    this.getOrderInfo();
  },
  methods: {
    async getOrderInfo() {
      const { data } = await getOrderDetail(this.orderNo);
      this.order = data;
      console.log("order detail: ", this.order);
    },
    closePayType() {
      this.showPay = false;
    },
    openPayTypePopup() {
      this.showPay = true;
    },
    openConfirmReceiptPopup() {
      this.showConfirmReceipt = true;
    },
    closeConfirmReceiptPopup() {
      this.showConfirmReceipt = false;
    },
    openCancelOrderPopup() {
      this.showCancel = true;
    },
    closeCancelOrderPopup() {
      this.showCancel = false;
    },
    async goPay(type) {
      console.log("goPay right now");
      await payOrder({ orderNo: this.orderNo, payType: type });
      this.closePayType();
      await this.getOrderInfo();
    },
    confirmReceipt() {
      confirmOrder(this.orderNo).then(() => {
        this.$message({
          message: "确认收货成功",
          type: "success",
        });
        this.closeConfirmReceiptPopup();
        this.getOrderInfo();
      });
    },
    cancelOrder() {
      cancelOrder(this.orderNo).then(() => {
        this.$message({
          message: "取消订单成功",
          type: "success",
        });
        this.closeCancelOrderPopup();
        this.getOrderInfo();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.width-box {
  width: 100%;
  box-sizing: border-box;
}
.order-detail-container {
  margin-top: 50px;
}
.order-operation {
  padding: 20px;
  font-size: 20px;
}
.btn {
  font-size: 20px;
  padding: 15px 0;
}
.next-step-btn {
  background-color: #1baeae;
  color: #ffffff;
}
.mar-tp {
  margin-top: 20px;
}
.bg-color {
  background-color: #ffffff;
}
.label-color {
  color: rgb(142, 142, 142);
}
</style>
