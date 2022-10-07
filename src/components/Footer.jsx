import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';


const  Footer = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: 100 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >

      </BottomNavigation>
    </Box>
  );
}

export default Footer;