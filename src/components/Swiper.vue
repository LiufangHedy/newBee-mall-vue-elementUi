<template>
  <el-carousel
    class="my-swipe"
    arrow="always"
    :interval="3000"
    indicator-position="outside"
  >
    <el-carousel-item v-for="(item, index) in list" :key="index">
      <img :src="item.carouselUrl" @click="open(item.redirectUrl)" />
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default {
  name: "SwiperComponent",
  props: ["list"],
  methods: {
    open(url) {
      window.open(url);
    },
  },
};
</script>

<style lang="less" scoped>
img {
  height: 100%;
  width: 100%;
}
</style>
