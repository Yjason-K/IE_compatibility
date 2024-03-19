import { useMemo, type FC } from 'react';
import type { Column } from '@tanstack/react-table';
import {ColumnFilterList} from "./ColumnFilterList.tsx";
import {PeopleData} from "./TableDemo.tsx";

/**
 * Column Filter
 * : 열 필터링 기능 컴포넌트
 */

interface Props {
  column: Column<PeopleData, unknown>;
}

type FilterValue = string | number | [number, number] | undefined;

export const ColumnFilter: FC<Props> = ({ column }) => {
  const sortedUniqueValues: Array<string | number> | null = useMemo(() => {
    if (!column.getCanFilter()) {
      return null;
    }
    const uniqueValues = column.getFacetedUniqueValues();
    const values = Array.from(uniqueValues.keys()).filter(
      (value): value is string | number => typeof value !== 'boolean',
    );
    values.sort((a, b) => {
      if (typeof a === 'number' && typeof b === 'number') {
        return a - b;
      }
      if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b);
      }
      return 0;
    });

    return values;
  }, [column.getCanFilter(), column.getFacetedUniqueValues()]);

  if (sortedUniqueValues === null) {
    return null;
  }
  const columnFilterValue: FilterValue = column.getFilterValue() as FilterValue;

  return (
    <ColumnFilterList
      columnId={column.id}
      columnFilterValue={columnFilterValue}
      setFilterValue={column.setFilterValue}
      sortedUniqueValues={sortedUniqueValues}
    />
  );
};
