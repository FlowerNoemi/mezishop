import axios from "./axios";

const user_URL = `/mezi_be/auth/userData.php?`;

export const myData = async (email) => {
  const userData = await axios
    .get(user_URL + `email=${email}`)
    .then((res) => res.data);
  return userData;
};
