<template>
  <div class="nav-bar">
    <div class="nav-list">
      <router-link to="home" class="nav-list-item active">
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </router-link>
      <router-link to="category" class="nav-list-item">
        <i class="el-icon-menu"></i>
        <span>分类</span>
      </router-link>
      <router-link to="cart" class="nav-list-item">
        <el-badge :value="count" :max="maxCount" :hidden="!count">
          <i class="el-icon-shopping-cart-1 cart-icon"></i>
        </el-badge>
        <span>购物车</span>
      </router-link>
      <router-link to="user" class="nav-list-item">
        <i class="el-icon-user-solid"></i>
        <span>我的</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      maxCount: 99,
      count: 0,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    async init() {
      await this.$store.dispatch("updateCart");
      this.count = this.$store.state.cartCount;
    },
  },
};
</script>
<style lang="less" scoped>
@import "../common/style/mixin";
.nav-bar {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
  padding: 5px 0;
  background: #fff;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
  .nav-list {
    width: 100%;
    padding: 0;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    .nav-list-item {
      display: flex;
      flex-direction: column;
      text-align: center;
      color: #666;
      &.router-link-active {
        color: @primary;
      }
      i {
        text-align: center;
        font-size: 22px;
      }
      span {
        font-size: 12px;
      }
      .cart-icon {
        position: relative;
      }
    }
  }
}
// 适应PC端大屏幕，当屏幕大于800px时，使网页呈现出800px宽度，即居中状态
@media only screen and (min-width: 800px) {
  .nav-bar {
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    z-index: 1000;
    //媒体查询
    padding: 5px calc(50vw - 400px);
    background: #fff;
    transform: translateZ(0);
    -webkit-transform: translateZ(0);
    .nav-list {
      width: 100%;
      padding: 0;
      display: flex;
      justify-content: space-around;
      flex-direction: row;
      .nav-list-item {
        display: flex;
        flex-direction: column;
        text-align: center;
        color: #666;
        &.router-link-active {
          color: @primary;
        }
        i {
          text-align: center;
          font-size: 22px;
        }
        span {
          font-size: 12px;
        }
        .cart-icon {
          position: relative;
        }
      }
    }
  }
}
</style>
