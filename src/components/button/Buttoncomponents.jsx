import React from 'react';
import Box from '@mui/material/Box';
import './buttoncomponents.css';

export const MyLittleButton = ({value, onClick}) => {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
        <div>
          <button value={value} onClick={onClick} className='littleButton' >
           {value}
          </button>
        </div>
      </Box>
    );
}

export const MyButtonsmall = ({value, onClick}) => {
return (
    <Box sx={{ '& button': { m: 1 } }}>
    	<div>
      		<button size='small' value={value} onClick={onClick} className= 'smallButton'>
     			{value}
      		</button>
    	</div>
  	</Box>
);
}

export const MyButtonmedium = ({value, onClick, disabled}) => {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
        <div>
          	<button value={value} onClick={onClick} className='mediumButton' disabled={disabled}>
           		{value}
          	</button>
        </div>
      </Box>
    );
}


export const MyButtonlarge = ({value, onClick}) => {
    return (
        <Box sx={{ '& button': { m: 1 } }}>
        	<div>
          		<button  className='largeButton' value={value} onClick={onClick}>
       			{value}
          		</button>
        	</div>
      	</Box>
    );
}