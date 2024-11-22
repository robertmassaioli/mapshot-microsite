import React from "react";
import { SaveLoadResult } from "./load-saves";
import { Navigate, useParams } from "react-router-dom";
import { isPresent } from "ts-is-present";

export type RedirectToLatestMapProps = {
   saveLoadResult: SaveLoadResult;
}

type RedirectToLatestMapRouteProps = {
   saveDir: string;
}

function getMaximumElement<A>(elements: Array<A>, extract: (a: A) => number): A | undefined {
   if (elements.length === 0) {
      return undefined;
   }

   let maxElement = elements[0];
   let maxValue = extract(maxElement);

   for (let i = 1; i < elements.length; i++) {
      const currentValue = extract(elements[i]);
      if (currentValue > maxValue) {
         maxValue = currentValue;
         maxElement = elements[i];
      }
   }

   return maxElement;
}

export const RedirectToLatestMap: React.FC<RedirectToLatestMapProps> = ({ saveLoadResult }) => {
   let { saveDir } = useParams<RedirectToLatestMapRouteProps>();

   if (!isPresent(saveDir)) {
      return (
         <div>Error: No save dir provided in route.</div>
      );
   }

   if (saveLoadResult.type === 'error') {
      return (
         <div>Could not load the saves. Please refresh the page.</div>
      );
   }

   if (saveLoadResult.type === 'in-progress') {
      return (
         <div>Loading...</div>
      );
   }

   const { saveData } = saveLoadResult;

   const saveDirShots = saveData[saveDir];
   if (!isPresent(saveDirShots)) {
      return (
         <div>Could not find the save directory at: {saveDir}</div>
      );
   }

   const latestSave = getMaximumElement(saveDirShots, saveDirShot => saveDirShot.ticks_played);

   if (!isPresent(latestSave)) {
      return (
         <div>Error: found the save but there was no "latest" save in the directory.</div>
      )
   }

   return (
      <Navigate to={`/app/save/${saveDir}/mapshot/${latestSave.unique_id}/`} replace />
   );
}