import axios from '../api/axios';


const message_URL = '/mezi_be/api/allmessage.php';

export const getAllMessage = async () => {  
    const messageData = await axios.get(message_URL)
    .then((res)=>res.data);
    return messageData; 
};