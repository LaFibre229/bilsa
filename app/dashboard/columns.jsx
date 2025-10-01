"use client"

import { MoreHorizontal } from "lucide-react"
import { 
  IconLoader, 
  IconCircleCheckFilled ,
  IconExclamationCircleFilled,
  IconPlus,
  IconMinus
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Badge } from "@/components/ui/badge"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


export const columns = [
    


  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className={'text-gray-500'}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <span className="p-1 rounded-full border-none bg-neutral-100 cursor-pointer">
            <ArrowUpDown className="h-4 w-4" />
          </span>
          
        </Button>
      )
    },
    cell : ({row})=>{
        const date = row.getValue("createdAt")
        return(
            <span className="text-gray-600">{date.split("T")[0]}</span>
        )
      

        
    },
    sortingFn: (rowA, rowB, columnId) => {
    const dateA = new Date(rowA.getValue(columnId)).getTime()
    const dateB = new Date(rowB.getValue(columnId)).getTime()
    return dateA - dateB
  },
  },
  {
    accessorKey: "type",
    header: ()=>(<div className="text-gray-500">Type</div>),
      cell : ({row})=>{
        const type = row.getValue("type")
        return(
            <span className="text-textGreen">{type}</span>
        )
      }

  },
  {
    accessorKey: "amount",
     header: ()=>(<div className="text-gray-500">Amount</div>),
     cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.type === "transfer" ? (
          <IconMinus color="red"/>
        ) : (
         <IconPlus color="green"/>
          
        )}
        {row.original.amount.toFixed(2)}
      </Badge>
    ),
       
     
  },
 
   {
    accessorKey: "status",
    header: ()=>(<div className="text-gray-500">Status</div>),
   cell: ({ row }) => (
      <Badge variant="outline" className="text-muted-foreground px-1.5">
        {row.original.status === "completed" ? (
          <IconCircleCheckFilled className="fill-green-500 dark:fill-green-400" />
        ) : (row.original.status === "in_process" 
          ? (<IconLoader />) 
          : (<IconExclamationCircleFilled  className="fill-red-500 dark:fill-red-400"/>)
          
        )}
        {row.original.status === "in_process" 
        ? ("In process") 
        : (row.original.status)}
      </Badge>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(transaction._id)}
            >
              Copy payment ID
            </DropdownMenuItem>
           
            <DropdownMenuSeparator />

             {transaction.status !== "in_process" 
            ? (
              <Link href={`/dashboard/transactions/${transaction._id}`} passHref>
                <DropdownMenuItem>
                    View transaction details
                </DropdownMenuItem>
            </Link>
            ) 
            : (
               <Link href={`/dashboard/transactions/${transaction._id}/progression`} passHref>
                <DropdownMenuItem>
                    View transaction progression
                </DropdownMenuItem>
            </Link>
            )}
           
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },


]




