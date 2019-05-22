import { Pipe, PipeTransform } from '@angular/core';
import { Time } from '@angular/common';

@Pipe({
  name: 'stringToHours'
})
export class StringToHoursPipe implements PipeTransform {

  transform(value: string, args?: any): Time {
    const time = value.split(':');
    return {hours: Number(time[0]), minutes: Number(time[1])};
  }

}
