import { getCart } from "../service/cart";
export default {
  async updateCart({ commit }) {
    const { data } = await getCart();
    commit("initCart", {
      count: data.length || 0,
    });
  },
};
