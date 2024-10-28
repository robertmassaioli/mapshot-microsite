import React from "react";
import { MapshotMapData } from "./mapshot";
import { appMapViewLocation, ticksToTime, toMapLocation } from "./util";
import { useParams } from "react-router-dom";
import { isPresent } from "ts-is-present";
import { SaveLoadResult } from "./load-saves";
import styled from '@emotion/styled';
import { FormControl } from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from "react-router-dom";



export type MapViewFrameProps = {
   saveDir: string;
   mapshot: MapshotMapData;
};



export const MapViewFrame: React.FC<MapViewFrameProps> = ({saveDir, mapshot}) => {
   return (
      <iframe
         src={toMapLocation(saveDir, mapshot.unique_id)}
         width={"100%"}
         height={"100%"}
      />
   )
}

export type MapViewProps = {
   saveLoadResult: SaveLoadResult;
};

const MapViewContainer = styled.div`
   height: calc(100vh - ${props => (props.theme as any).spacing(9)});
`;

export type MapViewRouteProps = {
   saveDir: string;
   uniqueId: string;
}

export const MapView: React.FC<MapViewProps> = ({saveLoadResult}) => {
   let { saveDir, uniqueId } = useParams<MapViewRouteProps>();
   const navigate = useNavigate();

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

   if (!isPresent(saveDir) || !isPresent(uniqueId)) {
      return (
         <div>Invalid path params. Missing data.</div>
      );
   }

   const saveDirShots = saveData[saveDir];
   if (!isPresent(saveDirShots)) {
      return (
         <div>Could not find the save directory at: {saveDir}</div>
      );
   }

   const mapshot = saveDirShots.find(m => m.unique_id === uniqueId);
   if (!isPresent(mapshot)) {
      return (
         <div>Could not find the mapshot with unique id: {uniqueId}</div>
      );
   }

   const loadedSaveDir = saveDir;
   function handleChange(event: SelectChangeEvent) {
      navigate(appMapViewLocation(loadedSaveDir, event.target.value));
   }

   return (
      <MapViewContainer>
         <FormControl fullWidth>
         <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            onChange={handleChange}
            defaultValue={mapshot.unique_id}
         >
            {saveDirShots.sort((a, b) => b.ticks_played - a.ticks_played).map(m => (
               <MenuItem value={m.unique_id}>{ticksToTime(m.ticks_played)}</MenuItem>
            ))}

         </Select>
         </FormControl>
         <MapViewFrame saveDir={saveDir} mapshot={mapshot} />
      </MapViewContainer>
   );
}