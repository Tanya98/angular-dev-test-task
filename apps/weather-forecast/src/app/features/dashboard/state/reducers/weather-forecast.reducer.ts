import { createReducer, on } from '@ngrx/store';
import * as WeatherActions from '../actions/index';
import { initialState } from '../weather-forecast.state';
import * as _ from 'lodash';

export const wheatherForecastReducer = createReducer(
  initialState,
  on(WeatherActions.searchCitySuccess, (state, { cityDetails }) => {
    return { ...state, cityDetails: cityDetails };
  }),

  on(WeatherActions.getHourlyCityWeatherSuccess, (state, { hourlyCityDetails }) => {
    return {
      ...state,
      hourlyForecast: hourlyCityDetails,
    };
  }),

  on(WeatherActions.getDailyCityWeatherSuccess, (state, { dailyCityDetails }) => {
    return {
      ...state,
      dailyForecast: dailyCityDetails,
    };
  }),

  on(WeatherActions.forecastModeChangeSuccess, (state, { forecastMode }) => {
    return { ...state, forecastMode: forecastMode };
  }),

  on(WeatherActions.setCitySuccess, (state, { cityDetails }) => {
    const unique = _.uniqBy([...state.cities, cityDetails], 'name');
    return {
      ...state,
      cities: unique,
      searchCityError: null,
    };
  }),

  on(WeatherActions.searchCityError, (state, { error }) => {
    return {
      ...state,
      searchCityError: error,
    };
  })
);
