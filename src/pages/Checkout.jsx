import './checkout.css';
import { useContext } from "react";
import { CartContext } from '../context/CartContext';
import CheckoutItem from '../components/checkout-item/Checkout-item'
import { useNavigate} from "react-router-dom";
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { MyLittleButton } from '../components/button/Buttoncomponents';

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
            <Box sx={{ width: '100%', mx:'auto', p:2}}>
                    <Stepper activeStep={1} alternativeLabel sx={{ 
                    '& 	.MuiStepIcon-root.Mui-completed': {
                    color: '#E18D00',
                    }, 
                    '& 	.MuiStepIcon-root': {
                        color: '#E18D00',
                    },
                    }} >
                    {steps.map((label) => (
                        <Step key={label}   >
                            <StepLabel >{label} </StepLabel>
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
            <MyLittleButton onClick={Shop} value='Vásárlás folytatása'></MyLittleButton>
            
        </div>
            <div>
            <MyLittleButton onClick={Basket} value='Tovább'></MyLittleButton>

        </div>
            
    </div>
);
};

export default Checkout;
