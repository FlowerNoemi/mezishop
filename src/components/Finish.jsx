import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { useNavigate} from "react-router-dom";
import   {UserContext  } from '../context/UserContext';
import { useContext } from 'react';

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
             <Box sx={{ width: '100%' }}>
                <Stepper activeStep={3} alternativeLabel>
              {steps.map((label) => (
              <Step key={label}>
                  <StepLabel>{label}</StepLabel>
              </Step>
              ))}
                </Stepper>
            </Box>
            <p>{vname}</p>
            <p>{kname}</p>
            <p>{szallitas}</p>
            <div>
            <Button onClick={Basket}>Vissza</Button>
            <Button> Megrendelés</Button>

             </div>
            <div className="flexGrow">
                <Link to="/home">Főoldal</Link>
            </div>
        </section>
    )
}

export default Finish;