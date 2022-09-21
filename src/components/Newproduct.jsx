import React, { useState, useEffect, useRef} from 'react';
import './newproduct.css';
import axios from '../api/axios';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const PRODUCT_URL = '/mezi_be/product/newproduct.php';

const NewProduct = () => {

    const errRef = useRef();
    const [termeknev, setTermeknev] = useState('');
    const [mennyiseg, setMennyiseg] = useState('');
    const [ar, setAr] = useState('');
    const [currency, setCurrency] = useState('active');
    const [selectedFile, setSelectedFile] = useState(null);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleFileSelect = (event) => {
        setSelectedFile(event.target.files[0])
      }

    
    const handleChangeList = (event) => {
        setCurrency(event.target.value);
    };

      const currencies = [
        {
          value: 'active',
          label: 'aktív',
        },
        {
          value: 'noactive',
          label: 'nem aktív',
        },
      ];

      const handleSubmit = async (e) => {
        e.preventDefault();
    
    
      try {
          const response = await axios.post(PRODUCT_URL,
               {termeknev:termeknev, mennyiseg:mennyiseg, ar:ar , status:currency, img:selectedFile} ,
              {
                  headers: { 'Content-Type': 'multipart/form-data'},
                 
              }
          );
          console.log(response?.data.code);
          console.log(response?.accessToken);
          console.log(JSON.stringify(response))
    
          if(response?.data.code === '1') {
          setSuccess(true);
          setTermeknev('');
          setMennyiseg('');
          setAr('');
          setCurrency('');
          setSelectedFile('');
        }
          else  {
            setSuccess(false);
            setErrMsg(response.data.message);
          }
    
      } catch (err) {
          if (!err?.response) {
              setErrMsg('A szerver nem válaszol!');
          } else if (err.response?.status === 409) {
              setErrMsg('Regisztrált email cím');
          } else {
              setErrMsg('Sikertelen regisztráció');
          }
          errRef.current.focus();
      }
    }
    



    return (
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
      
    >

      <div>
        <TextField
          id="standard-textarea"
          onChange={(e) => setTermeknev(e.target.value)}
          placeholder="Terméknév"
          multiline
          variant="standard"
        />

      </div>
      <div>
        <TextField
          id="standard-textarea"
          onChange={(e) => setMennyiseg(e.target.value)}
          placeholder="Mennyiség"
          multiline
          variant="standard"
        />

      </div>
      <div>
        <TextField
          id="standard-textarea"
          onChange={(e) => setAr(e.target.value)}
          placeholder="Ár"
          multiline
          variant="standard"
        />

      </div>
      <div>
        <TextField
          id="standard-select-currency-native"
          select
          value={currency}
          onChange={handleChangeList}
          SelectProps={{
            native: true,
          }}
          helperText="Állítsa be a termékstátuszt"
          variant="standard"
        >
          {currencies.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </div>
      <div>
        <input
          id="standard-textarea"
          placeholder="Terméknév"
          variant="standard"
          type='file'
          onChange={handleFileSelect}
        />
   
      </div>
      <div>
      <button className='regBtn'>Küldés</button>
      </div>
    </Box>
    )
}

export default NewProduct;