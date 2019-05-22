import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '@angular/common';

@Pipe({
  name: 'hours'
})
export class HoursPipe implements PipeTransform {

  transform(value: Time, args?: any): any {
    const hours = value.hours > 9? value.hours : '0' + value.hours;
    const minutes = value.minutes > 9? value.minutes : '0' + value.minutes;
    return `${hours}:${minutes}`;
  }

}
