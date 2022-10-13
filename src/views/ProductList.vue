<template>
  <div>
    <div class="header">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <div class="search">
        <el-input
          type="text"
          v-model="keyword"
          prefix-icon="el-icon-search"
          clearable
        />
      </div>
      <el-button size="mini" type="primary" @click="search()">搜索</el-button>
    </div>
    <el-tabs type="border-card" style="margin-top: 80px" @tab-click="changeTab">
      <el-tab-pane v-for="item in kinds" :key="item" :label="item">
        <loading v-if="isLoad"></loading>
        <div v-if="!isLoad" class="product-list">
          <div
            v-for="item in list"
            :key="item.goodsId"
            class="product-item"
            @click="productDetail(item)"
          >
            <img :src="prefix(item.goodsCoverImg)" />
            <div class="product-description">
              <p class="product-name">{{ item.goodsName }}</p>
              <p class="product-detail">{{ item.goodsIntro }}</p>
              <span class="product-price">￥{{ item.sellingPrice }}</span>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Loading from "@/components/Loading";
import { search } from "@/service/good";
export default {
  name: "productList",
  components: { Loading },

  mounted() {
    console.log(this.$router);
    console.log(this.$route.query.categoryId);
    this.load();
  },
  data() {
    return {
      page: 1,
      keyword: this.$route.query.keyword || "",
      orderBy: "",
      isLoad: false,
      productList: [],
      kinds: ["推荐", "新品", "价格"],
      order: ["", "new", "price"],
      list: [],
    };
  },
  methods: {
    search() {
      this.load();
    },
    goBack() {
      this.$router.go(-1);
    },
    async load() {
      this.isLoad = false;
      const { categoryId } = this.$route.query;
      const { data } = await search({
        pageNumber: this.page,
        goodsCategoryId: categoryId,
        keyword: this.keyword,
        orderBy: this.orderBy,
      });
      this.isLoad = false;
      this.list = data && data.list;
      console.log(categoryId);
      console.log(data);
    },
    changeTab(item) {
      this.orderBy = this.order[parseInt(item.index)];
      this.load();
      console.log("change: ", this.orderBy);
    },
    productDetail(item) {
      console.log("go to details");
      this.$router.push({ path: `product/${item.goodsId}` });
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  font-size: 16px;
  z-index: 1000;
}
.search {
  height: 30px;
  line-height: 30px;
  width: 70%;
  padding: 0 20px;
}
::v-deep .el-input__inner {
  height: 30px;
  border-radius: 20px;
  background-color: rgb(246, 246, 246);
}
::v-deep .el-button--primary {
  background-color: #1baeae;
  border: none;
}
::v-deep .el-tabs--border-card {
  .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 33.33%;
      border: none;
      text-align: center;
      .el-tabs__item.is-active {
        color: #1baeae;
      }
    }
  }
}
//设置点击tab时的颜色不生效
::v-deep.el-tabs__item.is-focus {
  color: pink;
}
.product-item {
  display: flex;
  justify-content: space-between;
  img {
    width: 100px;
    height: 100px;
  }
}
.product-description {
  width: 58%;
  font-size: 16px;
}
.product-name {
  color: #333333;
  font-size: 18px;
}
.product-detail {
  font-size: 12px;
  color: #666666;
  padding: 10px 0;
  overflow: hidden;
}
.product-price {
  color: #1baeae;
}
</style>
