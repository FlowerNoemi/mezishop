import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Bee from '../assets/bee.png';
import './header.css';
import Link from '@mui/material/Link';





const pages = [
    {
        page: 'Főoldal',
        url: '/',
    },
    {
        page: 'Termékek',
        url: '/pages/Login'
    },
    {
        page: 'Elérhetőség',
        url: '/pages/Register'
    },
  ];

  const profile = [
    {
        page: 'Bejelentkezés',
        url: '/pages/Login',
    },
    {
        page: 'Regisztráció',
        url: '/pages/Register',
    },
  ];



const Header = () => {
    
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 




  return (
    
    <AppBar position="static" className='AppBar' >
        <Container maxWidth="xxl" className='toolBar'> <img src={Bee} alt='MéziShop' title='MéziShop'className='BrandLogo' sx={{ display: { xs: 'none', md: 'flex'}   }}/>
        </Container>
      <Container maxWidth="xxl" className='toolBarW'>
      
        <Toolbar disableGutters className='toolbar' >
        
          <Typography
            className="brand"
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              textDecoration: 'none',
              marginLeft:2,
            }}
            
          >
            MéziShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((pag) => (
                <MenuItem key={pag.page} onClick={handleCloseNavMenu} sx={{ textAlign: 'center' , }}
                href={pag.url} component={Link}
                >
                  <Typography  sx={{ color: 'black'}} >{pag.page}</Typography>
                </MenuItem>
              ))}
                {profile.map((prof) => (
                <MenuItem key={prof.page} onClick={handleCloseNavMenu} sx={{ textAlign: 'center' , }}
                href={prof.url} component={Link}
                >
                  <Typography  sx={{ color: 'black'}} >{prof.page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>





          <Typography
            className="brand"
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.2rem',
              textDecoration: 'none',
            }}
           
            
          >
            MéziShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className='brandBox'>
            {pages.map((pag) => (
              <Button
                component={Link}
                className='brandButton'
                key={pag.url}
                href={pag.url}
                onClick={handleCloseNavMenu}
                sx={{ my: 1, color: 'black', display: 'block' }}
                
              >
                {pag.page}
              </Button>

            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

   
  );
};
export default Header;
