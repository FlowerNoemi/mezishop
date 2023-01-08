import axios from "./axios";

const pattern_URL = `/mezi_be/auth/userData.php?`;

export const myData = async (email) => {
  const userData = await axios
    .get(pattern_URL + `email=${email}`)
    .then((res) => res.data);
  return userData;
};
