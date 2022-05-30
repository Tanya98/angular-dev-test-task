import { ForecastMode } from '@wf/features/dashboard/enums';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'weather-forecast-search-city',
  templateUrl: 'search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
})
export class SearchCityComponent {
  @Output() search = new EventEmitter();
  @Output() filter = new EventEmitter();

  public searchForm;
  constructor(private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
      city: ['', Validators.pattern('[a-zA-Z ]*')],
    });
  }

  public hourlyMode: string = ForecastMode.HOURLY;
  public dailyMode: string = ForecastMode.DAILY;

  searchCity(form: FormGroup): void {
    if (form.valid && form.value.city) {
      const value = form.value.city;
      this.search.emit(value);
      form.reset();
    }
  }

  filterByDay(): void {
    this.filter.emit(this.dailyMode);
  }

  filterByHour(): void {
    this.filter.emit(this.hourlyMode);
  }
}
