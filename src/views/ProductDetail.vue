<template>
  <div>
    <simple-header name="商品详情"></simple-header>
    <div class="product-detail">
      <img :src="prefix(product.goodsCoverImg)" class="product-img" />
      <div class="product-name">{{ product.goodsName }}</div>
      <div class="delivery">免邮费&nbsp;顺丰快递</div>
      <div class="price">￥{{ product.sellingPrice }}</div>
      <div class="anchor-list" id="anchors">
        <div
          v-for="(item, index) in anchorList"
          :key="index"
          class="anchor"
          :class="{ active: active === index }"
          @click="goTo(index)"
        >
          {{ item }}
        </div>
      </div>
      <div v-html="product.goodsDetailContent" class="custom-content"></div>
    </div>
    <div class="bottom">
      <div class="icon">
        <div class="bottom-icon">
          <i class="el-icon-chat-dot-round icon-size"></i>
          <span>客服</span>
        </div>
        <div class="bottom-icon" @click="goCart">
          <el-badge :value="cartCount" :max="99" :hidden="!cartCount">
            <i class="el-icon-shopping-cart-1 icon-size"></i>
          </el-badge>
          <span>购物车</span>
        </div>
      </div>
      <div class="button">
        <el-button class="cart-button" round @click="addCart"
          >加入购物车</el-button
        >
        <el-button class="cart-button" round @click="toBuy">立即购买</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import { getDetail } from "@/service/good";
import { addCart } from "@/service/cart";

export default {
  name: "ProductDetail",
  components: { SimpleHeader },
  data() {
    return {
      product: {},
      anchorList: ["概述", "参数", "安装服务", "常见问题"],
      active: 0,
    };
  },
  mounted() {
    console.log("this.$route.params: ", this.$route.params);
    this.$store.dispatch("updateCart");
    this.getProductDetail();
    window.addEventListener("scroll", this.onScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.onScroll);
  },
  computed: {
    cartCount() {
      return this.$store.state.cartCount;
    },
  },
  methods: {
    async getProductDetail() {
      const { productId } = this.$route.params;
      const { data } = await getDetail(productId);
      this.product = data;
    },
    goTo(link) {
      this.active = link;
      if (this.product.goodsDetailContent) {
        let offset = document.getElementById("anchors").offsetTop;
        let width =
          document.body.clientWidth || document.documentElement.clientWidth;
        let scrollTop = offset + link * width;
        document.documentElement.scrollTop = scrollTop;
        document.body.scrollTop = scrollTop;
      }
    },
    onScroll() {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      let offsetTop = document.getElementById("anchors").offsetTop;
      let distance = scrollTop - offsetTop;
      let width =
        document.body.clientWidth || document.documentElement.clientWidth;
      for (let i = 1; i <= 4; i++) {
        if (distance > i * width) {
          this.active = Math.min(i, 4);
        } else {
          this.active = i - 1;
          break;
        }
      }
    },
    goCart() {
      this.$router.push("/cart");
    },
    toBuy() {
      let _this = this;
      this.addCart().finally(() => {
        _this.goCart();
      });
    },
    async addCart() {
      const { resultCode } = await addCart({
        goodsCount: 1,
        goodsId: this.product.goodsId,
      });
      if (resultCode === 200) {
        this.$message({
          message: "添加成功",
          type: "success",
        });
      }
      this.$store.dispatch("updateCart");
    },
  },
};
</script>

<style lang="less" scoped>
.product-detail {
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
}
.product-img {
  width: 100%;
  height: 100%;
}
.price {
  color: red;
}
.delivery {
  padding: 3px 0;
  color: rgb(142, 142, 142);
  font-size: 12px;
}
.anchor-list {
  display: flex;
  align-items: center;
  margin-top: 20px;
  font-size: 14px;
}
.anchor {
  width: 25%;
  text-align: center;
  color: #333333;
}
.active {
  color: #1baeae;
}
.anchor:not(:first-child) {
  border-left: 1px solid #666666;
}
.custom-content {
  padding: 0 30px;
  ::v-deep img {
    width: 100%;
  }
}
.bottom {
  width: 100%;
  box-sizing: border-box;
  height: 50px;
  line-height: 30px;
  font-size: 14px;
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  padding: 3px 2px;
}
.icon {
  display: flex;
}
.bottom-icon {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon-size {
  font-size: 20px;
}
.button {
  width: 75%;
  box-sizing: border-box;
  display: flex;
  justify-content: left;
}
.cart-button {
  width: 50%;
  background-color: #1baeae;
  border: none;
}
.cart-button:first-child {
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
  border-right: 1px solid #e6e6e6;
}
.cart-button:last-child {
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
::v-deep .el-button {
  margin-left: 0;
}
</style>
