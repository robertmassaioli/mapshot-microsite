import React, { useEffect, useState } from 'react';
import { MapshotSaveView } from './MapshotSaveView';
import { MapshotSaves } from './data';

export const SaveLoader: React.FC = () => {
   const [saves, setSaves] = useState<MapshotSaves | undefined>(undefined);

   useEffect(() => {
     const load = async () => {
       const rawResult = await fetch(`${process.env.PUBLIC_URL}/mapshot/saves.json`);
       setSaves(await rawResult.json());
     };

     load();
   }, []);

   if (saves === undefined) {
     return <div>Loading saves...</div>;
   }

   return (
     <div>
       {Object.keys(saves).map(saveName => <MapshotSaveView key={saveName} saveName={saveName} mapshots={saves[saveName]} />)}
     </div>
   );
 }