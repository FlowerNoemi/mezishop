import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate} from "react-router-dom";
import   {UserContext  } from '../context/UserContext';
import { useContext } from 'react';
import {  MyLittleButton } from "./button/Buttoncomponents";

const steps = [
    'Kosár',
    'Szállítás, Fizetés, Számlázás',
    'Összesítő'
];



const Finish = () => {
    const {vname} = useContext(UserContext);
    const {kname, szallitas} = useContext(UserContext);

    const navigate = useNavigate();

    const Basket = () => {
        navigate('/basket');
    }
    return (
        <section>
                <Box sx={{ width: '100%', mx:'auto', p:2}}>
                        <Stepper activeStep={3} alternativeLabel sx={{ 
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
            <p>{vname}</p>
            <p>{kname}</p>
            <p>{szallitas}</p>
            <div>
            <MyLittleButton onClick={Basket} value='Vissza'></MyLittleButton>
            <MyLittleButton value='Megrendelés'> </MyLittleButton>

             </div>
            <div className="flexGrow">
                <Link to="/home">Főoldal</Link>
            </div>
        </section>
    )
}

export default Finish;