import { TableColumn } from '../table/table.types';

export enum TASK_TABLE_COLUMNS_ACCESSORS {
  TITLE = 'title',
  DUE_AT_DISTANCE = 'dueAtDistance',
  ASSIGNED_TO = 'assignedTo',
}

export const TASK_TABLE_COLUMNS: TableColumn[] = [
  {
    name: 'Title',
    accessor: TASK_TABLE_COLUMNS_ACCESSORS.TITLE,
    sortType: 'alphanumeric',
  },

  {
    name: 'Due',
    accessor: TASK_TABLE_COLUMNS_ACCESSORS.DUE_AT_DISTANCE,
    sortType: 'datetime',
    sortValueKey: 'dueAt',
  },
  {
    name: 'Assigned to',
    accessor: TASK_TABLE_COLUMNS_ACCESSORS.ASSIGNED_TO,
    sortType: 'alphanumeric',
  },
];
