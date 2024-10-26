import React from "react";
import { MapshotSave } from "./data";

export type MapshotSaveViewProps = {
   saveName: string;
   mapshots: Array<MapshotSave>;
 };

 export const MapshotSaveView: React.FC<MapshotSaveViewProps> = (props) => {
   return (
     <section>
       <div>
         <h1>{props.saveName} - {props.mapshots.length} saves</h1>
         <div>Thumbnail</div>
       </div>
       <div>

       </div>
     </section>
   );
 };