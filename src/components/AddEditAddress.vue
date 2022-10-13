<template>
  <div class="container width-box">
    <el-form
      :model="addressForm"
      ref="addressForm"
      :rules="addressRules"
      class="address-form width-box"
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="addressForm.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="userPhone">
        <el-input v-model="addressForm.userPhone" clearable></el-input>
      </el-form-item>
      <el-form-item label="地区" prop="selectedRegion">
        <el-cascader
          :options="regionOptions"
          v-model="addressForm.selectedRegion"
          class="width-box"
          clearable
          @change="regionChange"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="详细地址" prop="detailAddress">
        <el-input v-model="addressForm.detailAddress" clearable></el-input>
      </el-form-item>
    </el-form>
    <div class="switch width-box">
      <span>是否设置为默认地址</span>
      <el-switch
        v-model="defaultFlag"
        active-color="#1baeae"
        @change="switchChange"
      ></el-switch>
    </div>
    <div class="width-box button-container">
      <el-button class="width-box button save-button" @click="saveAddress" round
        >保存</el-button
      >
      <el-button
        v-if="deleteButton"
        class="width-box button delete-button"
        @click="deleteAddress"
        round
        >删除</el-button
      >
    </div>
    <confirm-dialog
      v-if="deletePopup"
      @cancelPopup="cancelDelete"
      @confirmPopup="confirmDelete"
    >
      <div>确定要删除该地址吗？</div>
    </confirm-dialog>
  </div>
</template>

<script>
import { regionData } from "element-china-area-data";
import ConfirmDialog from "@/components/ConfirmDialog";
export default {
  name: "AddEditAddress",
  components: { ConfirmDialog },
  props: {
    deleteButton: {
      type: Boolean,
      default: true,
    },
    addressInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    console.log("mounted:  ", this.addressInfo);
    console.log("mounted...:  ", this.addressInfo.userPhone);
  },
  watch: {
    addressInfo: {
      deep: true,
      handler: function (newVal) {
        // this.$set(this.addressForm, "userName", newVal.userName);
        this.addressForm.userName = newVal.userName;
        this.addressForm.userPhone = newVal.userPhone;
        this.addressForm.selectedRegion = newVal.selectedRegion;
        this.addressForm.detailAddress = newVal.detailAddress;
        this.defaultFlag = newVal.defaultFlag;
      },
    },
  },
  data() {
    let phoneCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("电话号码不能为空"));
      }
      return callback();
      // const rgxPhone =
      //   /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
      // if (!value.match(rgxPhone)) {
      //   return callback(new Error("请输入正确格式的手机号码"));
      // }
      // callback();
    };
    return {
      addressForm: {
        userName: "",
        userPhone: "",
        selectedRegion: [],
        detailAddress: "",
      },
      regionOptions: regionData,
      defaultFlag: false,
      provinceName: "",
      cityName: "",
      regionName: "",
      deletePopup: false,
      addressRules: {
        userName: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
          {
            min: 1,
            max: 20,
            message: "长度在1-20个字符",
            trigger: "blur",
          },
        ],
        userPhone: [
          {
            required: true,
            message: "请输入电话号码",
            trigger: "blur",
          },
          {
            validator: phoneCheck,
            trigger: "blur",
          },
        ],
        selectedRegion: [
          {
            required: true,
            message: "请选择地区",
            trigger: "blur",
          },
        ],
        detailAddress: [
          {
            required: true,
            trigger: "blur",
            message: "请输入详细地址",
          },
          {
            min: 1,
            max: 30,
            message: "详细地址不能少于1个字符",
          },
        ],
      },
    };
  },
  methods: {
    regionChange(value) {
      console.log("regionChange: ", value);
    },
    switchChange() {
      console.log("hhhhhh", this.defaultFlag);
    },
    saveAddress() {
      let address = this.addressForm;
      address.defaultFlag = this.defaultFlag;
      this.$refs.addressForm.validate((valid) => {
        if (valid) {
          this.$emit("save", address);
        } else {
          return false;
        }
      });
      console.log("saveAddress", address);
    },
    deleteAddress() {
      this.deletePopup = true;
    },
    cancelDelete() {
      this.deletePopup = false;
    },
    confirmDelete() {
      this.deletePopup = false;
      console.log("确认删除地址！！");
      this.$emit("delete", this.addressInfo.addressId);
    },
  },
};
</script>

<style lang="less" scoped>
.width-box {
  width: 100%;
  box-sizing: border-box;
}
.container {
  padding: 0 20px;
}
.address-form {
  padding-top: 10px;
}
.switch {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #606266;
}
.button-container {
  margin-top: 30px;
}
.button {
  font-size: 16px;
  display: block;
  text-align: center;
}
.save-button {
  background-color: #1baeae;
  border: none;
  color: #e6e6e6;
}
.delete-button {
  margin-top: 20px;
  margin-left: 0;
}
::v-deep .el-popconfirm__main {
  margin: 23px 24px 17px 24px;
  font-size: 14px;
  font-family: MicrosoftYaHei;
  color: pink;
}
::v-deep .el-popconfirm__action {
  margin-bottom: 24px;
  padding-bottom: 24px;
  // 交换 确定 和 取消 按钮的位置
  ::v-deep .el-button:nth-child(1) {
    float: right;
    margin-right: 23%;
    width: 72px;
    height: 32px;
    background: #055fe7;
    border-radius: 4px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #ffffff;
  }
  ::v-deep.el-button:nth-child(2) {
    float: left;
    margin-left: 23%;
    width: 72px;
    height: 32px;
    background: #ffffff;
    border-radius: 4px;
    border: 1px solid #aeb5c2;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: #2e3846;
  }
}
</style>
