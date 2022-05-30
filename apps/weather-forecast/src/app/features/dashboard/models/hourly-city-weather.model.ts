export interface HourlyCityWeatherResponse {
  hourly: Hour[];
  lat: number;
  lon: number;
  timezone?: string;
  timezone_offset?: number;
}

export interface Hour {
  clouds?: number;
  dew_point?: number;
  dt: number;
  feels_like?: number;
  humidity?: number;
  pop?: number;
  pressure?: number;
  temp: number;
  uvi?: number;
  visibility?: number;
  weather?: null;
  wind_deg?: number;
  wind_gust?: number;
  wind_speed?: number;
}
