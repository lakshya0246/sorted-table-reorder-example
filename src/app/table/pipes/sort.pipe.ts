import { Pipe, PipeTransform } from '@angular/core';
import { TableSort, TableSortState } from '../table.types';

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
    if (
      sortConfig &&
      value?.length &&
      typeof value[0][sortConfig.columnAccessor] === 'string'
    ) {
      const sorted = [...value].sort((a, b) => {
        return (a[sortConfig.columnAccessor] as string).localeCompare(
          b[sortConfig.columnAccessor] as string
        );
      });

      if (sortConfig.sortDirection === 'DESC') return sorted.reverse();
      return sorted;
    }
    return value;
  }
}
