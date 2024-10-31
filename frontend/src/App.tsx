import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import { SaveListing } from './SaveListing';
import { MapView } from './MapView';
import { useSaves } from './load-saves';

import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';
import { LinkProps } from '@mui/material/Link';
import { About } from './About';
import { Contact } from './Contact';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
      },
    },
  }
});

function App() {
  const saveLoadResult = useSaves();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SaveListing key="save-listing" saveLoadResult={saveLoadResult} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/app/save/:saveDir/mapshot/:uniqueId/" element={<MapView saveLoadResult={saveLoadResult} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
