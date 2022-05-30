import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherForecastApiService } from '@weather-forecast/weather-forecast/service';
import { Observable } from 'rxjs';
import { CityResponse, CitySearchRequest, DailyCityWeatherResponse, HourlyCityWeatherResponse } from '../models';
import { environment } from '@wf/environments/environment';

@Injectable()
export class HttpService {
  constructor(private http: HttpClient, private weatherForcastApiService: WeatherForecastApiService) {}

  private _apiKey = this.weatherForcastApiService._apiKey;
  private url = environment.baseUrl;

  searchNewCity(cityName: string): Observable<CityResponse[]> {
    return this.http.get<CityResponse[]>(`${this.url}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this._apiKey}`);
  }

  getHourlyCityWeather(data: CitySearchRequest): Observable<HourlyCityWeatherResponse> {
    return this.http.get<HourlyCityWeatherResponse>(
      `${this.url}/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${this._apiKey}`
    );
  }

  getDailyCityWeather(data: CitySearchRequest): Observable<DailyCityWeatherResponse> {
    return this.http.get<DailyCityWeatherResponse>(
      `${this.url}/data/2.5/onecall?lat=${data.lat}&lon=${data.lon}&exclude=current,minutely,hourly,alerts&units=metric&appid=${this._apiKey}`
    );
  }
}
