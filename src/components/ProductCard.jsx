import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import './productcard.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

import {MyLittleButton}  from '../components/button/Buttoncomponents';



const ProductCard = ({product}) => {


  const {id,termeknev,img,ar,mennyiseg} = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);
 

  return (
    <Card className='cards'  data-tilt key={id} 
    >
      
      <article className='post'>
      <div className='card-title'>
      <h2>{termeknev}</h2>
      </div>
      <CardMedia
        component="img"
        image={img}
        alt={`${termeknev}`}
        title={`${termeknev}`}
        className='post-img'
      />
      <CardContent className='post-content'>
                <h4>{mennyiseg}</h4>  
               
                <div className="ar">{ar} Ft</div>
                <CardActions className='cardactions' > 
                
                <div>
                <MyLittleButton value="Kosárba"              
                onClick={addProductToCart}
                > 
                 Kosárba
                </MyLittleButton>
                </div>  
            </CardActions>
            
            <div>
         
        </div>
                    
      </CardContent>

      
      </article>
    </Card>
  );
}
export default  ProductCard;