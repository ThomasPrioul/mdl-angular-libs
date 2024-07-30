export type ACRoom = {
  id: string;
  label: string;
  level: 'top' | 'bottom' | 'single';
  extremity: 'none' | 'ext1' | 'ext2';
};
export type BogieModel = {
  RB_IS?: boolean;
  Z_IS?: boolean;
  articulated?: boolean;
  type: 'carrier' | 'power';
};
export type ConsistModel = {
  numImmatEf: string;
  codeSerieMateriel: string;
  codeSerieMere: string | null;
  codeSerieRacine: string;
  lcnCode: string;
  fleetName: string;
  stf: string;
  tractionType: 'EMU' | 'DMU';
  vehicles: VehicleModel[];
  // tractionEnergy: 'electrique' | 'thermique' | 'bi-mode',
  // bogieArticulé: 'articulé'
};
export type DoorModel = {
  doorId: number;
  side: 'left' | 'right';
  hasStep: boolean;
  hasWheelChairStep: boolean;
};
export type VehicleModel = {
  numImmatEf: string;
  friendlyName: string;
  signalTechnicalPrefix: string;
  coherencePosition: number;
  doors: DoorModel[];
  bogie1: BogieModel | null;
  bogie2: BogieModel | null;
  acRooms: ACRoom[];

  // type?: 'EXT1' | 'EXT2' | 'coach',
};
