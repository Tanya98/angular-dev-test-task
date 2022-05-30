import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
import { forecastModeChange, searchCity } from '../actions';
import {
  selectCities,
  selectCityDetails,
  selectHourly,
  selectMode,
  selectDaily,
  selectSearchCityError,
} from '../selectors';
import { CityDetails, TabularModel } from '@wf/features/dashboard/models';
import { WeatherForecastState } from '../weather-forecast.state';
import * as _ from 'lodash';

const convert = (forcastData: Map<string, Map<string, string>>) => {
  const cities = [...forcastData.keys()];

  let headers = [];
  const columns: Map<string, string>[] = [];

  _.forEach(cities, city => {
    const newColumn = new Map([['City Name', city], ...forcastData.get(city)]);
    columns.push(newColumn);
    const empty = _.isEmpty(headers);
    if (empty) headers = [...newColumn.keys()];
  });

  return { headers, columns };
};

@Injectable()
export class WeatherForecastStateService {
  public cityDetails$: Observable<CityDetails> | undefined;

  public hourlyWeatherForecast$: Observable<TabularModel>;

  public dailyWeatherForecast$: Observable<TabularModel>;

  public allCities$: Observable<CityDetails[]>;

  public mode$: Observable<string>;

  public searchCityError$: Observable<any>;

  constructor(private store: Store<WeatherForecastState>) {
    this.cityDetails$ = this.store.pipe(select(selectCityDetails));

    this.hourlyWeatherForecast$ = this.store.select(selectHourly).pipe(
      filter(x => !!x && x.size > 0),
      map(hourly => convert(hourly))
    );

    this.dailyWeatherForecast$ = this.store.select(selectDaily).pipe(
      filter(x => !!x && x.size > 0),
      map(daily => convert(daily))
    );

    this.allCities$ = this.store.select(selectCities);

    this.mode$ = this.store.select(selectMode);

    this.searchCityError$ = this.store.select(selectSearchCityError);
  }

  forecastModeChange(mode: string) {
    this.store.dispatch(forecastModeChange({ forecastMode: mode }));
  }

  searchCity(data: string) {
    this.store.dispatch(searchCity({ value: data }));
  }
}
