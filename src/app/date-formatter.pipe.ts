import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter'
})
export class DateFormatterPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return new Date(value).toUTCString().toString().slice(0,16)
  }

}
