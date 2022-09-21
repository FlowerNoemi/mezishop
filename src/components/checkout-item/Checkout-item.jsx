import './checkout-item.css';
import { useContext } from 'react';
import { CartContext } from '../../context/CartContext';


const CheckoutItem = ({cartItem}) => {
    const {termeknev, img, ar, quantity} = cartItem;
    const { clearItemFromCart, addItemToCart, removeItemToCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemToHandler = () => addItemToCart(cartItem);
    const removeItemToHandler = () => removeItemToCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={img} alt={`${termeknev}`}/>
            </div>
            <span className='name'>{termeknev}</span>
            <span className='quantity' >
                <div className='arrow' onClick={removeItemToHandler}>
                    &#10094;
                </div>
               <span className='value'> {quantity}</span>
                <div className='arrow' onClick={addItemToHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{ar} Ft</span>
            <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
        </div>
       
    )

}

export default CheckoutItem;