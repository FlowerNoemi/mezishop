import './checkout.css';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import CheckoutItem from './checkout-item/Checkout-item'
import { useNavigate} from 'react-router-dom';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { MyLittleButton , MyButtonmedium} from './button/Buttoncomponents';
import loginlogo from '../assets/logo1.webp';


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
    <>
        <div>
            {!cartTotal ? (
                <div className='basketEmpty'>
                    <h1>A kosár üres!</h1>
                    <img src={loginlogo} loading='lazy' alt='Mézishop logó' title='Mézishop logó' className='imgLogo' />
                    <MyButtonmedium onClick={Shop} value='Irány a shop'></MyButtonmedium>
                </div>
            ): (
                <div>
                    <Box sx={{ width: '100%', mx:'auto', p:5}}>
                            <Stepper activeStep={1} alternativeLabel sx={{ 
                            '& 	.MuiStepIcon-root.Mui-completed': {
                                color: '#E18D00',
                            }, 
                            '& 	.MuiStepIcon-root': {
                                color: '#E18D00',
                            },
                            '& 	.MuiStepIcon-root.Mui-active': {
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
                    <div className='checkout-container'>   
                        <div className='checkout-header'>
                            <div className='header-block'>
                                <span>Termék</span>
                            </div>
                            <div className='header-block'>
                                <span>Megnevezés</span>
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
            </div>)}
        </div>
    </>
    );
};

export default Checkout;
