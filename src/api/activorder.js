import axios from "./axios";

const order_URL = `/mezi_be/order/ship.php?`;
const orderData_URL = `/mezi_be/order/shipdata.php?`;

export const active = async (id) => {
  const orderData = await axios
    .get(order_URL + `orderid=${id}`)
    .then((res) => res.data);
  return orderData;
};

export const getOrderData = async (id) => {
  const orderData = await axios
    .get(orderData_URL + `orderid=${id}`)
    .then((res) => res.data);
  return orderData;
};
