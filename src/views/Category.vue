<template>
  <div>
    <header class="header">
      <i class="el-icon-arrow-left" @click="goBack()"></i>
      <div class="search">
        <i class="el-icon-search"></i>
        <router-link
          tag="span"
          class="search-title"
          to="./product-list?from=category"
          >全场50元起步</router-link
        >
      </div>
    </header>
    <div style="margin-top: 80px">
      <el-tabs tab-position="left" :stretch="true">
        <el-tab-pane
          v-for="(category, index) in categoryData"
          :key="index"
          :label="category.categoryName"
        >
          <div
            v-for="(secondCategory, index) in category.secondLevelCategoryVOS"
            :key="index"
            class="categories"
          >
            <div class="category-title">{{ secondCategory.categoryName }}</div>
            <div class="item-list">
              <div
                v-for="(item, index) in secondCategory.thirdLevelCategoryVOS"
                :key="index"
                @click="goProduct(item.categoryId)"
                class="product-item"
              >
                <img
                  src="//s.weituibao.com/1583591077131/%E5%88%86%E7%B1%BB.png"
                  class="product-img"
                />
                <div class="item-name">{{ item.categoryName }}</div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import { getCategory } from "@/service/good";
import NavBar from "@/components/NavBar";

export default {
  name: "CategoryComponent",
  components: { NavBar },

  async mounted() {
    const { data } = await getCategory();
    this.categoryData = data;
  },
  data() {
    return {
      categoryData: [],
    };
  },
  methods: {
    goProduct(id) {
      this.$router.push(`product-list?categoryId=${id}`);
    },
    goBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.header {
  box-sizing: border-box;
  z-index: 1000;
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: left;
  align-items: center;
  padding: 0 15px;
  font-size: 20px;
  border-bottom: 1px solid rgb(142, 142, 142);
  background-color: #f9f9f9;
}
.search {
  width: 80%;
  height: 25px;
  line-height: 25px;
  margin-left: 50px;
  padding: 5px 20px;
  border-radius: 20px;
  color: #666666;
  background-color: rgb(246, 246, 246);
}
.search-title {
  margin-left: 15px;
  font-size: 12px;
}
.categories {
  .item-list {
    display: flex;
    flex-wrap: wrap;
  }
}
.product-item {
  width: 30%;
  text-align: center;
  margin-bottom: 10px;
}
.product-img {
  width: 40px;
  height: 40px;
}
.item-name {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}
.category-title {
  font-size: 20px;
  font-weight: 500;
  padding: 10px 0;
}
::v-deep .el-tabs__item {
  height: 50px;
}
::v-deep .el-tabs__item.is-active {
  color: #1baeae;
}
::v-deep .el-tabs__active-bar {
  display: none;
}
</style>
