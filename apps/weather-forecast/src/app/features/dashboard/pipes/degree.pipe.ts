import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'degree',
})
export class DegreePipe implements PipeTransform {
  transform(value: any) {
    return _.isNumber(value) ? `${value}°` : value;
  }
}
