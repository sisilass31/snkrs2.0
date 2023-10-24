import React, { useState, useEffect } from 'react';
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
import { Link } from 'react-router-dom';

const pages = ['Home', 'Register', 'Login', 'Profile', 'Logout'];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      setUserToken(tokenFromLocalStorage);
    }
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUserToken(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SNKRS
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
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
              {pages.map((page) => {
                if (page === 'Logout' && userToken) {
                  return (
                    <MenuItem key={page} onClick={() => { handleLogout(); handleCloseNavMenu(); }}>
                      {/* //Changer la redirection apres un logout  */}
                      <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page}
                      </Link>
                    </MenuItem>
                  );
                }
                if ((page === 'Register' || page === 'Login') && !userToken) {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography component={Link} to={"/" + page} textAlign="center">
                        {page}
                      </Typography>
                    </MenuItem>
                );
                }
                if (page !== 'Register' && page !== 'Login' && (userToken || page === 'Profile')) {
                  return (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography component={Link} to={"/" + page} textAlign="center">
                        {page}
                      </Typography>
                    </MenuItem>
                  );
                }
                return null;
              })}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SNKRS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              if ((page === 'Register' || page === 'Login') && !userToken) {
                return (
                  <Button
                    key={page}
                    component={Link}
                    to={"/" + page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                );
              }
              if (page !== 'Register' && page !== 'Login' && (userToken || page === 'Profile')) {
                return (
                  <Button
                    key={page}
                    component={Link}
                    to={"/" + page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                );
              }
              return null;
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;