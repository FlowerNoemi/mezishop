import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Bee from "../assets/bee.png";
import "./header.css";
import Link from "@mui/material/Link";
import { MyButtonsmall } from "../components/button/Buttoncomponents";
import { CartContext } from "../context/CartContext";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useContext } from "react";
import LoginIcon from "@mui/icons-material/Login";
import Tooltip from "@mui/material/Tooltip";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import CartIcon from "./button/Cart-iconcomponents";
import { UserContext } from "../context/UserContext";
import AuthContext from "../context/AuthProvider";

const pages = [
  {
    page: "Főoldal",
    url: "/home",
  },
  {
    page: "Termékek",
    url: "/termekek",
  },
  {
    page: "Elérhetőség",
    url: "/contact",
  },
];

const Header = () => {
  const { auth } = useAuth();
  const { setAuth } = useContext(AuthContext);
  const { setUserData } = useContext(UserContext);
  const { clearFromCart } = useContext(CartContext);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const level = auth?.roles?.find((role) => role.includes("2000"));

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const login = () => {
    navigate("/login");
  };

  const registration = () => {
    navigate("/register");
  };

  const profil = () => {
    navigate("/profile");
  };

  const logout = async () => {
    setAuth({});
    setUserData({});
    clearFromCart();
    navigate("/home");
  };

  return (
    <AppBar position="sticky" className="AppBar">
      <Container maxWidth="xxl" className="toolBar">
        {" "}
        <img
          src={Bee}
          alt="MéziShop"
          title="MéziShop"
          className="BrandLogo"
          sx={{ display: { xs: "none", md: "flex" } }}
        />
      </Container>
      <Container maxWidth="xxl" className="toolBarW">
        <Toolbar disableGutters className="toolbar">
          <Typography
            className="brand"
            variant="h6"
            noWrap
            component="a"
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 600,
              letterSpacing: ".1rem",
              textDecoration: "none",
              marginLeft: 2,
              color: "#7F4E18",
            }}
            onClick={() => navigate("/home")}
          >
            MéziShop
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: "black" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((pag) => (
                <MenuItem
                  key={pag.page}
                  onClick={handleCloseNavMenu}
                  sx={{ textAlign: "center" }}
                  component={Link}
                >
                  <Typography
                    sx={{
                      color: "black",
                      fontFamily: "Arima Madurai, sans-serif",
                    }}
                    onClick={(e) => navigate(pag.url)}
                  >
                    {pag.page}
                  </Typography>
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
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              textDecoration: "none",
              marginRight: 0,
              fontSize: "inherit",
            }}
            onClick={() => navigate("/home")}
          >
            MéziShop
          </Typography>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            className="brandBox"
          >
            {pages.map((pag) => (
              <MyButtonsmall
                key={pag.url}
                onClick={() => navigate(pag.url)}
                value={pag.page}
                sx={{
                  my: 1,
                  display: "block",
                  fontFamily: "Arima Madurai,  sans-serif",
                }}
              >
                {pag.page}
              </MyButtonsmall>
            ))}
          </Box>

          {level ? (
            <div>
              <CartIcon />
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{
                  color: "black",
                  background:
                    "linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)",
                  padding: 0.5,
                }}
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link
                    onClick={profil}
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Profilom
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleClose}>
                  <Link
                    onClick={logout}
                    sx={{
                      color: "black",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    Kijelentkezés
                  </Link>
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="iconBox">
              <IconButton
                size="small"
                onClick={registration}
                sx={{
                  color: "black",
                  background:
                    "linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)",
                  marginLeft: 1,
                  padding: 0.5,
                }}
              >
                <Tooltip title="Regisztráció">
                  <HowToRegIcon />
                </Tooltip>
              </IconButton>
              <IconButton
                size="small"
                onClick={login}
                sx={{
                  color: "black",
                  background:
                    "linear-gradient(45deg, #E18D00 0%, #E8C07A  51%, #E18D00  100%)",
                  marginLeft: 1,
                  padding: 0.5,
                }}
              >
                <Tooltip title="Bejelentkezés">
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
