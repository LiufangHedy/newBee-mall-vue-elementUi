<template>
  <div>
    <header class="simple-header">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <span>{{ name }}</span>
      <el-dropdown
        @command="handleCommand"
        class="dropdown"
        placement="top"
        :hide-on-click="false"
        trigger="click"
      >
        <span class="dropdown-link">
          <i class="el-icon-more"></i>
        </span>
        <el-dropdown-menu class="custom-dropdown-menu">
          <el-dropdown-item command="user">我的信息</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
  </div>
</template>

<script>
import { getLocal, setLocal } from "@/common/js/utils";
import { logout } from "@/service/user";

export default {
  name: "SimpleHeader",
  props: {
    name: {
      type: String,
      default: "",
    },
    back: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      isLogin: false,
    };
  },
  mounted() {
    const token = getLocal("token");
    if (token) {
      this.isLogin = true;
    }
  },
  methods: {
    goBack() {
      if (this.back) {
        this.$router.push({
          path: this.back,
        });
      } else {
        this.$router.go(-1);
      }
    },
    handleCommand(command) {
      console.log(command);
      if (command === "user") {
        this.$router.push({
          path: "/user",
        });
      } else {
        this.logout();
      }
    },
    async logout() {
      const { resultCode } = await logout();
      if (resultCode == 200) {
        setLocal("token", "");
        window.location.href = "/";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.simple-header {
  box-sizing: border-box;
  height: 45px;
  line-height: 25px;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  background-color: #ffffff;
  z-index: 1000;
  font-size: 14px;
  padding: 10px 20px;
  border-bottom: 1px solid rgb(215, 215, 215);
}
.dropdown {
  font-size: 14px;
}
.dropdown-link {
  cursor: pointer;
  color: #1baeae;
}
.custom-dropdown-menu {
  margin-top: 0;
  z-index: 1000;
}
::v-deep .el-dropdown-menu__item:not(.is-disabled):hover {
  color: #1baeae;
}
@media only screen and(min-width: 800px) {
  .simple-header {
    box-sizing: border-box;
    height: 45px;
    line-height: 25px;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    z-index: 1000;
    font-size: 14px;
    padding: 10px calc(50vw - 617px / 2);
    border-bottom: 1px solid rgb(215, 215, 215);
  }
}
</style>
