<template>
  <div class="product-container width-box">
    <img :src="prefix(product.goodsCoverImg)" class="img" />
    <div style="flex: 1">
      <div>{{ product.goodsName }}</div>
      <div style="color: rgb(89, 90, 91)">全场包邮</div>
      <div class="price-box">
        <span class="fl-le">￥{{ product.sellingPrice }}</span>
        <span class="fl-ri product-count">x{{ product.goodsCount }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductOrderCard",
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="less" scoped>
.width-box {
  width: 100%;
  box-sizing: border-box;
}
.product-container {
  padding: 10px 20px;
  display: flex;
  align-items: center;
  font-size: 18px;
  color: rgb(44, 44, 45);
}
.img {
  width: 100px;
  height: 100px;
  margin-right: 30px;
}
.price-box::after {
  content: "";
  display: block;
  clear: both;
}
.product-count {
  font-size: 14px;
  color: rgb(139, 140, 143);
}
.fl-le {
  float: left;
}
.fl-ri {
  float: right;
}
</style>
