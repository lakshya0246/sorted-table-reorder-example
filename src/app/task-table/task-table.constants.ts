import { TableColumn } from '../table/table.types';

export enum TASK_TABLE_COLUMNS_ACCESSORS {
  TITLE = 'title',
  DUE = 'due',
  ASSIGNED_TO = 'assignedTo',
}

export const TASK_TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Title',
    accessor: TASK_TABLE_COLUMNS_ACCESSORS.TITLE,
  },
  {
    name: 'Due',
    accessor: TASK_TABLE_COLUMNS_ACCESSORS.DUE,
  },
  {
    name: 'Assigned to',
    accessor: TASK_TABLE_COLUMNS_ACCESSORS.ASSIGNED_TO,
  },
];
