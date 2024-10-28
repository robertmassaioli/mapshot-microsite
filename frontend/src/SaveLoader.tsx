import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { MapshotSaveCard } from './MapshotSaveCard';
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

export type SaveLoaderProps = {
   saveData: MapshotSaves;
}

export const SaveLoader: React.FC<SaveLoaderProps> = ({saveData}) => {
   if (saveData === undefined) {
     return <div>Loading save data...</div>;
   }

   return (
      <>
         {Object.keys(saveData).map(saveDir => (
            <Grid key={saveDir} size={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 2 }}>
               <Item><MapshotSaveCard saveDir={saveDir} mapshots={saveData[saveDir]} /></Item>
            </Grid>
         ))}
      </>
   );
 }