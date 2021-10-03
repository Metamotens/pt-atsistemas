import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'durationConverter'
})
export class DurationConverterPipe implements PipeTransform {

  transform(min: number): string {
    return `${ Math.floor(min / 60) }h ${ Math.floor(min % 60) }m`;
  }
}
