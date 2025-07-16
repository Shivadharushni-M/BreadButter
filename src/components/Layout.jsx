import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box 
} from '@mui/material';
import { Link } from 'react-router-dom';

function Layout({ children }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Navbar is now rendered in App.jsx */}
      <Container component="main" sx={{ flexGrow: 1, mt: 4 }}>
        {children}
      </Container>
      
      <Box 
        component="footer" 
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto', 
          backgroundColor: 'transparent' 
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body2" color="text.secondary" align="center">
            © {new Date().getFullYear()} Smart Talent Profile Builder
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

export default Layout;