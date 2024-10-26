import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MapshotSave } from './data';
import { SaveLoader } from './SaveLoader';

function App() {

  return (
    <div className="App">
      <h1>Mapshot Map Directory</h1>
      <p>Welcome to the mapshot directory, browse any save you like and see all of the generated maps for that save as it progresses over time.</p>
      <SaveLoader />
    </div>
  );
}

export default App;
