import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MapshotSave } from './data';
import { SaveLoader } from './SaveLoader';
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Header from './Header';

const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <div className="App">
        <h1>Mapshot Map Directory</h1>
        <p>Welcome to the mapshot directory, browse any save you like and see all of the generated maps for that save as it progresses over time.</p>
        <SaveLoader />
      </div>
    </ThemeProvider>
  );
}

export default App;
