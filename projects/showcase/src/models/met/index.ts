import { ConsistState } from './dynamic';
import { MissionState } from './pis';
import { ConsistModel } from './static';
import { WeatherState } from './weather';

export * from './static';
export * from './dynamic';
export * from './pis';
export * from './weather';

/** Model sent from API to frontend */
export type TrainModel = {
  /** Train composition, contains all static info to generate a basic diagram */
  composition: ConsistModel[];

  /** Mission information for this train. */
  mission?: MissionState;

  /** Dynamic states dictionary, keyed by consist id. */
  states: Record<string, ConsistState>;

  /** Outdoor weather info. */
  weather?: WeatherState;
};
