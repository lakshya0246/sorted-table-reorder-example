import { Pipe, PipeTransform } from '@angular/core';
import { TableColumnDatetime, TableSort, TableSortState } from '../table.types';

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

/**
 * @returns -1 if `b` greater than `a`, 1 if `a` greater than `b`
 */
function compareDatetime(a: Date, b: Date, sortDirection: TableSort) {
  let comparison = 0;
  if (a instanceof Date && b instanceof Date) {
    comparison = a.getTime() < b.getTime() ? -1 : 1;
  }
  return sortDirection === 'DESC' ? comparison * -1 : comparison;
}

@Pipe({
  name: 'sort',
})
/**
 * Sorts column based on its `sortType`
 */
export class SortPipe implements PipeTransform {
  transform(
    value: any[] | null,
    sortConfig: TableSortState | null
  ): any[] | null {
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
        const column: TableColumnDatetime = sortConfig.column;
        return [...value].sort((a, b) =>
          compareDatetime(
            a[column.sortValueKey],
            b[column.sortValueKey],
            sortConfig.sortDirection
          )
        );
      }
    }
    return value;
  }
}
