import { Pipe, PipeTransform } from '@angular/core';
import { TableSort, TableSortState } from '../table.types';

/**
 * @returns -1 if `b` greater than `a`, 1 if `a` greater than `b`
 */
function compareAlphanumeric(
  a: string | number,
  b: string | number,
  sortDirection: TableSort
) {
  let comparison;
  const valA = a.toString();
  const valB = b.toString();
  var patternAlphabet = /[^a-zA-Z]/g;
  var patternNumber = /[^0-9]/g;
  var aAlphaOnly = valA.replace(patternAlphabet, '');
  var bAlphaOnly = valB.replace(patternAlphabet, '');
  if (aAlphaOnly === bAlphaOnly) {
    var aNumberOnly = parseInt(valA.replace(patternNumber, ''), 10);
    var bNumberOnly = parseInt(valB.replace(patternNumber, ''), 10);
    comparison =
      aNumberOnly === bNumberOnly ? 0 : aNumberOnly > bNumberOnly ? 1 : -1;
  } else {
    comparison = aAlphaOnly > bAlphaOnly ? 1 : -1;
  }
  return sortDirection === 'DESC' ? comparison * -1 : comparison;
}

@Pipe({
  name: 'sort',
})
/**
 * Only supports string sorting, not alphanumeric strings
 */
export class SortPipe implements PipeTransform {
  transform(
    value: any[] | null,
    sortConfig: TableSortState | null
  ): any[] | null {
    console.log(sortConfig);
    if (
      sortConfig?.column.accessor &&
      value?.length &&
      sortConfig.sortDirection
    ) {
      if (sortConfig.column.sortType === 'alphanumeric') {
        return [...value].sort((a, b) =>
          compareAlphanumeric(
            a[sortConfig.column.accessor],
            b[sortConfig.column.accessor],
            sortConfig.sortDirection
          )
        );
      } else if (sortConfig.column.sortType === 'datetime') {
        return [...value].sort((a, b) =>
          compareAlphanumeric(
            a[sortConfig.column.accessor],
            b[sortConfig.column.accessor],
            sortConfig.sortDirection
          )
        );
      }
    }
    return value;
  }
}
