import {
  Text,
  IconButton,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
} from '@chakra-ui/react';
import type { FC } from 'react';
import {FilterIcon} from "./FilterIcon.tsx";

/**
 * ColumnFilterList
 * : 열 필터링 옵션들의 리스트를 보여주는 컴포넌트
 */

type FilterValue = string | number | [number, number] | undefined;
type SetState = FilterValue | ((currValue: FilterValue) => FilterValue);

interface Props {
  columnId: string;
  columnFilterValue: FilterValue;
  setFilterValue: (updater: SetState) => void;
  sortedUniqueValues: Array<string | number>;
}

export const ColumnFilterList: FC<Props> = ({
  setFilterValue,
  sortedUniqueValues,
  columnFilterValue,
}) => {
  const handleClick = (value: SetState) => () => {
    setFilterValue(value);
  };
  const isColumnFilterExist =
    columnFilterValue !== undefined ? 'gray.100' : 'transparent';

  return (
    <Menu>
      <MenuButton
        aria-label="Filter"
        size="xs"
        as={IconButton}
        bg={isColumnFilterExist}
        _hover={{ bg: 'transparent' }}
        _active={{ bg: 'transparent' }}
        icon={<FilterIcon />}
      />
      <MenuList maxHeight="300px" overflowY="auto" overflowX="hidden">
        <MenuItem onClick={handleClick(undefined)}>
          <Text as="b">All</Text>
        </MenuItem>
        {sortedUniqueValues.map((value) => (
          <MenuItem key={value} onClick={handleClick(value)}>
            {value}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
