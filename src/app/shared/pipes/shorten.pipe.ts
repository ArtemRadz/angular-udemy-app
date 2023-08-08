import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten',
  standalone: true,
})
export class ShortenPipe implements PipeTransform {
  transform(value: string, optionalLimit?: number) {
    const limit = optionalLimit ?? 10;
    if (value.length > limit) {
      return value.substring(0, limit) + '...';
    }

    return value;
  }
}
