import {
  Box, Button,
  Flex, IconButton,
  Input,
  Menu,
  MenuButton, MenuItem,
  MenuList,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import {useEffect, useMemo, useRef, useState} from "react";
import {fetchPeople} from "../apis/people.ts";
import {
  ColumnFiltersState,
  createColumnHelper,
  flexRender,
  getCoreRowModel, getFilteredRowModel,
  getPaginationRowModel,
  HeaderGroup,
  useReactTable
} from "@tanstack/react-table";
import {PaginationControls} from "./PaginationButton.tsx";
import {FilterIcon} from "./FilterIcon.tsx";
import { Search2Icon } from "@chakra-ui/icons";
import {ColumnFilter} from "./ColumnFilter.tsx";

export interface PeopleData {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  dob: string
}

export const TableDemo = () => {
  useEffect(() => {
    const getData = async () => {
      try {
        const {data} = await fetchPeople();
        setData(data)
      } catch (error) {
        console.log(error)
      }
    }
    getData();
  }, []);

  const columnHelper = createColumnHelper<PeopleData>()

  const columns  = useMemo(() => [
    columnHelper.accessor('id', {
      id: 'ID',
      enableColumnFilter: false,
    }),
    columnHelper.accessor('first_name', {
      id: "Name",
    }),
    columnHelper.accessor('email', {
      id: 'Email'
    }),
    columnHelper.accessor('gender', {
      id: "Gender",
      filterFn: 'equals',
      enableColumnFilter: true,
    }),
    columnHelper.accessor('dob', {
      id: "Date of Birth",
      enableColumnFilter: false,
      cell: (info) => {
        const date = new Date(info.row.original.dob);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = date.getDate();
        return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
      }
    })
  ],[])


  const [data, setData] = useState<PeopleData[] | []>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState('');

  const reactTable = useReactTable({
    data,
    state: {
      columnFilters,
      globalFilter,
    },
    columns,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  })

  // get Column Info
  const columnInfo = useMemo(() => {
    return reactTable.getHeaderGroups()[0].headers;
  }, [reactTable.getHeaderGroups()]);

  // SelectBox 상태
  const [searchOption, setSearchOption] = useState('All');

  // Filter Select 에 따른 검색 event 설정 ( 매번 검색마다 필터 리셋이 필요 )
  const filterSearch = () => {
    if (searchOption === 'All') {
      reactTable.resetColumnFilters();
      reactTable.setGlobalFilter(inputRef?.current?.value);
    } else {
      reactTable.resetColumnFilters();
      const filterColumn = columnInfo.find((data) => data.id === searchOption);
      filterColumn?.column.setFilterValue(inputRef?.current?.value);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  // Add the onKeyPress event handler
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      filterSearch();
    }
  };


  return (
    <Box>
      <Box p={4}>
        <Flex alignItems="center">
          <Input
            ref={inputRef}
            placeholder="Search all columns..."
            width="auto"
            onKeyPress={handleKeyPress}
          />
          <Menu>
            <MenuButton
              aria-label="Filter"
              as={Button}
              rightIcon={<FilterIcon />}
              value={searchOption}
              // onChange={handleSearch}
            >
              {searchOption}
            </MenuButton>
            <MenuList maxHeight="300px" overflowY="auto" overflowX="hidden">
              <MenuItem key="All" onClick={() => setSearchOption('All')}>
                All
              </MenuItem>
              {columnInfo.map((columnD) => {
                if (columnD.id === 'selection') {
                  return null;
                }
                return (
                  <MenuItem
                    key={columnD.id}
                    value={columnD.id}
                    onClick={() => setSearchOption(columnD.id)}
                  >
                    {columnD.id}
                  </MenuItem>
                );
              })}
            </MenuList>
          </Menu>
          <IconButton
            aria-label="Search"
            icon={<Search2Icon />}
            onClick={filterSearch}
            color="gray"
          />
        </Flex>
      </Box>
    <TableContainer mt='10px'>
      <Table>
        <Thead>
          {reactTable.getHeaderGroups().map((headerGroup: HeaderGroup<PeopleData>) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  <ColumnFilter column={header.column} />
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {reactTable.getRowModel().rows.map(row => (
            <Tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <Td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <PaginationControls table={reactTable}/>
    </TableContainer>
    </Box>
  );
}