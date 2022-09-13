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
import AuthContext from "../context/AuthProvider";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useNavigate} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import LoginIcon from '@mui/icons-material/Login';
import Tooltip from '@mui/material/Tooltip';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import Badge from '@mui/material/Badge';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

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


const Header = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
    
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

 
  const level = auth?.roles?.find(role => role.includes('2000'))

  const logout = async () => {

    setAuth({});
    navigate('/home');
}
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = async () => {
    navigate('/login');
}

const registration = async () => {
    navigate('/register');
}

const profil = async () => {
    navigate('/profile');
}

const basket = async () => {
  navigate('/basket');
}



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
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 600,
              letterSpacing: '.1rem',
              textDecoration: 'none',
              marginLeft:2,
            }}
            onClick={() => navigate('/home')} 
            
          >
            MéziShop
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }} >
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
             
            >
              <MenuIcon  sx={{color:'black'}} />
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
                 component={Link}
                >
                  <Typography  sx={{ color: 'black'}} onClick={(e) => navigate(pag.url)} >{pag.page}</Typography>
                </MenuItem>
              ))}


    


            </Menu>
          </Box>





          <Typography
            className="brand"
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 1,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              textDecoration: 'none',
              marginRight:0,
              fontSize:'inherit'
            }}
            onClick={() => navigate('/home')}
          >
            MéziShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} className='brandBox'>
            {pages.map((pag) => (
              <Button
                component={Link}
                className='brandButton'
                key={pag.url}
                onClick={() => navigate(pag.url)} 
                sx={{ my: 1, color: 'black', display: 'block' }}
                
              >
                {pag.page}
              </Button>

            ))}
          </Box>
          
            
              {level ? (
            <div>
                <IconButton size="small" aria-label="show 4 new mails" 
                sx={{ color: 'black', background: 'linear-gradient(to right, #EFA541, #E74B06)', padding:0.5, marginRight:1}}
                
                onClick={basket} >
              
                 <Badge badgeContent={3}  color='primary'  >
                  
                    <ShoppingBasketIcon/>
                    </Badge>
                    </IconButton>
                                       
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu} 
                  sx={{ color: 'black', background: 'linear-gradient(to right, #EFA541, #E74B06)', padding:0.5}}
                >
                  <AccountCircle/>
                </IconButton>
                
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              > 
               
                <MenuItem onClick={handleClose}>
                <Link onClick={profil} sx={{color:'black' , textDecoration:'none', cursor:'pointer'}}>Profilom</Link>
                </MenuItem>
                <MenuItem onClick={handleClose}> 
                <Link onClick={logout} sx={{color:'black' , textDecoration:'none', cursor:'pointer'}}>Kijelentkezés</Link>
                </MenuItem>

              </Menu>
              </div>
              ) : (
            <div className='iconBox'>
               
              
            
                <IconButton
                size="small"
                onClick={registration} 
                sx={{ color: 'black', background: 'linear-gradient(to right, #EFA541, #E74B06)', marginLeft:1 , padding:0.5}} 
            >
                <Tooltip title="Regisztráció">
            <HowToRegIcon/>
           
            </Tooltip>
          </IconButton>
          <IconButton
              size="small"
                onClick={login} 
                sx={{ color: 'black', background: 'linear-gradient(to right, #EFA541, #E74B06)', marginLeft:1, padding:0.5}}
              >
                <Tooltip 
                title="Bejelentkezés">
                <LoginIcon />
                </Tooltip>
              </IconButton>
          </div>
                
              )}
          
        </Toolbar>
      </Container>
    </AppBar>

   
  );
};
export default Header;
