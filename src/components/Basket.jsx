
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate} from "react-router-dom";
import Typography from '@mui/material/Typography';


  const pages = [
    {
        page: 'Főoldal',
        url: '/home',
    },
    {
        page: 'Termékek',
        url: '/termekek'
    },
    {
        page: 'Elérhetőség',
        url: '/contact'
    },
  ];


const Basket = () => {
    const navigate = useNavigate();

    return (
        <Box sx={{ width: '100%' }}>
        <Stepper activeStep={1} alternativeLabel>
          {pages.map((label) => (
            <Step key={label.page}>
              <StepLabel>{label.page}</StepLabel>
              <Typography  sx={{ color: 'black'}} onClick={(e) => navigate(label.url)} >{label.page}</Typography>
            </Step>
          ))}
        </Stepper>
      </Box>
    )
}

export default Basket;