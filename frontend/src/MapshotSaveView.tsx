import React from "react";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { MapshotMapData } from "./mapshot";
import VisibilityIcon from '@mui/icons-material/Visibility';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import pluralize from 'pluralize';
import { Link } from "react-router-dom";

interface ExpandMoreProps extends IconButtonProps {
   expand: boolean;
 }

const ExpandMore = styled((props: ExpandMoreProps) => {
   const { expand, ...other } = props;
   return <IconButton {...other} />;
 })(({ theme }) => ({
   marginLeft: 'auto',
   transition: theme.transitions.create('transform', {
     duration: theme.transitions.duration.shortest,
   }),
   variants: [
     {
       props: ({ expand }) => !expand,
       style: {
         transform: 'rotate(0deg)',
       },
     },
     {
       props: ({ expand }) => !!expand,
       style: {
         transform: 'rotate(180deg)',
       },
     },
   ],
 }));

export type MapshotSaveViewProps = {
   saveDir: string;
   mapshots: Array<MapshotMapData>;
 };


 function toMapLocation(saveDir: string, unique_id: string): string {
   return `/mapshot/${saveDir}/index.html?path=d-${unique_id}`;
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
   const [expanded, setExpanded] = React.useState(false);

   const handleExpandClick = () => {
      setExpanded(!expanded);
    };

   const orderedMapshots = props.mapshots.sort((a, b) => b.ticks_played - a.ticks_played);

   if (orderedMapshots.length < 1) {
      return (
         <div>Error: There were no saves for this save. Invalid state.</div>
      );
   }

   const playerCount = props.mapshots[0].surfaces[0].players.length;

   return (
      <Card>
         <CardHeader
            title={props.saveDir}
            subheader={`${playerCount} ${pluralize("players", playerCount)}`}
         />
         <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Saves: {props.mapshots.length}
            </Typography>
         </CardContent>
         <CardActions disableSpacing>
            <IconButton aria-label="View latest map" href={toMapLocation(props.saveDir, props.mapshots[0].unique_id)}>
               <VisibilityIcon />
            </IconButton>
            <IconButton aria-label="share">
               <ShareIcon />
            </IconButton>
            <ExpandMore
               expand={expanded}
               onClick={handleExpandClick}
               aria-expanded={expanded}
               aria-label="show more"
               >
               <ExpandMoreIcon />
            </ExpandMore>
         </CardActions>
         <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
               <Typography sx={{ marginBottom: 2 }}>Previous versions of the save:</Typography>
               <Typography sx={{ marginBottom: 2 }}>
                  <ul>
                     {props.mapshots.map(mapshot => {
                        return (
                           <li key={mapshot.unique_id}><a href={toMapLocation(props.saveDir, mapshot.unique_id)}>{ticksToTime(mapshot.ticks_played)}</a></li>
                        );
                     })}
                  </ul>
               </Typography>

            </CardContent>
         </Collapse>
      </Card>
   //   <section>
   //     <div>
   //       <h1>{props.saveName} - {props.mapshots.length} saves</h1>
   //       <div>Thumbnail</div>
   //     </div>
   //     <div>
   //       <ol>
   //          {props.mapshots.map(mapshot => {
   //             return (
   //                <li><a href={`/mapshot/${props.saveName}/index.html?path=d-${mapshot.unique_id}`}>{ticksToTime(mapshot.ticks_played)}</a></li>
   //             );
   //          })}
   //       </ol>
   //     </div>
   //   </section>
   );
 };