import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import './productcard.css';
import Button from '@mui/material/Button';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';


const ProductCard = ({product}) => {
 

  const {id,termeknev,img,ar,mennyiseg} = product;
  const { addItemToCart } = useContext(CartContext);
  const addProductToCart = () => addItemToCart(product);







  return (
    <Card className='cards'  data-tilt key={id} 
    >
      <article className='post'>
      <CardMedia
        component="img"
        height="194"
        image={img}
        alt={`${termeknev}`}
        title={`${termeknev}`}
        className='post-img'
      />
      <CardContent className='post-content'>
                <h4>{mennyiseg}</h4>  
                <h2>{termeknev}</h2>
                <div className="ar">{ar} Ft</div>
                <CardActions className='cardactions' > 
                
                <div>
                <Button aria-label="add to favorites" 
                sx={{ color: 'black', background: 'linear-gradient(to right, #EFA541, #E74B06)', marginLeft:1 , padding:0.5}}               
                onClick={addProductToCart}
                > 
                 Kosárba
                </Button>
                </div>  
            </CardActions>
            
            <div className="mt-auto">
         
        </div>
                    
      </CardContent>

      
      </article>
    </Card>
  );
}
export default  ProductCard;