<template>
  <div>
    <simple-header name="购物车"></simple-header>
    <div class="cart-list" v-if="lists.length">
      <el-checkbox-group
        class="product-show"
        v-model="checkedProducts"
        @change="handleCheckedChange"
      >
        <div class="checkbox">
          <el-checkbox
            v-for="(product, index) in lists"
            :key="index"
            :label="product.cartItemId"
            class="checkbox-product"
          >
            <div class="product-item" @click.prevent>
              <div class="product-detail">
                <router-link :to="`product/${product.goodsId}`">
                  <img
                    :src="prefix(product.goodsCoverImg)"
                    class="product-img"
                    alt=""
                  />
                </router-link>
                <div class="product-text">
                  <div>{{ product.goodsName }}</div>
                  <div class="product-price">￥{{ product.sellingPrice }}</div>
                </div>
              </div>
              <div class="product-operation">
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  size="mini"
                  class="delete-button"
                  @click="deleteProduct(product)"
                ></el-button>
                <el-input-number
                  v-model="product.goodsCount"
                  :min="1"
                  :max="5"
                  size="mini"
                  class="operation1"
                  @change="changeNums(product)"
                ></el-input-number>
              </div>
            </div>
          </el-checkbox>
        </div>
      </el-checkbox-group>
      <el-checkbox
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
        class="total"
      >
        <div class="all-check">
          <span>全选</span>
          <div>
            <span style="color: #333333"
              >合计：<sub style="color: red">￥</sub
              ><span class="price">{{ checkedPrice }}</span></span
            >
            <el-button class="submit-button" size="mini" round @click="toSubmit"
              >结算</el-button
            >
          </div>
        </div>
      </el-checkbox>
    </div>
    <div v-else class="no-products">
      <i class="el-icon-shopping-cart-2 no-icon"></i>
      <span>购物车空空如也</span>
      <el-button @click="goHome" class="no-button">前往首页</el-button>
    </div>
    <nav-bar ref="navBar"></nav-bar>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import NavBar from "@/components/NavBar";
import { getCart, modifyCart, deleteCartItem } from "@/service/cart";

export default {
  name: "cartComponent",
  components: { SimpleHeader, NavBar },
  mounted() {
    this.init();
  },
  data() {
    return {
      navKey: 1,
      lists: [],
      checkAll: false,
      isIndeterminate: true,
      checkedProducts: [],
    };
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    checkedPrice() {
      let products = this.lists.filter((item) => {
        return this.checkedProducts.includes(item.cartItemId);
      });
      // eslint-disable-next-line no-unused-vars
      let sum = 0;
      console.log("lists: ", this.lists);
      console.log("checked: ", this.checkedProducts);
      console.log("products: ", products);
      products.forEach((item) => {
        console.log("sellingPrice: ", item);
        sum += item.sellingPrice * item.goodsCount;
      });
      return sum;
    },
  },
  methods: {
    async init() {
      const { data } = await getCart({ pageNumber: 1 });
      this.lists = data;
      console.log("购物车数据", this.lists);
    },
    goHome() {
      window.location.href = "/";
    },
    handleCheckedChange(list) {
      console.log("checkedChanged", this.checkedProducts, list);
      let checkedCount = list.length;
      this.checkAll = checkedCount === this.lists.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.lists.length;
    },
    handleCheckAllChange(val) {
      console.log("all checked", val);
      let list = this.lists.map((item) => {
        return item.cartItemId;
      });
      this.checkedProducts = val ? list : [];
      this.isIndeterminate = false;
    },
    deleteProduct(product) {
      console.log("deleteProduct: ", product);
      deleteCartItem(product.cartItemId).then(() => {
        this.$store.dispatch("updateCart");
        this.init();
        this.$refs.navBar.init();
      });
    },
    async changeNums(product) {
      console.log("changeNums: ", product);
      await modifyCart({
        cartItemId: product.cartItemId,
        goodsCount: product.goodsCount,
      });
    },
    toSubmit() {
      if (!this.checkedProducts.length) {
        this.$message({
          message: "请选择要购买的商品",
          type: "warning",
        });
        return;
      }
      const params = JSON.stringify(this.checkedProducts);
      console.log(
        "json.stringify: ",
        params,
        `/create-order?cartItemIds=${params}`
      );
      this.$router.push(`/create-order?cartItemIds=${params}`);
    },
  },
};
</script>

<style lang="less" scoped>
.checkbox {
  width: 100%;
  box-sizing: border-box;
}
.cart-list {
  padding-top: 60px;
}
.product-show {
  padding-bottom: 150px;
}
.checkbox-product {
  width: 100%;
  box-sizing: border-box;
  display: block;
  margin-bottom: 10px;
}
.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
::v-deep .el-checkbox__label {
  width: 95%;
  box-sizing: border-box;
}
.product-detail {
  display: flex;
  justify-content: left;
}
.product-img {
  width: 80px;
  height: 80px;
}
.product-text {
  font-size: 12px;
  color: #333333;
  padding: 10px 20px;
}
.product-price {
  color: red;
  font-size: 16px;
  margin-top: 20px;
}
.product-operation {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.delete-button {
  margin-left: 50px;
  margin-bottom: 10px;
}
.operation {
  width: 50px;
}
::v-deep .el-button--danger {
  width: 30px;
  height: 30px;
  padding: 0 1px;
}
::v-deep .el-checkbox__input {
  vertical-align: top;
}
.total {
  display: block;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  margin-bottom: 48px;
  padding: 5px 20px;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
  background-color: #ffffff;
  ::v-deep .el-checkbox__input {
    vertical-align: middle;
  }
}
@media only screen and(min-width: 800px) {
  .total {
    display: block;
    width: 617px;
    height: 50px;
    //box-sizing: border-box;
    margin-bottom: 48px;
    //媒体查询
    padding: 5px 20px;
    position: fixed;
    bottom: 0;
    left: calc(50vw - 617px / 2);
    z-index: 1000;
    background-color: #ffffff;
    ::v-deep .el-checkbox__input {
      vertical-align: middle;
    }
  }
}
.all-check {
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.price {
  color: red;
  font-size: 16px;
}
.submit-button {
  background-color: #1baeae;
  margin-left: 20px;
  color: #f9f9f9;
  font-size: 16px;
  font-weight: bold;
}
.no-products {
  margin: 200px auto 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
}
.no-icon {
  font-size: 50px;
}
.no-button {
  margin-top: 15px;
  background-color: #1baeae;
}
</style>
