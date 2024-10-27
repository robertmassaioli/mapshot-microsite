import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { MapshotSaveView } from './MapshotSaveView';
import { MapshotSaves } from './data';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

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
      <>
         {Object.keys(saves).map(saveDir => (
            <Grid key={saveDir} size={3}>
               <Item><MapshotSaveView saveDir={saveDir} mapshots={saves[saveDir]} /></Item>
            </Grid>
         ))}
      </>
   );
 }