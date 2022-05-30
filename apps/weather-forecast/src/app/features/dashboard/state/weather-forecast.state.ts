import { CityDetails } from '../models';

export interface WeatherForecastState {
  cities: CityDetails[];
  hourlyForecast: Map<string, Map<string, string>>;
  dailyForecast: Map<string, Map<string, string>>;
  cityDetails: CityDetails;
  forecastMode: string;
  searchCityError: [] | null;
}

export const initialState: WeatherForecastState = {
  cities: [],
  hourlyForecast: new Map(),
  dailyForecast: new Map(),
  cityDetails: null,
  forecastMode: null,
  searchCityError: null,
};
