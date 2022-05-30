import { HttpService } from '@wf/features/dashboard/services';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from 'rxjs';

import * as WeatherActions from '../actions/index';
import { Store } from '@ngrx/store';
import { selectCityDetails, selectDaily, selectHourly, selectMode, syncForecastByMode } from '../selectors';
import { ForecastMode } from '@wf/features/dashboard/enums';
import {
  CityDetails,
  CityResponse,
  CitySearchRequest,
  DailyCityWeatherResponse,
  HourlyCityDetails,
  HourlyCityWeatherResponse,
} from '@wf/features/dashboard/models';
import { ToasterService } from '@wf/app/shared/services';
import * as _ from 'lodash';
import * as moment from 'moment';
import { WeatherForecastState } from '../weather-forecast.state';

@Injectable()
export class WeatherForecastEffect {
  constructor(
    private actions$: Actions,
    private httpService: HttpService,
    private store: Store<WeatherForecastState>,
    private toaster: ToasterService
  ) {}

  searchCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.searchCity),
      withLatestFrom(this.store.select(selectMode)),
      mergeMap(([payload, mode]) => {
        const city = payload.value;
        return this.httpService.searchNewCity(city).pipe(
          map((data: CityResponse[]) => data[0]),
          concatMap((city: CityResponse) => {
            const cityData: CityDetails = {
              name: city.name,
              lon: city.lon,
              lat: city.lat,
            };
            return [
              WeatherActions.searchCitySuccess({ cityDetails: city }),
              WeatherActions.setCity({
                cityDetails: cityData,
              }),
              WeatherActions.forecastModeChange({
                forecastMode: mode ?? ForecastMode.HOURLY,
              }),
            ];
          }),
          catchError((err: Error) => {
            //UI errors should be sent from API
            this.toaster.show(`This city "${city}" was not found`);
            return of(WeatherActions.searchCityError({ error: err.message }));
          })
        );
      })
    )
  );

  syncForecastByMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.syncForecastByMode),
      withLatestFrom(this.store.select(syncForecastByMode)),
      concatMap(([payload, { cities, hourlyForecast, dailyForecast }]) => {
        const mode = payload.forecastMode;

        const actionsToDispatch = [];

        for (const city of cities) {
          const request = { lat: city.lat, lon: city.lon };

          let forecast = new Map();

          if (mode === ForecastMode.HOURLY) {
            forecast = hourlyForecast.get(city.name);

            if (!forecast)
              actionsToDispatch.push(
                WeatherActions.getHourlyCityWeather({
                  value: request,
                })
              );
          } else {
            forecast = dailyForecast.get(city.name);

            if (!forecast)
              actionsToDispatch.push(
                WeatherActions.getDailyCityWeather({
                  value: request,
                })
              );
          }
        }

        return actionsToDispatch;
      }),
      catchError(error => of(WeatherActions.setCityError(error)))
    )
  );

  getHourlyCityWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getHourlyCityWeather),
      withLatestFrom(this.store.select(selectCityDetails), this.store.select(selectHourly)),
      mergeMap(([payload, city, hourlyWeatherForecast]) => {
        const cityDetails: CitySearchRequest = payload.value;
        const cityName: string = city.name;
        return this.httpService.getHourlyCityWeather(cityDetails).pipe(
          map((data: HourlyCityWeatherResponse) => {
            let hourlyCityDetails: HourlyCityDetails = null;
            hourlyCityDetails = {
              hourly: data.hourly,
              name: cityName,
            };
            //get forecast only for 24 hours
            const twentyFourHours = hourlyCityDetails.hourly.slice(0, 24);
            const threeHours = 3;
            //take each 3 hours
            const everyThreeHours = twentyFourHours.filter((e, i) => i % threeHours === threeHours - 1);

            const hourly = new Map(hourlyWeatherForecast);

            const hourlyForecast = new Map();
            const timeFormat = 'HH:mm';
            _.forEach(everyThreeHours, item => {
              const hours = moment.unix(item.dt).format(timeFormat);
              const temp = Math.floor(item.temp);
              hourlyForecast.set(hours, temp);
            });

            hourly.set(hourlyCityDetails.name, hourlyForecast);

            return WeatherActions.getHourlyCityWeatherSuccess({
              hourlyCityDetails: hourly,
            });
          }),
          catchError(() => of(WeatherActions.getHourlyCityWeatherError))
        );
      })
    )
  );

  getDailyCityWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.getDailyCityWeather),
      withLatestFrom(this.store.select(selectCityDetails), this.store.select(selectDaily)),
      mergeMap(([payload, city, dailyWeatherForecast]) => {
        const cityName: string = city.name;
        const cityData: CityDetails = {
          name: city.name,
          lon: city.lon,
          lat: city.lat,
        };
        return this.httpService.getDailyCityWeather(cityData).pipe(
          map((data: DailyCityWeatherResponse) => {
            const daily = new Map(dailyWeatherForecast);
            const dailyForecast = new Map();
            const dayFormat = 'dd';
            _.forEach(data.daily, (item: any) => {
              const weekDays = moment.unix(item.dt).format(dayFormat);
              const temp = Math.floor(item.temp.day);
              dailyForecast.set(weekDays, temp);
            });

            daily.set(cityName, dailyForecast);

            return WeatherActions.getDailyCityWeatherSuccess({
              dailyCityDetails: daily,
            });
          }),
          catchError(() => of(WeatherActions.getDailyCityWeatherError))
        );
      })
    )
  );

  changeForecastMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.forecastModeChange),
      concatMap(payload => {
        const mode: string = payload.forecastMode;

        return [
          WeatherActions.forecastModeChangeSuccess({ forecastMode: mode }),
          WeatherActions.syncForecastByMode({ forecastMode: mode }),
        ];
      }),
      catchError(error => of(WeatherActions.forecastModeChangeError(error)))
    )
  );

  setCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.setCity),
      map(payload => {
        const cityDetails = payload.cityDetails;
        return WeatherActions.setCitySuccess({
          cityDetails: cityDetails,
        });
      }),
      catchError(error => of(WeatherActions.setCityError(error)))
    )
  );
}
