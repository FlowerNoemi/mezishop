import './checkout.css';
import { useContext } from "react";
import { CartContext } from '../context/CartContext';
import CheckoutItem from '../components/checkout-item/Checkout-item'
 
const Checkout = () => {
    const { cartItems, cartTotal} = useContext(CartContext);

return (
    <div className='checkout-container'>
        <div className='checkout-header'>
            <div className='header-block'>
                <span>Termék</span>
            </div>
            <div className='header-block'>
            <span>Leírás</span>
            </div>
            <div className='header-block'>
            <span>Mennyiség</span>
            </div>
            <div className='header-block'>
            <span>Ár</span>
            </div>
            <div className='header-block'>
            <span>Törlés</span>
            </div>
        </div>

            {cartItems.map((cartItem) => 
               
                   <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            )}
           <span className='total'>Összesen: {cartTotal} Ft </span> 
    
    </div>
);
};

export default Checkout;
