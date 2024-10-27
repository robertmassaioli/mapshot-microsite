import React from "react";
import { SaveLoader } from "./SaveLoader";
import Box from '@mui/material/Box';
import styled from '@emotion/styled';

import Grid from '@mui/material/Grid2';

const AppContainer = styled.div`
   padding-left: ${props => (props.theme as any).spacing(3)};
   padding-right: ${props => (props.theme as any).spacing(3)};
 `;

export const SaveListing: React.FC = () => {
   return (
      <AppContainer>
         <h1>Mapshot Map Directory</h1>
         <p>Welcome to the mapshot directory, browse any save you like and see all of the generated maps for that save as it progresses over time.</p>
         <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
               <SaveLoader />
            </Grid>
         </Box>
      </AppContainer>
   );
}