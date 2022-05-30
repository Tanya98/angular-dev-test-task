import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { WeatherForecastStateService } from '@wf/features/dashboard/state/services';
import { CityDetails, TabularModel } from '../models';
import { ForecastMode } from '../enums';

@Component({
  selector: 'weather-forecast-dashboard',
  templateUrl: 'dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  public cityDetails$: Observable<CityDetails> | undefined;

  public hourlyWeatherForecastData$: Observable<TabularModel>;

  public dailyWeatherForecastData$: Observable<TabularModel>;

  public mode$: Observable<string>;
  public hourlyMode: string = ForecastMode.HOURLY;
  public dailyMode: string = ForecastMode.DAILY;

  constructor(private _state: WeatherForecastStateService) {}

  ngOnInit() {
    this.cityDetails$ = this._state.cityDetails$;

    this.hourlyWeatherForecastData$ = this._state.hourlyWeatherForecast$;

    this.dailyWeatherForecastData$ = this._state.dailyWeatherForecast$;

    this.mode$ = this._state.mode$;
  }

  searchCity(str: string) {
    this._state.searchCity(str);
  }

  modeFilter(mode: string) {
    this._state.forecastModeChange(mode);
  }
}
