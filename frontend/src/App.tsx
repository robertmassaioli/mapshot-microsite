import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

export type MapshotSaves = {
  [saveName: string]: Array<MapshotSave>;
};

export type MapshotSave = {
  savename: string;
  unique_id: string;
  ticks_played: number;
};

function App() {
  const [saves, setSaves] = useState<MapshotSaves | undefined>(undefined);

  useEffect(() => {
    const load = async () => {
      const rawResult = await fetch(`${process.env.PUBLIC_URL}/mapshot/saves.json`);
      setSaves(await rawResult.json());
    };

    load();
  }, []);

  return (
    <div className="App">
      <h1>Mapshot Map Directory</h1>
      <p>Welcome to the mapshot directory, browse any save you like and see all of the generated maps for that save as it progresses over time.</p>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
