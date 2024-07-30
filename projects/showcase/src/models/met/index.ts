import { ConsistState } from './dynamic';
import { MissionState } from './pis';
import { ConsistModel } from './static';
import { WeatherState } from './weather';

export * from './static';
export * from './dynamic';
export * from './pis';
export * from './weather';

export type TrainModel = {
  composition: ConsistModel[];
  mission: MissionState;
  states: Record<string, ConsistState>;
  weather: WeatherState;
};
