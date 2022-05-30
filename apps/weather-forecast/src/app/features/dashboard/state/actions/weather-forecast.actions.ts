import { createAction, props } from '@ngrx/store';
import { CityDetails, CitySearchRequest } from '@wf/features/dashboard/models';

export const searchCity = createAction('[Search City] Search', props<{ value: string }>());
export const searchCitySuccess = createAction('[Search City Success] Search', props<{ cityDetails: CityDetails }>());
export const searchCityError = createAction('[Search City Error] Search', props<{ error?: any }>());
export const getHourlyCityWeather = createAction(
  '[Get Hourly City Weather] Get Hourly City Weather',
  props<{ value: CitySearchRequest }>()
);
export const getHourlyCityWeatherSuccess = createAction(
  '[Get Hourly City Weather Success] Get Hourly City Weather',
  props<{ hourlyCityDetails: Map<string, Map<string, string>> }>()
);
export const getHourlyCityWeatherError = createAction(
  '[Get Hourly City Weather Error] Get Hourly City Weather',
  props<{ error?: any }>()
);

export const getDailyCityWeather = createAction(
  '[Get Daily City Weather] Get Daily City Weather',
  props<{ value: CitySearchRequest }>()
);
export const getDailyCityWeatherSuccess = createAction(
  '[Get Daily City Weather Success] Get Daily City Weather',
  props<{ dailyCityDetails: Map<string, Map<string, string>> }>()
);
export const getDailyCityWeatherError = createAction(
  '[Get Daily City Weather Error] Get Daily City Weather',
  props<{ error?: any }>()
);

export const forecastModeChange = createAction(
  '[Weather Forecast Dashboard] Change Forecast Mode',
  props<{ forecastMode: string }>()
);

export const forecastModeChangeSuccess = createAction(
  '[Weather Forecast Dashboard] Change Forecast Mode Success',
  props<{ forecastMode: string }>()
);

export const forecastModeChangeError = createAction(
  '[Change Forecast Mode Error] Change Forecast Mode Error',
  props<{ error?: any }>()
);

export const setCity = createAction('[Set City] Set City', props<{ cityDetails: CityDetails }>());

export const setCitySuccess = createAction(
  '[Set City Success] Set City Success',
  props<{ cityDetails: CityDetails }>()
);

export const setCityError = createAction('[Set City Error] Set City Error', props<{ error?: any }>());

export const syncForecastByMode = createAction(
  '[Weather Forecast Dashboard] Sync by forecast mode',
  props<{ forecastMode: string }>()
);
