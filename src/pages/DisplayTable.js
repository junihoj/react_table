import React, {useMemo} from 'react';
import {
    useTable, 
    useSortBy, 
    useGlobalFilter,
     useFilters,
     usePagination,
    } from 'react-table';
import DATA from '../data_model/response.json';
import { COLUMNS } from '../data_model/columns';
import { GlobalFilter } from '../components/GlobalFilter';
import { Checkbox } from '../components/Checkbox';
import { Sort, ArrowDropDown, ArrowDropUp} from '@material-ui/icons';

export const DisplayTable = (props)=>{
    const columns = useMemo(()=>COLUMNS, [])
    const data = useMemo(()=>props.data, [])

    // creating a react-table instance
    const tableInstance = useTable({
        columns,
        data,
    }, useGlobalFilter, useFilters, useSortBy, usePagination)

    const {
        getTableProps,
        getTableBodyProps,
        rows,
        prepareRow,
        //Headers
        footerGroups,
        headerGroups,
        //Global filter
        state,
        setGlobalFilter,
        //Hiding columns
        allColumns,
        getToggleHideAllColumnsProps,
        // Pagination 
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        pageOptions,
        gotoPage,
        pageCount,
        setPageSize,
    } = tableInstance

    const {globalFilter, pageIndex, pageSize} = state


    return (
        <>
            <div className="filter-wrapper">
                <p>
                    <Checkbox {...getToggleHideAllColumnsProps()} /> Toggle All
                </p>
                <div class="head">
                    {
                        allColumns.map(column=>(
                            <div key={column['ORDER ID']}>
                                <input type='checkbox' {...column.getToggleHiddenProps()} />
                                <label> {column.Header} </label>
                            </div>
                        ))
                    }
                </div>
           
                <div class="drop-search">
                    <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                        {
                        [5,10, 25,50].map(pageSize=>(
                            <option key={pageSize} value={pageSize}>
                                    show {pageSize}
                            </option>
                        ))
                        }
                    </select>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                </div>
            </div> 
            <div class="table-container">
                <table {...getTableProps()}>
                    <thead>
                        {
                            headerGroups.map(headerGroup=>(
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column=>(
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                    {column.render("Header")}
                                        {/*TODO: ADD FONTAWESOME iCON FOR SORTING OR MATERIAL UI*/}
                                    <span>
                                        {column.isSorted ? <div><Sort />{column.isSortedDesc ? <ArrowDropUp></ArrowDropUp>:<ArrowDropDown/>}</div>:""}
                                    </span>
                                    <div>{column.canFilter ? column.render('Filter'): null}</div>
                                    </th>
                                ))}
                
                            </tr>
                            ))
                        }
                
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {
                            page.map(row=>{
                                prepareRow(row)
                                return (
                                    <tr {...row.getRowProps()}>
                                        {row.cells.map(cell=>(
                                            <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                        ))}
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        {
                            footerGroups.map(footerGroup=>(
                                <tr {...footerGroup.getFooterGroupProps()}>
                                    {
                                        footerGroup.headers.map(column=>(
                                            <td {...column.getHeaderProps()}>{column.render('Footer')}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tfoot>
                </table>
            </div>

            <div className="footer">
                <span>
                    Page(' ')
                    <strong>{pageIndex + 1} of {pageOptions.length}</strong>
                    ' '
                </span>
                <span>
                    | Go to page: {' '}
                    <input type="number" defaultValue={pageIndex + 1}
                        onChange={e=>{
                            const pageNumber = e.target.value? Number(e.target.value) - 1 : 0
                            gotoPage(pageNumber)
                        }} style={{width: '50px'}}
                    />
                </span>
                <button onClick={()=>gotoPage(0)} disabled={!canPreviousPage}>{'<<'}</button>
                <button onClick={()=> previousPage()} disabled={!canPreviousPage}>Previous</button>
                <button onClick={()=>nextPage()} disabled={!canNextPage}>Next</button>
                <button onClick={()=>gotoPage(pageCount - 1)}>{'>>'}</button>
            </div>
        </>    
    )

}