import axios from './axios';


const product_URL = '/mezi_be/product/getallproducts.php';

export const getAllProducts = async () => {  
    const productsData = await axios.get(product_URL)
    .then((res)=>res.data);
    return productsData; 
};
