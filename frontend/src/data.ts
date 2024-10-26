export type MapshotSaves = {
  [saveName: string]: Array<MapshotSave>;
};

export type MapshotSave = {
  savename: string;
  unique_id: string;
  ticks_played: number;
};