import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Container
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ toggleMode, mode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Create Profile', path: '/create' },
    { label: 'All Profiles', path: '/profiles' }
  ];

  const drawer = (
    <Box 
      onClick={handleDrawerToggle} 
      sx={{ 
        textAlign: 'center', 
        width: 250 
      }}
    >
      <Typography variant="h6" sx={{ my: 2 }}>
        Talent Profile Builder
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem 
            key={item.path} 
            onClick={() => navigate(item.path)}
            button
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="static" sx={{ background: '#50bfe6', color: '#fff', minHeight: 72, boxShadow: '0 4px 24px 0 rgba(80,191,230,0.10)' }}>
        <Container maxWidth="lg">
          <Toolbar sx={{ minHeight: 72 }}>
            {/* Mobile Menu Icon */}
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo */}
            <Typography 
              variant="h6" 
              component={Link} 
              to="/" 
              sx={{ 
                flexGrow: 1, 
                color: 'white', 
                textDecoration: 'none',
                fontWeight: 900,
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '0.05em',
                fontSize: 28
              }}
            >
              Talent Profile Builder
            </Typography>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  color="inherit"
                  onClick={() => navigate(item.path)}
                  sx={{ ml: 2, fontWeight: 700, fontSize: 18, borderRadius: 2, '&:hover': { background: '#274690', color: '#fff' } }}
                >
                  {item.label}
                </Button>
              ))}
              <IconButton color="inherit" onClick={toggleMode} sx={{ ml: 2 }}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}

export default Navbar;