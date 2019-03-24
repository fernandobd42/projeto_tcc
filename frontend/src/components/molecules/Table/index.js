import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MuiTable from '@material-ui/core/Table'
import MuiTablePagination from '@material-ui/core/TablePagination'

import TableHeader from './TableHeader'
import TableBody from './TableBody'

const MuiPagination = styled(MuiTablePagination)`
  && {
    > div {
      height: 46px
    }
  }
`

const tableBody = (order, orderBy, rowsPerPage, rows) => ({
  tableOrder: order,
  tableOrderBy: orderBy,
  tableRowsPerPage: rowsPerPage,
  tableRows: rows
})

const handleChangePage = setCurrentPage => (_, page) => setCurrentPage(page)

const handleChangeRowsPerPage = setRowsPerPage => event => setRowsPerPage(event.target.value)

const handleRequestSort = (order, setOrder, setOrderBy, orderBy) => (_, property) => {
  const newOrderBy = property
  let newOrder = 'desc'

  if (orderBy === property && order === 'desc') {
    newOrder = 'asc'
  }

  setOrder(newOrder)
  setOrderBy(newOrderBy)
}

const Table = ({ headers, rows }) => {
  const rowsPerPageOptions = [10, 25, 50, 100]
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0])
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [currentPage, setCurrentPage] = useState(0)
  const { tableOrder, tableOrderBy, tableRowsPerPage, tableRows } = tableBody(order, orderBy, rowsPerPage, rows)

  return (
    <>
      <MuiTable>
        <TableHeader 
          headers={headers} 
          order={tableOrder} 
          orderBy={tableOrderBy} 
          onRequestSort={handleRequestSort(order, setOrder, setOrderBy, orderBy)} 
        />
        <TableBody
          tableRows={tableRows}
          currentPage={currentPage}
          tableOrder={tableOrder}
          tableOrderBy={tableOrderBy}
          tableRowsPerPage={tableRowsPerPage}
        />
      </MuiTable>
      <MuiPagination
        component='div'
        rowsPerPage={tableRowsPerPage}
        rowsPerPageOptions={rowsPerPageOptions}
        count={tableRows.length}
        page={currentPage}
        backIconButtonProps={{
          'aria-label': 'Próxima página'
        }}
        nextIconButtonProps={{
          'aria-label': 'Página anterior'
        }}
        onChangeRowsPerPage={handleChangeRowsPerPage(setRowsPerPage)}
        onChangePage={handleChangePage(setCurrentPage)}
        labelRowsPerPage='Linhas por página'
      />
    </>
  )
}

Table.propTypes = {
  headers: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
}

export default Table
