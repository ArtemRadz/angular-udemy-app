import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(value: any, filterString: string, propName: string) {
    if (value.length === 0 || filterString === '') {
      return value;
    }

    return value.filter((item: any) => item[propName] === filterString);
  }
}
