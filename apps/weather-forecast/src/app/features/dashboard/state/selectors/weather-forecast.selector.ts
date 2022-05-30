import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WeatherForecastState } from '../weather-forecast.state';

export const selectWeatherForecastState = createFeatureSelector<WeatherForecastState>('weather');

export const syncForecastByMode = createSelector(selectWeatherForecastState, state => {
  return {
    cities: state.cities,
    hourlyForecast: state.hourlyForecast,
    dailyForecast: state.dailyForecast,
  };
});

export const selectCityDetails = createSelector(
  selectWeatherForecastState,
  (state: WeatherForecastState) => state.cityDetails
);

export const selectHourly = createSelector(selectWeatherForecastState, (state: WeatherForecastState) => {
  return state.hourlyForecast;
});

export const selectDaily = createSelector(selectWeatherForecastState, (state: WeatherForecastState) => {
  return state.dailyForecast;
});

export const selectCities = createSelector(selectWeatherForecastState, (state: WeatherForecastState) => state.cities);

export const selectMode = createSelector(
  selectWeatherForecastState,
  (state: WeatherForecastState) => state.forecastMode
);

export const selectSearchCityError = createSelector(
  selectWeatherForecastState,
  (state: WeatherForecastState) => state.searchCityError
);
