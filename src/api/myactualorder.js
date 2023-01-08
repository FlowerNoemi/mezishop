import axios from "./axios";

const pattern_URL = `/mezi_be/order/getrendeles.php?`;

export const myActualOrderData = async (email) => {
  const myData = await axios
    .get(pattern_URL + `email=${email}`)
    .then((res) => res.data);
  return myData;
};
