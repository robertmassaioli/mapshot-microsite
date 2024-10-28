import { useEffect, useState } from "react";
import { MapshotSaves } from "./data";

export type SaveLoadSuccess = {
  type: 'success';
  saveData: MapshotSaves;
};

export type SaveLoadError = {
  type: 'error';
};

export type SaveLoadInProgress = {
  type: 'in-progress'
};

export type SaveLoadResult = SaveLoadSuccess | SaveLoadError | SaveLoadInProgress;

export function useSaves(): SaveLoadResult {
  const [saveLoadResult, setSaveLoadResult] = useState<SaveLoadResult>({ type: 'in-progress' });

   useEffect(() => {
     const load = async () => {
      try {
        const rawResult = await fetch(`${process.env.PUBLIC_URL}/mapshot/saves.json`);
        setSaveLoadResult({
          type: 'success',
          saveData: await rawResult.json()
        });
      } catch (e) {
        setSaveLoadResult({
          type: 'error'
        });
      }
     };

     load();
   }, []);

   return saveLoadResult;
}