import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import { SaveListing } from './SaveListing';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<SaveListing key="save-listing" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
