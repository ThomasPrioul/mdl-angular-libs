export type WeatherState = {
  localTemperatureCelsius: number;
  localHumidityPercent: number;
  type: 'sunny' | 'cloudy' | 'rainy' | 'storm';
  locality: string;
};
