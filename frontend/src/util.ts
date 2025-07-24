// TODO is it possible to position the initial map viewing location at where we were?
export function toMapLocation(saveDir: string, unique_id: string): string {
  return `/mapshot/${saveDir}/index.html?path=d-${unique_id}`;
}

export function toMapThumbnail(saveDir: string, unique_id: string, zoomLevel: number, tile: Tile): string {
  return `/mapshot/${saveDir}/d-${unique_id}/s1zoom_${zoomLevel}/tile_${tile.tile_x}_${tile.tile_y}.jpg`;
}

export function appLatestMapViewLocation(saveDir: string): string {
  return `/app/save/${saveDir}/`;
}

export function appMapViewLocation(saveDir: string, unique_id: string): string {
  return `/app/save/${saveDir}/mapshot/${unique_id}/`;
}

export type Position = {
  x: number,
  y: number
};

export type Tile = {
  tile_x: number;
  tile_y: number;
};

export function getPlayerTile(playerPosition: Position, zoomLevel: number, surfaceTileSize: number): Tile {
  const tileSizeForZoomLevel = surfaceTileSize / Math.pow(2, zoomLevel);

  return {
    tile_x: Math.floor(playerPosition.x / tileSizeForZoomLevel),
    tile_y: Math.floor(playerPosition.y / tileSizeForZoomLevel)
  }
};

export function ticksToTime(ticks: number): string {
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