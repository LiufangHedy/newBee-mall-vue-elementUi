<template>
  <div class="container">
    <simple-header :name="name" back="home"></simple-header>
    <img src="//s.weituibao.com/1582958061265/mlogo.png" class="logo-img" />
    <el-form
      :model="userForm"
      :rules="rules"
      ref="userForm"
      label-width="120px"
      label-position="left"
      class="form"
    >
      <el-form-item label="手机号" prop="username">
        <el-input type="tel" v-model="userForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          v-model="userForm.password"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <verify
      type="2"
      :show-button="false"
      font-size="18px"
      width="100%"
      @success="verifySuccess"
      @error="verifyError"
      ref="verify"
    ></verify>
    <div class="changeLink" @click="changeName">
      {{ type ? "立即注册" : "已有账号登录" }}
    </div>
    <el-button @click="submit" class="submitButton">{{ name }}</el-button>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import Verify from "vue2-verify";
import { login, register } from "@/service/user";
import { setLocal } from "@/common/js/utils";
export default {
  name: "LoginComponent",
  components: { SimpleHeader, Verify },
  mounted() {
    // 利用localStorage实现同源的多个页面的通信。如果用户打开了多个login标签页面，只要有一个标签页登录了就刷新页面
    window.addEventListener("storage", this.storageMessage);
  },
  destroyed() {
    window.removeEventListener("storage", this.storageMessage);
  },
  methods: {
    storageMessage(event) {
      console.log("login页面监听localStorage的变动！", event);
      if (event.key === "token" && event.newValue) {
        window.location.href = "/";
      }
    },
    verifySuccess(obj) {
      this.verify = true;
      console.log("success: ", obj);
      obj.refresh();
    },
    verifyError(obj) {
      this.verify = false;
      console.log("error: ", obj);
      this.$message({
        message: "请输入正确的验证码",
        type: "error",
      });
      obj.refresh();
    },
    changeName() {
      this.type = !this.type;
      this.name = this.type ? "登录" : "注册";
    },
    submit() {
      this.$refs.userForm.validate((valid) => {
        if (valid) {
          this.$refs.verify.checkCode();
          if (this.verify) {
            if (this.type) {
              login({
                loginName: this.userForm.username,
                passwordMd5: this.$md5(this.userForm.password),
              }).then(({ data, resultCode }) => {
                console.log("登录成功：", resultCode);
                setLocal("token", data);
                window.location.href = "/";
              });
            } else {
              register({
                loginName: this.userForm.username,
                password: this.userForm.password,
              }).then(() => {
                this.$message({
                  message: "注册成功！",
                  type: "success",
                });
                this.type = !this.type;
              });
            }
          }
        }
      });
    },
  },
  data() {
    let validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      const rgxPhone =
        /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      if (!value.match(rgxPhone)) {
        return callback(new Error("请输入正确格式的手机号码"));
      }
      callback();
    };
    return {
      name: "登录",
      type: true,
      verify: false,
      // type为true表示登录页面，false表示注册页面
      userForm: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
          },
          {
            validator: validateUsername,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
          },
          {
            min: 4,
            max: 12,
            message: "长度在4-12个字符之间",
            trigger: "blur",
          },
        ],
      },
    };
  },
  watch: {
    type(n, o) {
      this.$refs.userForm.resetFields();
      console.log("watch the type change:  ", n, o);
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
}
.logo-img {
  display: block;
  margin: 80px auto 0;
  width: 120px;
  height: 120px;
}
.form {
  padding-right: 50px;
}
::v-deep .el-input__inner:focus {
  border-color: #1baeae;
}
::v-deep .cerify-code-panel {
  display: flex;
  align-items: center;
  justify-content: left;
}
::v-deep .verify-code-area {
  display: flex;
  justify-content: space-evenly;
}
.changeLink {
  cursor: pointer;
  color: #1989fa;
  margin: 20px 0;
  font-size: 16px;
}
.submitButton {
  width: 100%;
  border-radius: 20px;
  background-color: #1baeae;
  border: none;
}
</style>
