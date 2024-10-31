import React from "react";
import { SaveLoader } from "./SaveLoader";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import { SaveLoadResult } from "./load-saves";
import { AppContainer } from "./AppContainer";

export type SaveListingProps = {
   saveLoadResult: SaveLoadResult;
}

export const SaveListing: React.FC<SaveListingProps> = ({saveLoadResult}) => {
   if (saveLoadResult.type === 'in-progress') {
      return (
         <div>Loading saves...</div>
      );
   }

   if (saveLoadResult.type === 'error') {
      return (
         <div>Failed to load the saves...</div>
      );
   }

   const { saveData } = saveLoadResult;

   return (
      <AppContainer>
         <h1>Mapshot Map Directory</h1>
         <p>Welcome to the mapshot directory, browse any save you like and see all of the generated maps for that save as it progresses over time.</p>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
               <SaveLoader saveData={saveData} />
            </Grid>
         </Box>
      </AppContainer>
   );
}