import React,{useState} from 'react';
import { useAsyncDebounce } from 'react-table/dist/react-table.development';

export const ColumnFilter = ({column})=>{
    const {filterValue, setFilter} = column
    const onChange = useAsyncDebounce(value=>{
        useState(setFilter(value ||  undefined))
    },300)
    return (
        <span>
            Search: {' '}
            <input type="text" value={filterValue || ''}  onChange={(e)=>setFilter(e.target.value)} />
        </span>
    )
}