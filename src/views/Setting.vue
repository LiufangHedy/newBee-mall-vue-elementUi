<template>
  <div>
    <simple-header name="账号管理"></simple-header>
    <div class="mar-tp user-info-box">
      <div class="user-info-item">
        <div class="fl-left label">昵称</div>
        <div class="mar-left">{{ nickName }}</div>
      </div>

      <div class="user-info-item">
        <div class="fl-left label">个性签名</div>
        <div class="mar-left">{{ introduceSign }}</div>
      </div>

      <div class="user-info-item">
        <div class="fl-left label">修改密码</div>
        <div class="mar-left">
          <input type="password" v-model="password" class="input" />
        </div>
      </div>
    </div>
    <div class="btn-box">
      <el-button class="btn" @click="save">保存</el-button>
      <el-button class="btn" @click="logout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import { getUserInfo, EditUserInfo, logout } from "@/service/user";
import { setLocal } from "@/common/js/utils";

export default {
  name: "SettingComponent",
  components: { SimpleHeader },
  data() {
    return {
      nickName: "",
      introduceSign: "",
      password: "",
    };
  },
  async mounted() {
    const { data } = await getUserInfo();
    this.nickName = data.nickName;
    this.introduceSign = data.introduceSign;
  },
  methods: {
    async save() {
      const params = {
        introduceSign: this.introduceSign,
        nickName: this.nickName,
        passwordMd5: this.$md5(this.password),
      };
      console.log("passparams: ", params);
      await EditUserInfo(params);
      this.$message({
        message: "保存成功",
        type: "success",
      });
    },
    async logout() {
      const { resultCode } = await logout();
      if (resultCode === 200) {
        setLocal("token", "");
        window.location.href = "/";
      }
    },
  },
};
</script>

<style lang="less" scoped>
.mar-tp {
  margin-top: 60px;
}
.user-info-box {
  padding: 10px 20px;
}
.fl-left {
  float: left;
}
.cl-left {
  clear: left;
}
mar-left {
  margin-left: 100px;
}
.user-info-item {
  padding: 10px 0;
  font-size: 16px;
}
.user-info-item::after {
  display: block;
  content: "";
  clear: both;
}
.label {
  width: 100px;
}
.btn-box {
  text-align: center;
}
.btn {
  width: 70%;
  text-align: center;
  font-size: 20px;
  background-color: #1baeae;
  color: #ffffff;
  margin-top: 20px;
  margin-left: 0;
  // el-button默认两个button之间存在margin-left
}
.input {
  height: 30px;
  width: 60%;
  font-size: 20px;
  border: none;
  background-color: rgb(230, 237, 254);
}
</style>
