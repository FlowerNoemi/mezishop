import axios from "./axios";

const order_URL = `/mezi_be/order/statusid.php?`;

export const myOrderId = async (email) => {
  const orderData = await axios
    .get(order_URL + `email=${email}`)
    .then((res) => res.data);
  return orderData;
};
