import _ from 'lodash';
import type { Column } from '@prisma/client';

export function getColumnNames(columns: Column[]) {
  const names = _.groupBy(columns, 'name');
  const columnNames = Object.keys(names);

  return columnNames.map((column) => ({
    label: column,
    value: column
  }))
}
