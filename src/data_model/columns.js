import _ from 'lodash';
import { format } from 'date-fns';
import moment from 'moment';
import { ColumnFilter } from './ColumnFilter';
export const COLUMNS = [
    {
        Header: "Order ID",
        Footer: "Order ID",
        accessor: "Order ID",
        Filter:ColumnFilter,
        disableFilters:true,
    },
    {
        Header: "Profit",
        Footer: "Profit",
        accessor: "Profit",
        Filter:ColumnFilter,
    },
    {
        Header: "City",
        Footer: "City",
        accessor: "City",
        Filter:ColumnFilter,
    },
    {
        Header: "Customer Name",
        Footer: "Customer Name",
        accessor: "Customer Name",
        Filter:ColumnFilter,
    },
    {
        Header: "Product Name",
        accessor: "Product Name",
        Footer: 'Product Name',
        Filter:ColumnFilter,
    },
    {
        Header: "Row ID",
        Footer: "Row ID",
        accessor: "Row ID",
        Filter:ColumnFilter,
    },
    {
        Header: "Country",
        Footer: "Country",
        accessor: "Country",
        Filter:ColumnFilter,
    },
    {
        Header: "Discount",
        Footer: "Discount",
        accessor: "Discount",
        Filter:ColumnFilter,
    },
    {
        Header: "Customer ID",
        Footer: "Customer ID",
        accessor: "Customer ID",
        Filter:ColumnFilter,
    },
    {
        Header: "Region",
        Footer: "Region",
        accessor: "Region",
        Filter:ColumnFilter,
    },
    {
        Header: "Quantity",
        Footer: "Quantity",
        accessor: "Quantity",
        Filter:ColumnFilter,
    },
    {
        Header: "Segment",
        Footer: "Segment",
        accessor: "Segment",
        Filter:ColumnFilter,
    },
    {
        Header: "State",
        Footer: "State",
        accessor: "State",
        Filter:ColumnFilter,
    },
    {
        Header: "Ship Mode",
        Footer: "Ship Mode",
        accessor: "Ship Mode",
        Filter:ColumnFilter,
    },
    {
        Header: "Sub-Category",
        Footer: "Sub-Category",
        accessor: "Sub-Category",
        Filter:ColumnFilter,
    },
    {
        Header: "Postal Code",
        Footer: "Postal Code",
        accessor: "Postal Code",
        Filter:ColumnFilter,
    },
    {
        Header: "Ship Date",
        Footer: "Ship Date",
        accessor: "Ship Date",
        Filter:ColumnFilter,
        Cell:({value})=>{
            // month/day/Year
            let dateArray = value.split('/');
            // let d = Date.parse(value);
            // dd/MM/yyyy
            return format(new Date(parseInt(dateArray[2]), parseInt(dateArray[0]),parseInt(dateArray[1]) ), 'yyyy/MM/dd');
            
        },
        sortType: (rowA, rowB, columnId, desc) => {
            const defaultVal = desc ? 'AAAAAAAAAAAA' : 'ZZZZZZZZ';
            return (rowA.values[columnId] ?? defaultVal)
              .localeCompare(rowB.values[columnId] ?? defaultVal);
          }
    },
    {
        Header: "Category",
        Footer: "Category",
        accessor: "Category",
        Filter:ColumnFilter,
    },
    {
        Header: "Product ID",
        Footer: "Product ID",
        accessor: "Product ID",
        Filter:ColumnFilter,
    },
    {
        Header: "Sales",
        Footer: "Sales",
        accessor: "Sales",
        Filter:ColumnFilter,
    },
    {
        Header: "Order Date",
        Footer: "Order Date",
        accessor: "Order Date",
        Filter:ColumnFilter,
    },
]






// const customStringSort: any = React.useCallback((rowA: Row, rowB: Row, columnId: string, desc: boolean) => 
//   {
//   const defaultVal = desc ? 'AAAAAAAAAAAA' : 'ZZZZZZZZ';
//   return (rowA.values[columnId] ?? defaultVal).localeCompare(rowB.values[columnId] ?? defaultVal);
//   },
// []);
    
// const customStringSortMemo = React.useMemo(() => customStringSort[customStringSort]);







// function compareNumericString(rowA, rowB, id, desc) {
//     let a = Number.parseFloat(rowA.values[id]);
//     let b = Number.parseFloat(rowB.values[id]);
//     if (Number.isNaN(a)) {  // Blanks and non-numeric strings to bottom
//         a = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
//     }
//     if (Number.isNaN(b)) {
//         b = desc ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY;
//     }
//     if (a > b) return 1; 
//     if (a < b) return -1;
//     return 0;
// }