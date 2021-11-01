import './styles.css'
import React from 'react';
import { useTable } from 'react-table'
import update from 'immutability-helper'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Row from '../Row';
import { useMockTable } from '../../hooks/useMockTable';

const Table = () => {
    const { columns, data } = useMockTable();
    const [records, setRecords] = React.useState(data)

    const getRowId = React.useCallback(row => {
        return row.id
    }, [])

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        data: records,
        columns,
        getRowId,
    })

    const moveRow = (dragIndex, hoverIndex) => {
        const dragRecord = records[dragIndex]
        setRecords(
            update(records, {
                $splice: [
                    [dragIndex, 1],
                    [hoverIndex, 0, dragRecord],
                ],
            })
        )
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            <th></th>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(
                        (row, index) =>
                            prepareRow(row) || (
                                <Row
                                    index={index}
                                    row={row}
                                    moveRow={moveRow}
                                    {...row.getRowProps()}
                                />
                            )
                    )}
                </tbody>
            </table>
        </DndProvider>
    )
}

export default Table;