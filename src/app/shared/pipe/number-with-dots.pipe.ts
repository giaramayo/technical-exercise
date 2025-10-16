import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'numberWithDots' })
export class NumberWithDotsPipe implements PipeTransform {
  transform(value: number | string): string {
    if (value == null) return '';
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
}
