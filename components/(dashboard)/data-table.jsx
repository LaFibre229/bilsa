"use client"
import * as React from "react"
import {
  ColumnDef,
   SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
   VisibilityState,
} from "@tanstack/react-table"

import { useTranslations } from "next-intl"

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Button } from "@/components/ui/button"
import { IconHistory } from "@tabler/icons-react"

export function DataTable({
  columns,
  data,
}) {
  const [sorting, setSorting] = React.useState([])
   const [columnVisibility, setColumnVisibility] = React.useState({})
    const t = useTranslations("data-table");
  const table = useReactTable({
    data,
    columns,
    onColumnVisibilityChange : setColumnVisibility,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
     getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
     state: {
      sorting,
      columnVisibility,
    },
  })

  return (
    <>
     <div className="flex flex-row items-center justify-between px-4">
   <div className="flex flex-row items-center gap-4 text-lg text-textGreen border border-borderGreen w-[150px] p-1 rounded-lg">
          <IconHistory className="text-goldButton" />
          {t("history")}
          </div>


       {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto border-borderGreen ">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}

       
     </div>
    <div className="overflow-hidden rounded-md border border-darkGrayishBlue">
      <Table >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className={"px-6"}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-lg font-montserrat font-normal text-darkGrayishBlue">
                {t("no_transaction")}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>

    <div className="flex items-center justify-center space-x-10 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className={'border p-2 border-textGreen bg-transparent font-inter font-semibold rounded-md cursor-pointer px-6 py-3'}
        >
          {t("previous")}
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className={'border-none p-2 bg-goldButton rounded-md cursor-pointer hover:bg-goldButtonHover text-textGreen font-semibold font-inter px-6 py-3'}
        >
          {t("next")}
        </Button>
      </div>
      </>
  )
}