<template>
  <div>
    <simple-header name="我的"></simple-header>
    <div class="container">
      <div class="info-card">
        <img src="../assets/user.png" class="user-img" alt="" />
        <div class="user-info">
          <div>昵称：{{ user.nickName }}</div>
          <div>登录名：{{ user.loginName }}</div>
          <div>个性签名：{{ user.introduceSign }}</div>
        </div>
      </div>
      <div class="links">
        <div
          class="link-item"
          v-for="(item, index) in lists"
          :key="index"
          @click="goTo(item.link)"
        >
          <span>{{ item.name }}</span>
          <i class="el-icon-arrow-right icon-right"></i>
        </div>
      </div>
    </div>
    <nav-bar></nav-bar>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import NavBar from "@/components/NavBar";
import { getUserInfo } from "@/service/user";

export default {
  name: "UserComponent",
  components: { SimpleHeader, NavBar },
  mounted() {
    getUserInfo().then(({ data }) => {
      this.user = data;
    });
  },
  data() {
    return {
      user: {},
      lists: [
        {
          name: "我的订单",
          link: "order",
        },
        {
          name: "账号管理",
          link: "setting",
        },
        {
          name: "地址管理",
          link: "address?from=mine",
        },
        {
          name: "关于我们",
          link: "about",
        },
      ],
    };
  },
  methods: {
    goTo(link) {
      this.$router.push(link);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 0 20px;
  margin-top: 70px;
}
.info-card {
  width: 100%;
  box-sizing: border-box;
  padding: 20px 20px;
  display: flex;
  justify-content: left;
  align-items: center;
  background-color: #1baeae;
  font-size: 14px;
  color: #f9f9f9;
  border-radius: 10px;
}
.user-img {
  width: 15%;
}
.user-info {
  margin-left: 20px;
  div {
    margin-top: 5px;
  }
}
.links {
  margin-top: 20px;
}
.link-item {
  display: flex;
  justify-content: space-between;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  border-bottom: 1px solid rgb(230, 230, 230);
}
.icon-right {
  margin-top: 15px;
}
</style>
