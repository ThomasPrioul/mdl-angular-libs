import { DateTime } from 'luxon';

export type ACRoomState = {
  operatingState: boolean | null;
  temperatureDegreesCelsius: number;
};
export type BaseDoorState = {
  state: 'locked' | 'closed' | 'closing' | 'opening' | 'opened' | 'condemned' | 'emergency';
  isolated: boolean;
};
export type CabinState = VehicleState & {
  inService: boolean | null;
  BP_URG: boolean | null;
  Q_UM: boolean | null;
  cabinAcRoom: ACRoomState | null;
};
export type ConsistState = {
  lastCommunication: DateTime | null;
  geolocation: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    orientation: number | null;
  } | null;
  totalPassengers: number | null;
  vehicleStates: Record<string, VehicleState>;
};
export type DoorState = BaseDoorState & {
  stepState?: BaseDoorState;
  wheelChairStepState?: BaseDoorState;
};
export type VehicleState = {
  nbPassengers: number | null;
  acRooms: Record<string, ACRoomState>;
};
