import axios from "../api/axios";

const order_URL = "/mezi_be/api/getallorder.php";

export const getAllOrder = async () => {
  const userData = await axios.get(order_URL).then((res) => res.data);
  return userData;
};

const myOrder_URL = `/mezi_be/api/getuser.php?`;

export const myActualOrderData = async (email) => {
  const myData = await axios
    .get(myOrder_URL + `email=${email}`)
    .then((res) => res.data);
  return myData;
};
