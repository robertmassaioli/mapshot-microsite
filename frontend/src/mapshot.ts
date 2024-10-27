export type MapshotMapData = {
  savename: string;
  unique_id: string;
  map_id: string;
  tick: number;
  ticks_played: number;
  seed: number;
  map_exchange: string;
  surfaces: MapshotSurface[];
  game_version: string;
  active_mods: {
    [key: string]: string;
  };
};

export type MapshotSurface = {
  surface_name: string;
  surface_idx: number;
  file_prefix: string;
  tile_size: number;
  render_size: number;
  world_min: MapshotCoordinate;
  world_max: MapshotCoordinate;
  zoom_min: number;
  zoom_max: number;
  players: MapshotPlayer[];
  stations: MapshotStation[];
  tags: Record<string, unknown>;
};

export type MapshotCoordinate = {
  x: number;
  y: number;
};

export type MapshotPlayer = {
  name: string;
  color: MapshotColor;
  position: MapshotCoordinate;
};

export type MapshotColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export type MapshotStation = {
  backer_name: string;
  bounding_box: {
    left_top: MapshotCoordinate;
    right_bottom: MapshotCoordinate;
  };
};