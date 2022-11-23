import IconButton from '@mui/material/IconButton';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import Badge from '@mui/material/Badge';
import { CartContext } from '../../context/CartContext';
import { useContext } from 'react';
import { useNavigate} from 'react-router-dom';

const CartIcon = () => {
    const {cartCount} = useContext(CartContext);
    const navigate = useNavigate();
   
const Back = () => {
    navigate('/checkout');

}
return (
        <IconButton 
            size='small' 
            aria-label='show 4 new mails' 
            sx={{ color: 'black', background: 'linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)', padding:0.5, marginRight:1}} 
            onClick={Back}>
            <Badge badgeContent={cartCount}  sx={{ 
                '& 	.MuiBadge-badge': {
                color: '#fafafa',
                background: 'black'
                }}}>
                <ShoppingBasketIcon/>
            </Badge>
        </IconButton>                    
    )
}

export default CartIcon;