<template>
  <div>
    <header class="header" :class="{ active: headerScroll }">
      <router-link to="">
        <i class="el-icon-search"></i>
      </router-link>
      <div class="search-area">
        <span class="search-title">新峰商城</span>
        <router-link tag="span" class="search-tip" to="./product-list?from=home"
          >山河无恙，人间皆安</router-link
        >
      </div>
      <router-link to="user" v-if="isLogin">
        <i class="el-icon-user"></i>
      </router-link>
      <router-link to="login" v-else>登录</router-link>
    </header>
    <nav-bar></nav-bar>
    <swiper-img :list="swiperList"></swiper-img>
    <!--    该功能并未实现-->
    <div class="icon-function">
      <div
        v-for="item in categoryList"
        :key="item.categoryId"
        class="icon-item"
      >
        <img :src="item.imgUrl" />
        <span class="icon-name">{{ item.name }}</span>
      </div>
    </div>
    <div style="padding-bottom: 100px">
      <div v-for="topic in goodsShow" :key="topic.title">
        <div class="topic-title">
          {{ topic.title }}
        </div>
        <div class="products">
          <div
            class="product-show"
            v-for="(item, index) in topic.items"
            :key="index"
            @click="goToDetail(item)"
          >
            <img :src="prefix(item.goodsCoverImg)" />
            <span>{{ item.goodsName }}</span>
            <span> ￥{{ item.sellingPrice }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";
import SwiperImg from "@/components/Swiper";
import { getLocal } from "@/common/js/utils";
import { getHome } from "@/service/home";

export default {
  name: "HomeComponent",
  components: { NavBar, SwiperImg },
  data() {
    return {
      swiperList: [],
      isLogin: false,
      headerScroll: false,
      hots: [],
      newGoodses: [],
      recommends: [],
      goodsShow: [],
      categoryList: [
        {
          name: "新蜂超市",
          imgUrl: "//s.weituibao.com/1583585285461/cs.png",
          categoryId: 100001,
        },
        {
          name: "新蜂服饰",
          imgUrl: "//s.weituibao.com/1583585285468/fs.png",
          categoryId: 100003,
        },
        {
          name: "全球购",
          imgUrl: "//s.weituibao.com/1583585285470/qq.png",
          categoryId: 100002,
        },
        {
          name: "新蜂生鲜",
          imgUrl: "//s.weituibao.com/1583585285472/sx.png",
          categoryId: 100004,
        },
        {
          name: "新蜂到家",
          imgUrl: "//s.weituibao.com/1583585285467/dj.png",
          categoryId: 100005,
        },
        {
          name: "充值缴费",
          imgUrl: "//s.weituibao.com/1583585285465/cz.png",
          categoryId: 100006,
        },
        {
          name: "9.9元拼",
          imgUrl: "//s.weituibao.com/1583585285469/pt.png",
          categoryId: 100007,
        },
        {
          name: "领劵",
          imgUrl: "//s.weituibao.com/1583585285468/juan.png",
          categoryId: 100008,
        },
        {
          name: "省钱",
          imgUrl: "//s.weituibao.com/1583585285471/sq.png",
          categoryId: 100009,
        },
        {
          name: "全部",
          imgUrl: "//s.weituibao.com/1583585285470/qb.png",
          categoryId: 100010,
        },
      ],
    };
  },
  async mounted() {
    const token = getLocal("token");
    if (token) {
      console.log("token????: ", token);
      this.isLogin = true;
    }
    window.addEventListener("scroll", this.pageScroll);
    // 使用localStorage与同源的其他标签页通信, 主要是为了判断是否在其他标签页登录
    // window.addEventListener("storage", this.storageMessage);
    // 使用postMessage与不同域的窗口通信
    // let _this = this;
    // window.addEventListener("message", function (msg) {
    //   console.log("NewBee接收到其他窗口发来的消息：", msg.data);
    //   if (msg.origin === "http://localhost:63343") {
    //     msg.source.postMessage(`给你发送消息： ${_this.hots}`, msg.origin);
    //   }
    // });
    const { data } = await getHome();
    this.swiperList = data.carousels;
    this.newGoodses = data.newGoodses;
    this.hots = data.hotGoodses;
    this.recommends = data.recommendGoodses;
    this.goodsShow = [
      {
        title: "新品上线",
        items: this.newGoodses,
      },
      {
        title: "热门商品",
        items: this.hots,
      },
      {
        title: "最佳推荐",
        items: this.recommends,
      },
    ];
  },
  destroyed() {
    // window.removeEventListener("storage", this.storageMessage);
  },
  methods: {
    storageMessage(event) {
      console.log("home页面监听到了localStorage！", localStorage, event);
      // 判断是否登录
      // if (getLocal("token")) {
      //   console.log("already login");
      //   window.location.href = "/";
      // }
    },
    pageScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      this.headerScroll = scrollTop > 100 ? true : false;
    },
    goToDetail(item) {
      this.$router.push({ path: `product/${item.goodsId}` });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../common/style/mixin";
.header {
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 999;
  background-color: #ffffff;
  padding: 0 20px;
  font-size: 20px;
  &.active {
    background-color: #1baeae;
  }
}
// 适应PC端大屏幕，当屏幕大于800px时，使网页呈现出800px宽度，即居中状态
@media only screen and(min-width: 800px) {
  .header {
    box-sizing: border-box;
    width: 100%;
    height: 50px;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 999;
    //媒体查询
    padding: 0 calc(50vw - 400px);
    font-size: 20px;
    background-color: #ffffff;
    &.active {
      background-color: #1baeae;
    }
  }
}
.search-area {
  width: 74%;
  height: 20px;
  line-height: 20px;
  border-radius: 30px;
  padding: 6px 0;
  background-color: #f7f7f7;
}
.search-title {
  font-size: 20px;
  font-weight: bold;
  color: #1baeae;
  padding: 0 10px;
  border-right: 1px solid #232326;
}
.search-tip {
  padding-left: 20px;
  font-size: 12px;
  color: #666666;
}
.icon-function {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 10px;
}
.topic-title {
  text-align: center;
  height: 50px;
  font-size: 20px;
  line-height: 50px;
  font-weight: bold;
  color: #1baeae;
  background-color: #f7f7f7;
}

.icon-item {
  box-sizing: border-box;
  width: 20%;
  display: flex;
  flex-direction: column;
  img {
    width: 40px;
    height: 40px;
    margin: 15px auto 10px;
  }
  text-align: center;
}
.icon-name {
  font-size: 16px;
}
.products {
  display: flex;
  flex-wrap: wrap;
}
.product-show {
  width: 50%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #e6e6e6;
  img {
    width: 40%;
    margin: 10px auto;
  }
  span {
    text-align: center;
    font-size: 12px;
    color: #2c3e50;
  }
}
.product-show:nth-child(2n + 1) {
  border-right: 1px solid #e6e6e6;
}
.goods {
  .goods-header {
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: @primary;
    background-color: #f9f9f9;
    font-size: 20px;
    font-weight: 500;
  }
  .goods-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .goods-item {
      width: 50%;
      border-bottom: 1px solid rgb(230, 230, 230);
      padding: 10px;
      img {
        display: block;
        margin: 0 auto;
        width: 120px;
      }
      .goods-desc {
        text-align: center;
        font-size: 12px;
        padding: 10px 0;
      }
      .goods-name {
        color: rbg(50, 49, 63);
      }
      .goods-price {
        color: rbg(54, 167, 164);
      }
      .boxSizing();
      &:nth-child(2n + 1) {
        border-right: 1px solid rgb(230, 230, 230);
      }
    }
  }
}
</style>
