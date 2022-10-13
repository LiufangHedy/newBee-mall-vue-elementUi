<template>
  <div class="container">
    <div
      v-for="(item, index) in list"
      :key="index"
      class="address-item"
      @click="select(item)"
    >
      <div class="address-info">
        <div class="mr-bttm">
          <span>{{ item.userName }}</span>
          <span>{{ item.userPhone }}</span>
          <span v-if="item.defaultFlag" class="default-icon">默认</span>
        </div>
        <div>
          <span>{{ item.provinceName }}</span>
          <span>{{ item.cityName }}</span>
          <span>{{ item.regionName }}</span>
          <span>{{ item.detailAddress }}</span>
        </div>
      </div>
      <i class="el-icon-edit address-edit-icon" @click="editAddress(item)"></i>
    </div>
    <div class="bottom">
      <el-button class="bottom-button" round @click="addAddress">
        新增地址</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AddressList",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    defaultTagText: {
      type: String,
      default: "默认",
    },
  },
  data() {
    return {};
  },
  methods: {
    select(address) {
      this.$emit("select", address.addressId);
    },
    editAddress(address) {
      this.$emit("edit", address.addressId);
    },
    addAddress() {
      this.$emit("addAddress");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  box-sizing: border-box;
}
.address-item {
  width: 100%;
  box-sizing: border-box;
  margin-top: 20px;
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.address-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 18px;
  .mr-bttm {
    margin-bottom: 8px;
  }
}
span + span {
  margin-left: 6px;
}
.default-icon {
  background-color: red;
  color: #fff;
  border-radius: 10px;
  font-size: 14px;
  padding: 2px 4px;
}
.address-edit-icon {
  font-size: 24px;
}
.bottom {
  box-sizing: border-box;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  padding: 5px 20px;
  background-color: #fff;
  z-index: 999;
}
.bottom .bottom-button {
  width: 100%;
  color: #ffffff;
  background-color: #1baeae;
}
</style>
