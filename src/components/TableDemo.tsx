import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {fetchPeople} from "../apis/people.ts";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  HeaderGroup,
  useReactTable
} from "@tanstack/react-table";
import {PaginationControls} from "./PaginationButton.tsx";

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

  const columns: ColumnDef<PeopleData>[] = [
    {
      header: 'ID',
      accessorKey: 'id'
    },
    {
      header: 'Name',
      accessorFn: row => `${row.first_name} ${row.last_name}`,
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Gender',
      accessorKey: 'gender'
    },
    {
      header: 'Date of Birth',
      accessorKey: 'dob',
      // value 값에 대한 전처리 기능 제공 [cell]
      cell: (info) => {
        const date = new Date(info.row.original.dob);
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const day = date.getDate();
        return `${day} ${months[date.getMonth()]} ${date.getFullYear()}`;
      }

    },
  ]

  const [data, setData] = useState<PeopleData[] | []>([])

  const reactTable = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()

  })
  return (
    <TableContainer mt='10px'>
      <Table>
        <Thead>
          {reactTable.getHeaderGroups().map((headerGroup: HeaderGroup<PeopleData>) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {flexRender(header.column.columnDef.header, header.getContext())}
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
  );
}