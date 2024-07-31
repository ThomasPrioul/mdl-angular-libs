export type ACRoom = {
  id: string;
  label: string;
  level?: 'top' | 'bottom';
  extremity?: 'ext1' | 'ext2';
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
  trainSeriesName: string;
  lcnCode: string;
  fleetName: string;
  fleetManager: string;
  tractionType: 'EMU' | 'DMU';
  vehicles: VehicleModel[];
  // tractionEnergy: 'electrique' | 'thermique' | 'bi-mode',
  // bogieArticulé: 'articulé'
};
export type DoorModel = {
  doorId: number;

  /** Whether this door is on the left or right side according to which extremity it is logically linked to. */
  side: 'left' | 'right';

  /** If more than one door per side on same coach, use this to specify the closest train extremity. */
  extremity?: 'ext1' | 'ext2';

  /** Whether this door has a step that fills the outside gap. */
  hasStep: boolean;

  /** Whether this door has a wheelchair step that fills the outside gap. */
  hasWheelChairStep: boolean;
};
export type VehicleModel = {
  /** Identification number of this vehicle. */
  numIntEf: string;

  /** Friendly name which can be found in technical documentation, eg V1, V8, V11, V20, Z1-3, VE1NV11, etc. */
  friendlyName: string;

  /** Prefix typically found in variables for this vehicle's data. */
  signalTechnicalPrefix: string;

  /** Position of the vehicle in the consist according to maintenance data. */
  coherencePosition: number;

  /** Vehicle door model. */
  doors: DoorModel[];

  /** Vehicle bogie model, closest to ext1 of the consist. */
  bogie1: BogieModel | null;

  /** Vehicle bogie model, closest to ext2 of the consist. */
  bogie2: BogieModel | null;

  /** AC rooms of this vehicle */
  acRooms: ACRoom[];

  /** Type of this vehicle, whether it is an extremity vehicle or a coach. */
  type: 'EXT1' | 'EXT2' | 'coach';
};
