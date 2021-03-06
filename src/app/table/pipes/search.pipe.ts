import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
/**
 * Filters `list` by search string
 * @param searchByFields list of object property names/`keys` to search in
 */
export class SearchPipe implements PipeTransform {
  transform(
    list: any[] | null,
    searchString: string | null,
    searchByFields: string[]
  ): any[] | null {
    if (list && searchString) {
      return list.filter((item) => {
        const query: string = searchByFields.reduce((query, searchByKey) => {
          if (item[searchByKey]) {
            return query + item[searchByKey];
          }
          return query;
        }, '');

        return query.toLowerCase().includes(searchString.toLowerCase());
      });
    }
    return list;
  }
}
