<template>
  <div>
    <simple-header
      :name="type === 'add' ? '新增地址' : '编辑地址'"
    ></simple-header>
    <add-edit-address
      :delete-button="type === 'edit'"
      :address-info="addressInfo"
      class="address-edit"
      @save="save"
      @delete="deleteAddress"
    ></add-edit-address>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import AddEditAddress from "@/components/AddEditAddress";
import { CodeToText, TextToCode } from "element-china-area-data";
import {
  NewbeeCityNameToElementArea,
  ElementAreaCityNameToNewbee,
} from "@/common/js/utils";
import {
  getAddressDetail,
  addAddress,
  EditAddress,
  DeleteAddress,
} from "@/service/address";
export default {
  name: "AddressEdit",
  components: { AddEditAddress, SimpleHeader },
  data() {
    return {
      type: "add",
      addressId: "",
      from: "",
      addressInfo: {
        userName: "",
        userPhone: "",
        detailAddress: "",
        selectedRegion: [],
        defaultFlag: false,
      },
    };
  },
  async mounted() {
    const { type, addressId, from } = this.$route.query;
    this.type = type;
    this.addressId = addressId;
    this.from = from || "";
    if (this.addressId) {
      const { data } = await getAddressDetail(this.addressId);
      this.addressInfo.defaultFlag = data.defaultFlag !== 0;
      this.addressInfo.userName = data.userName;
      this.addressInfo.userPhone = data.userPhone;
      this.addressInfo.detailAddress = data.detailAddress;
      let names = NewbeeCityNameToElementArea(data.provinceName, data.cityName);
      let namesCodes = [];
      namesCodes.push(TextToCode[names[0]].code);
      namesCodes.push(TextToCode[names[0]][names[1]].code);
      namesCodes.push(TextToCode[names[0]][names[1]][data.regionName].code);
      this.addressInfo.selectedRegion = namesCodes;
    }
    console.log("transfer:: ", this.addressInfo);
  },
  methods: {
    async save(address) {
      let provinceName = CodeToText[address.selectedRegion[0]];
      let cityName = CodeToText[address.selectedRegion[1]];
      let regionName = CodeToText[address.selectedRegion[2]];
      let names = ElementAreaCityNameToNewbee(provinceName, cityName);
      provinceName = names[0];
      cityName = names[1];
      let params = {
        userName: address.userName,
        userPhone: address.userPhone,
        provinceName: provinceName,
        cityName: cityName,
        regionName: regionName,
        detailAddress: address.detailAddress,
        defaultFlag: address.defaultFlag ? 1 : 0,
      };
      if (this.type === "edit") {
        params.addressId = this.addressId;
      }
      this.type === "edit"
        ? await EditAddress(params)
        : await addAddress(params);
      this.$message({
        message: "保存成功",
        type: "success",
      });
      this.$router.push(`/address?from=${this.from}`);
      console.log(address);
    },
    async deleteAddress() {
      console.log("deleteAddress: ", this.addressId);
      await DeleteAddress(this.addressId);
      this.$message({
        message: "删除成功！",
        type: "success",
      });
      this.$router.push(`/address?from=${this.from}`);
    },
  },
};
</script>

<style lang="less" scoped>
.address-edit {
  margin-top: 60px;
}
</style>
