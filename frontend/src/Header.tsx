import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Factorio Mapshot Maps
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/about">About</Button>
        <Button color="inherit" href="/contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;