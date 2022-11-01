<!--
 * 严肃声明：
 * 开源版本请务必保留此注释头信息，若删除我方将保留所有法律责任追究！
 * 本系统已申请软件著作权，受国家版权局知识产权以及国家计算机软件著作权保护！
 * 可正常分享和学习源码，不得用于违法犯罪活动，违者必究！
 * Copyright (c) 2020 陈尼克 all rights reserved.
 * 版权所有，侵权必究！
 *
-->
<template>
  <div id="app">
    <transition :name="transitionName">
      <router-view class="router-view" />
    </transition>
  </div>
</template>
<script>
export default {
  data() {
    return {
      transitionName: "slide-left",
    };
  },
  watch: {
    $route(to, from) {
      console.log("change the route--", to, from);
      // 从次级路由页面跳转到主级路由页面，页面入场动画为右边向左滑动
      if (to.meta.index < from.meta.index) {
        this.transitionName = "slide-right";
      } else if (to.meta.index > from.meta.index) {
        this.transitionName = "slide-left";
      } else {
        this.transitionName = "";
      }
    },
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.router-view {
  width: 100%;
  height: auto;
  //position: absolute;
  //top: 0;
  //bottom: 0;
  margin: 0 auto;
  -webkit-overflow-scrolling: touch;
}
@media only screen and (min-width: 800px) {
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    // 因为使用了pxtorem，当宽度超过800px时，宽度最大值为800px
    // 800/70 * 54 = 617px 定义的宽度
    max-width: 617px;
    overflow: hidden;
    //height: 100%;
    margin: 0 auto;
  }
  .router-view {
    max-width: 617px;
    //height: 100%;
    //position: absolute;
    //top: 0;
    //bottom: 0;
    //媒体查询, 因为router-view为绝对定位，且其父元素不为Id为app的元素
    // 这里有点问题：当屏幕宽度在800-1000px区间时，计算的left有问题，或者说页面没有自适应，而是有的被覆盖了
    // CSS中单位为%的数值，都是基于父元素的宽度计算的！！
    //padding: 0 calc(50vw - 50%);
    margin: 0 auto;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
  }
}
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  height: 100%;
  will-change: transform;
  transition: all 500ms;
  //position: absolute;
  backface-visibility: hidden;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.fixed-bottom {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 5px 20px;
  background-color: #ffffff;
  z-index: 999;
}
@media only screen and(min-width: 800px) {
  .fixed-bottom {
    box-sizing: border-box;
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    padding: 5px calc(50vw - 617px / 2);
    background-color: #ffffff;
    z-index: 999;
  }
}
</style>
