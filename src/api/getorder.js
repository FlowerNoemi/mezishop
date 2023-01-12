import axios from "./axios";

const order_URL = "/mezi_be/api/getorder.php";

export const getOrder = async () => {
  const orderData = await axios.get(order_URL).then((res) => res.data);
  return orderData;
};
