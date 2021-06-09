import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(value: any[] | null, searchString: string): any[] | null {
    return value;
  }
}
