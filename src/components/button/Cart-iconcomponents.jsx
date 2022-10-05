import IconButton from '@mui/material/IconButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Badge from '@mui/material/Badge';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';


const CartIcon = () => {
    const {isCartOpen, setIsCartOpen, cartCount} = useContext(CartContext);

    const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

return (
        <IconButton 
            size='small' 
            aria-label='show 4 new mails' 
            sx={{ color: 'black', background: 'linear-gradient(to right, #E8C07A, #E18D00,#CC7F06,#B86104 )', padding:0.5, marginRight:1}} 
            onClick = {toggleIsCartOpen}>
            <Badge badgeContent={cartCount} color='primary'>
                <ShoppingBasketIcon/>
            </Badge>
        </IconButton>                    
    )
}

export default CartIcon;