<template>
  <div class="pay-type-container" ref="page">
    <div class="pay-type-box width-box" ref="main">
      <div class="close">
        <i class="el-icon-close close-icon" @click="closePopup"></i>
      </div>
      <div class="btn-box">
        <div class="pay-type alipay clr-ri" @click="payType(1)">支付宝支付</div>
        <div class="pay-type wechat-pay" @click="payType(2)">微信支付</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PayType",
  data() {
    return {};
  },
  created() {
    console.log("监听点击空白处关闭弹框");
    document.addEventListener("click", this.bodyClose);
  },
  destroyed() {
    document.removeEventListener("click", this.bodyClose);
  },
  methods: {
    bodyClose(e) {
      console.log("eeeeeeeevent", e.target);
      if (
        this.$refs.main &&
        this.$refs.page.contains(e.target) &&
        !this.$refs.main.contains(e.target)
      ) {
        this.$emit("closeBlank");
      }
    },
    closePopup() {
      this.$emit("close");
    },
    payType(type) {
      this.$emit("payType", type);
    },
  },
};
</script>

<style lang="less" scoped>
.width-box {
  width: 100%;
  box-sizing: border-box;
}
.pay-type-container {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}
.pay-type-box {
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #ffffff;
  //height: 30%;
}
.close {
  padding: 10px;
}
.btn-box {
  padding: 15px 30px;
}
.close-icon {
  float: right;
  font-size: 30px;
}
.pay-type {
  margin-top: 30px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-size: 20px;
  color: #ffffff;
}
.clr-ri {
  clear: right;
}
.alipay {
  background-color: rgb(65, 116, 250);
}
.wechat-pay {
  background-color: rgb(80, 190, 128);
}
</style>
