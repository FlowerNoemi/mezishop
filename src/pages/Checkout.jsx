import './checkout.css';
import { useContext } from "react";
import { CartContext } from '../context/CartContext';
import CheckoutItem from '../components/checkout-item/Checkout-item'
import { useNavigate} from "react-router-dom";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const Checkout = () => {
    const { cartItems, cartTotal} = useContext(CartContext);
    const navigate = useNavigate();

    const Basket = () => {
        navigate('/basket');
    }
    const Shop =  () => {
        navigate('/termekek');
    }
    
    
    const steps = [
        'Kosár',
        'Szállítás, Fizetés, Számlázás',
        'Összesítő'
];

return (


    <div className='checkout-container'>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={1} alternativeLabel>
                    {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                    ))}
                </Stepper>
            </Box>
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
        <div>
            <Button onClick={Shop}>Vásárlás folytatása</Button>
            <Button onClick={Basket}>Tovább</Button>

        </div>
            
    </div>
);
};

export default Checkout;
