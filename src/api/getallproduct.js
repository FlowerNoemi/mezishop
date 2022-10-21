import axios from '../api/axios';


const product_URL = '/mezi_be/product/getallproduct.php';

export const getAllProduct = async () => {  
    const productData = await axios.get(product_URL)
    .then((res)=>res.data);
    return productData; 
};
