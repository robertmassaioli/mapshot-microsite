import React, { PropsWithChildren } from "react";
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
import { appLatestMapViewLocation, appMapViewLocation, getPlayerTile, Position, ticksToTime, toMapLocation, toMapThumbnail } from "./util";
import { HeaderContainer, HeaderContent } from "./SizeableHeader";

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

const HeaderTitle: React.FC<PropsWithChildren<{}>> = ({ children }) => {
   return (
      <HeaderContainer>
         <HeaderContent>{children}</HeaderContent>
      </HeaderContainer>
   );
}

export type MapshotSaveCardProps = {
   saveDir: string;
   mapshots: Array<MapshotMapData>;
 };

 export const MapshotSaveCard: React.FC<MapshotSaveCardProps> = (props) => {
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

   const newestMapshot = orderedMapshots[0];
   const firstSurface = newestMapshot.surfaces[0];
   const playerCount = firstSurface.players.length;

   let firstPlayerLoadedPosition: Position | undefined = firstSurface.players[0]?.position;

   const firstPlayerPosition: Position = firstPlayerLoadedPosition || { x: 0, y: 0 };

   const zoomLevel = 3;
   const firstPlayerTile = getPlayerTile(firstPlayerPosition, zoomLevel, firstSurface.tile_size);

   return (
      <Card>
         <CardHeader
            title={props.saveDir}
            titleTypographyProps={{ component: HeaderTitle }}
            subheader={`${playerCount} ${pluralize("players", playerCount)}`}
         />
         <CardMedia
            component="img"

            image={toMapThumbnail(props.saveDir, newestMapshot.unique_id, zoomLevel, firstPlayerTile)}
            alt="Paella dish"
         />
         <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Saves: {props.mapshots.length}
            </Typography>
         </CardContent>
         <CardActions disableSpacing>
            <IconButton aria-label="View latest map" href={appMapViewLocation(props.saveDir, newestMapshot.unique_id)}>
               <VisibilityIcon />
            </IconButton>
            <IconButton aria-label="share" href={appLatestMapViewLocation(props.saveDir)}>
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
                           <li key={mapshot.unique_id}><Link to={appMapViewLocation(props.saveDir, mapshot.unique_id)}>{ticksToTime(mapshot.ticks_played)}</Link></li>
                        );
                     })}
                  </ul>
               </Typography>

            </CardContent>
         </Collapse>
      </Card>
   );
 };