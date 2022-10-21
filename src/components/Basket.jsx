
import React, { useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button'
import useAuth from '../hooks/useAuth';
import {UserContext} from '../context/UserContext';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import './basket.css';
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import { useContext } from 'react';
import {MyinputField}  from './input/Myinput';
import {MyinputFieldArea}  from './input/Myinput';
import { MyLittleButton } from './button/Buttoncomponents';

const steps = [
  'Kosár',
  'Szállítás, Fizetés, Számlázás',
  'Összesítő'
];


const Basket = () => {
    const navigate = useNavigate();
    const { auth } = useAuth();
    const {
        vname, 
        setVname,
        vname2,
        setVname2,  
        kname, 
        setKname, 
        kname2,
        setKname2,
        iranyito,
        setiranyito,
        iranyito2,
        setiranyito2,
        varos,
        setVaros,
        varos2,
        setVaros2,
        cim,
        setCim,
        cim2,
        setCim2,
        telefon,
        setTelefon,
        telefon2,
        setTelefon2,
        comment,
        setComment,
        comment2,
        setComment2,
        fizetes,
        setFizetes,
        adoszam,
        setAdoszam,
        EUadoszam,
        setEUadoszam,
        szallitas,
        setSzallitas,
        adozo,
        setAdozo
    
        } = useContext(UserContext);
    const [email] = useState(auth.email);
    const [checkbox, setCheckBox] = useState(true);
    
    const Back = () => {
      navigate('/checkout');
    }
    const Finish = () => {
        
    navigate('/finish');
    }

    const chek = () => {
    if(checkbox) {
        setCheckBox(false);
        console.log(checkbox);
    } else {
        setCheckBox(true);
        console.log(checkbox);
    }
    }

    

return (
            <div>
                    <Box sx={{ width: '100%', mx:'auto', p:2}}>
                        <Stepper activeStep={2} alternativeLabel sx={{ 
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
                <>
                <CssBaseline />
                <Container maxWidth='xl'
                className='container'>
                    <Box
                        component='form'
                        className='boxbasket'
                        autoComplete='off'
                        sx={{mx:'auto', p:1
                        }}>
                        <div>
                            <MyinputField
                            value={email}
                            label='E-mail cím'
                            variant='standard'
                            />
                        </div>
                        <Grid container rowSpacing={2} columnSpacing={2} columns={{ xs: 1, sm: 6, md: 12 }} >
                            <Grid item xs={6}>
                                <FormControl >
                                    <FormLabel id='demo-radio-buttons-group-label' >Szállítási mód </FormLabel>
                                        <RadioGroup
                                        aria-labelledby='demo-radio-buttons-group-label'
                                        defaultValue='HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)'
                                        
                                        name='radio-buttons-group'
                                        
                                        >
                                            <FormControlLabel value={true} control={<Radio  size='small'  />} label='HÁZHOZSZÁLLÍTÁS GLS FUTÁRSZOLGÁLATTAL (+1600FT utánvét, +1200 FT előre utalás esetén)'  />
                                            <FormControlLabel value='GLS Csomagpont' control={<Radio  size='small' />} label='GLS CSOMAGPONT ( +1200 FT )' />
                                        </RadioGroup>
                            
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl>
                                
                                    <FormLabel id='demo-radio-buttons-group-label'>Fizetési mód</FormLabel>
                                        <RadioGroup
                                        aria-labelledby='demo-radio-buttons-group-label'
                                        defaultValue='utanvétel'
                                        name='radio-buttons-group'
                                        >
                                            <FormControlLabel value='utanvétel' control={<Radio  size='small'/>} label='UTÁNVÉTEL' />
                                            <FormControlLabel value='utalás' control={<Radio  size='small'/>} label='Előre utalás' />
                                        </RadioGroup>
                            
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container rowSpacing={1} columnSpacing={2} columns={{ xs: 1, sm: 6, md: 12 }} >
                            <Grid item xs={6}>
                                <FormLabel id='demo-radio-buttons-group-label'>Szállítási adatok</FormLabel>
                                    <div>
                                        <MyinputField
                                            label='Vezetéknév' 
                                            value={vname}
                                            onChange={(e) => setVname(e.target.value)}
                                        />
                                        <MyinputField
                                            label='Keresztnév' 
                                            value={kname}
                                            onChange={(e) => setKname(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <MyinputField
                                                label='Irányítószám' 
                                                value={iranyito}
                                                onChange={(e) => setiranyito(e.target.value)}
                                        />
                                        <MyinputField
                                            label='Város' 
                                            value={varos}
                                            onChange={(e) => setVaros(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <MyinputField
                                            label='Cím' 
                                            value={cim}
                                            onChange={(e) => setCim(e.target.value)}
                                        />
                                        <MyinputField
                                            label='Telefonszám' 
                                            value={telefon}
                                            onChange={(e) => setTelefon(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <MyinputFieldArea
                                            label='Megjegyzés' 
                                            value={comment}
                                            onChange={(e) => setComment(e.target.value)}
                                        />
                                    </div>
                            </Grid>
                            <Grid item xs={6}>
                                <FormLabel id='demo-radio-buttons-group-label'>Számlázási adatok</FormLabel>
                                    <FormControlLabel control={<Checkbox onClick={chek}/>} label='Számálázási adatok megegyeznek a szállítási adatokkal' />
                                    <div>
                                        <MyinputField
                                            label='Vezetéknév' 
                                            value={!checkbox ? vname : vname2}
                                            onChange={(e) => setVname2(e.target.value)}
                                        />
                                        <MyinputField
                                            label='Keresztnév' 
                                            value={!checkbox ? kname : kname2}
                                            onChange={(e) => setKname2(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <MyinputField
                                            label='Irányítószám' 
                                            value={!checkbox ? iranyito : iranyito2}
                                            onChange={(e) => setiranyito2(e.target.value)}
                                        />
                                        <MyinputField
                                            label='Város' 
                                            value={!checkbox ? varos : varos2}
                                            onChange={(e) => setVaros2(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <MyinputField
                                            label='Cím' 
                                            value={!checkbox ? cim : cim2}
                                            onChange={(e) => setCim2(e.target.value)}
                                        />
                                        <MyinputField
                                            label='Telefonszám' 
                                            value={!checkbox ? telefon : telefon2}
                                            onChange={(e) => setTelefon2(e.target.value)}
                                        />
                                    </div>
                                    <FormControl >
                                        <RadioGroup
                                            aria-labelledby='demo-radio-buttons-group-label'
                                            defaultValue='Magánszemély'
                                            name='radio-buttons-group'
                                        >
                                            <FormControlLabel value='Magánszemély' control={<Radio size='small'/>} label='Magánszemély'/>
                                            <FormControlLabel value='Jogi személy' control={<Radio size='small'/>} label='Jogi személy' />
                                        </RadioGroup>
                                    </FormControl>
                                    <div>
                                        <MyinputField
                                            label='Adószám' 
                                            value={adoszam}
                                            onChange={(e) => setAdoszam(e.target.value)}
                                            />
                                        <MyinputField
                                                label='EU adószám' 
                                                value={EUadoszam}
                                                onChange={(e) => setAdoszam(e.target.value)}
                                        />
                                    </div>
                                        <div>
                                        <MyinputFieldArea
                                                label='Megjegyzés' 
                                                value={comment2}
                                                onChange={(e) => setComment2(e.target.value)}
                                        />
                                    </div>
                            </Grid>
                        </Grid>
                    </Box>     
                        <div>
                                <MyLittleButton onClick={Back} value='Vissza'> </MyLittleButton>
                                <MyLittleButton onClick={Finish} value='Tovább'> </MyLittleButton>
                        </div>
            </Container>
            </>
        </div>
    )
}

export default Basket;