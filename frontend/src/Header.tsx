import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { isPresent } from 'ts-is-present';

export type HeaderProps = {
   subDirectory?: string;
}

export const Header: React.FC<HeaderProps> = ({ subDirectory }) => {
   let headerTitle = "Factorio Mapshot Maps";
   if (isPresent(subDirectory)) {
      headerTitle = `${subDirectory} - ${headerTitle}` ;
   }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {headerTitle}
        </Typography>
        <Button color="inherit" href="/">Home</Button>
        <Button color="inherit" href="/about">About</Button>
        <Button color="inherit" href="/contact">Contact</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;