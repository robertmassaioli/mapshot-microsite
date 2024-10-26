import React from "react";
import { MapshotSave } from "./data";

export type MapshotSaveViewProps = {
   saveName: string;
   mapshots: Array<MapshotSave>;
 };

 function ticksToHours(ticks: number): number {
   return ticks / 60 / 60 / 60;
 }

 function ticksToTime(ticks: number): string {
   const ticksPerSecond = 60;
   const secondsPerMinute = 60;
   const minutesPerHour = 60;

   const totalSeconds = Math.floor(ticks / ticksPerSecond);
   const hours = Math.floor(totalSeconds / (secondsPerMinute * minutesPerHour));
   const minutes = Math.floor((totalSeconds % (secondsPerMinute * minutesPerHour)) / secondsPerMinute);
   const seconds = totalSeconds % secondsPerMinute;

   const formatTime = (value: number): string => value.toString().padStart(2, '0');

   return `${formatTime(hours)} hours ${formatTime(minutes)} minutes ${formatTime(seconds)} seconds`;
 }

 export const MapshotSaveView: React.FC<MapshotSaveViewProps> = (props) => {
   return (
     <section>
       <div>
         <h1>{props.saveName} - {props.mapshots.length} saves</h1>
         <div>Thumbnail</div>
       </div>
       <div>
         <ol>
            {props.mapshots.map(mapshot => {
               return (
                  <li><a href={`/mapshot/${props.saveName}/index.html?path=d-${mapshot.unique_id}`}>{ticksToTime(mapshot.ticks_played)}</a></li>
               );
            })}
         </ol>
       </div>
     </section>
   );
 };