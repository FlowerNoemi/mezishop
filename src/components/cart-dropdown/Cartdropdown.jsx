import { Button } from '@mui/material';
import CartItem from '../cart-item/CartItem'
import { useContext } from 'react';
import {CartContext} from '../../context/CartContext';

import './cartdropdown.css';

const CartDropdown = () => {
  const { cartItems } = useContext(CartContext);

  return (
    <div className='cart-dropdown-container'>
      <div className='cart-items'>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} cartItem={cartItem} />
          ))
        ) : (
          <span className='empty-message'>Üres a kosár!</span>
        )}
      </div>
      <Button>Vásárlás</Button>
    </div>
  );
};

export default CartDropdown;