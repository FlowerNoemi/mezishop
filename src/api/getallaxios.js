import axios from '../api/axios';


const user_URL = '/mezi_be/api/alluser.php?search';

export const getAllUsers = async () => {  
    const userData = await axios.get(user_URL)
    .then((res)=>res.data);
    return userData; 
};
