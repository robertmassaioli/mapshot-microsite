export function toMapLocation(saveDir: string, unique_id: string): string {
  return `/mapshot/${saveDir}/index.html?path=d-${unique_id}`;
}

export function toMapThumbnail(saveDir: string, unique_id: string): string {
  return `/mapshot/${saveDir}/d-${unique_id}/s1zoom_3/tile_-1_-1.jpg`;
}

export function appMapViewLocation(saveDir: string, unique_id: string): string {
  return `/app/save/${saveDir}/mapshot/${unique_id}/`;
}

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