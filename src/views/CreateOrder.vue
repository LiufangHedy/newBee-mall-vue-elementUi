<template>
  <div>
    <simple-header name="生成订单"></simple-header>
    <div class="create-orders">
      <div class="selected-address" @click="goAddress">
        <div class="address-info">
          <div>
            <span>{{ address.userName }}</span>
            <span>{{ address.userPhone }}</span>
          </div>
          <div class="mr-top mr-bttm">
            <span>{{ address.provinceName }}</span>
            <span>{{ address.cityName }}</span>
            <span>{{ address.regionName }}</span>
            <span>{{ address.detailAddress }}</span>
          </div>
        </div>
        <i class="el-icon-arrow-right icon-right"></i>
      </div>
      <div class="orders mr-top">
        <div v-for="(item, index) in cartList" :key="index" class="order-item">
          <img :src="prefix(item.goodsCoverImg)" class="goods-img" />
          <div class="mr-lf pad2 width-box">
            <div>
              <span>{{ item.goodsName }}</span>
              <span class="fl-ri">x{{ item.goodsCount }}</span>
            </div>
            <div class="mr-top price">￥{{ item.sellingPrice }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="create-order-btn width-box">
      <div>
        <span class="fl-lf">商品总金额</span>
        <span class="fl-ri price">￥{{ total }}</span>
        <div class="clear-both width-box">
          <el-button
            @click="openPayTypePopup"
            class="btn width-box mr-top"
            round
            >生成订单</el-button
          >
        </div>
      </div>
    </div>
    <pay-type
      v-if="showPay"
      :show-pay="showPay"
      @closeBlank="closePopup"
      @close="closePayType"
      @payType="payType"
    ></pay-type>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import PayType from "@/components/PayType";
import { getLocal, setLocal } from "@/common/js/utils";
import { getAddressDetail, getDefaultAddress } from "@/service/address";
import { getByCartItemIds } from "@/service/cart";
import { createOrder, payOrder } from "@/service/order";
export default {
  name: "CreateOrder",
  components: {
    SimpleHeader,
    PayType,
  },
  data() {
    return {
      cartList: [],
      address: {},
      showPay: false,
      orderNum: "",
    };
  },
  computed: {
    total() {
      let sum = 0;
      this.cartList.forEach((item) => {
        sum += item.sellingPrice * item.goodsCount;
      });
      return sum;
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      // 通过路由的query选项来传递选择使用的地址ID和购物车ID
      const { cartItemIds, addressId } = this.$route.query;
      let _cartItemIds = cartItemIds
        ? JSON.parse(cartItemIds)
        : JSON.parse(getLocal("cartItemIds"));
      // 用localStorage存储即将支付的购物车订单信息
      setLocal("cartItemIds", JSON.stringify(_cartItemIds));
      const { data: list } = await getByCartItemIds({
        cartItemIds: _cartItemIds.join(","),
      });
      const { data: address } = addressId
        ? await getAddressDetail(addressId)
        : await getDefaultAddress();
      if (!address) {
        this.$router.push("address");
        return;
      }
      this.address = address;
      this.cartList = list;
      console.log("cartList", this.cartList);
    },
    goAddress() {
      this.$router.push("/address");
    },
    openPayTypePopup() {
      this.showPay = true;
    },
    async createOrder() {
      console.log("生成订单");
      const params = {
        addressId: this.address.addressId,
        cartItemIds: this.cartList.map((item) => item.cartItemId),
      };
      const { data } = await createOrder(params);
      setLocal("cartItemIds", "");
      console.log("order numbers: ", data);
      this.orderNum = data;
    },
    closePopup() {
      console.log("关掉啦");
      this.showPay = false;
    },
    async closePayType() {
      this.closePopup();
      await this.createOrder();
      console.log("hidePayType");
      this.$router.replace("/order");
    },
    async payType(type) {
      this.closePopup();
      await this.createOrder();
      // Promise的链式调用
      // createOrder()
      //   .then((res) => {
      //     let { data } = res;
      //     console.log(data);
      //     return payOrder({ id: "hhh" });
      //   })
      //   .then((res) => {
      //     console.log(res);
      //   });
      console.log("pay type is", type);
      await payOrder({
        orderNo: this.orderNum,
        payType: type,
      });
      this.$router.replace("/order");
    },
  },
};
</script>

<style lang="less" scoped>
.width-box {
  width: 100%;
  box-sizing: border-box;
}
.create-orders {
  margin: 60px 0 150px;
  background-color: rgb(248, 248, 248);
}
.selected-address {
  position: relative;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  background-color: #fff;
}
.selected-address::before {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    -45deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  background: -webkit-repeating-linear-gradient(
    135deg,
    #ff6c6c 0,
    #ff6c6c 20%,
    transparent 0,
    transparent 25%,
    #1989fa 0,
    #1989fa 45%,
    transparent 0,
    transparent 50%
  );
  content: "";
  background-size: 80px;
}
.icon-right {
  font-size: 30px;
}
span + span {
  margin-left: 8px;
}
.mr-top {
  margin-top: 15px;
}
.mr-bttm {
  margin-bottom: 15px;
}
.mr-lf {
  margin-left: 20px;
}
.mr-lf3 {
  margin-left: 30px;
}
.pad2 {
  padding: 20px;
}
.fl-ri {
  float: right;
}
.fl-lf {
  float: left;
}
.price {
  color: red;
  font-size: 18px;
}
.order-item {
  display: flex;
  padding: 10px;
  background-color: #ffffff;
}
.goods-img {
  width: 100px;
  height: 100px;
}
.create-order-btn {
  position: fixed;
  bottom: 0;
  left: 0;
  height: 120px;
  background-color: #ffffff;
  padding: 20px 30px;
  border-top: 1px solid rgb(215, 215, 215);
  font-size: 20px;
}
.clear-both {
  clear: both;
}
.btn {
  background-color: #1baeae;
  font-size: 20px;
  color: #ffffff;
}
.pay-type {
  height: 200px;
  background-color: pink;
  z-index: 99999;
}
</style>
