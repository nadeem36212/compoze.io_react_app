import { Row, useTable } from 'react-table';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Heading,
  Box,
} from '@chakra-ui/react';

type DataTableProps = {
  // title: string;
  columns: any;
  data: any[];
  onClick?: (row: Row<any>) => void;
};

export const DataTable = ({
  // title,
  columns,
  data,
  onClick,
}: DataTableProps): JSX.Element => {
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  // Render the UI for your table
  return (
    <Box>
      {/* <Heading textAlign='center'>{title}</Heading> */}
      <Table
        variant='simple'
        fontFamily='Lato'
        size='md'
        mt={4}
        mb={10}
        {...getTableProps()}
      >
        <Thead bg='gray.200'>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th fontSize={11} {...column.getHeaderProps()}>
                  {column.render('Header')}
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onClick={() => {
                  if (onClick) {
                    onClick(row);
                  }
                }}
              >
                {row.cells.map((cell) => {
                  return (
                    <Td lineHeight={1.1} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};
