import { createContext , useState, useEffect} from 'react';
import {getAllProducts} from '../api/getproducts.js';

export const AllProductContext = createContext({
    allproducts: [],
    getallProductsset: () => {},
});

export const AllProductsProvider = ({children}) =>{
    const [allproducts, setAllProducts] = useState(['']);
    const getallProductsset = async () => {
        try {
          const dataRequest = await  getAllProducts();
          console.log(dataRequest)
          setAllProducts(dataRequest);
          
          } catch(e) {
          console.log('error message : ', e);
          }
      };
    
useEffect(() => {
    getallProductsset();    
} , [] 
);

const value = {allproducts,  getallProductsset };

return (
        <AllProductContext.Provider value = {value}> {children}</AllProductContext.Provider>
    ) 
}