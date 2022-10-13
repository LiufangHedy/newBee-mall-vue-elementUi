<template>
  <div>
    <simple-header name="地址管理" :back="back"></simple-header>
    <address-list
      v-if="from === 'mine'"
      :list="addressList"
      default-tag-text="默认"
      @edit="editAddress"
      @addAddress="addAddress"
      class="address"
    ></address-list>
    <address-list
      v-else
      :list="addressList"
      default-tag-text="默认"
      @edit="editAddress"
      @addAddress="addAddress"
      @select="selectAddress"
      class="address"
    ></address-list>
  </div>
</template>

<script>
import SimpleHeader from "@/components/SimpleHeader";
import AddressList from "@/components/AddressList";
import { getAddressList } from "@/service/address";
export default {
  name: "AddressComponent",
  components: { SimpleHeader, AddressList },
  data() {
    return {
      addressList: [],
      from: "mine",
      back: "/user",
    };
  },
  mounted() {
    this.from = this.$route.query.from;
    this.getAddresses();
  },
  methods: {
    async getAddresses() {
      const { data } = await getAddressList();
      this.addressList = data;
      console.log("addressList: ", this.addressList);
    },
    editAddress(id) {
      this.$router.push(
        `address-edit?type=edit&addressId=${id}&from=${this.from}`
      );
    },
    addAddress() {
      this.$router.push(`address-edit?type=add&from=${this.from}`);
    },
    selectAddress(id) {
      console.log(id);
      this.$router.push(`create-order?addressId=${id}&from=${this.from}`);
    },
  },
};
</script>

<style lang="less" scoped>
.address {
  margin-top: 60px;
  padding: 0 10px;
}
</style>
