import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import MuiTableBody from '@material-ui/core/TableBody'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'

import theme from 'app/theme'

const CustomTableBody = styled(MuiTableBody)`
  && {
    overflow-x: auto;
  }
`

const CustomTableRow = styled(MuiTableRow)`
  && {
    &:hover {
      cursor: pointer;
    }
  }
`

const StyledBoolItem = styled.strong`
  && {
    color: ${props => props.item ? `${theme.palette.primary.main}` : `${theme.palette.grey[500]}`};
  }
`

const desc = (a, b, orderBy) => b[orderBy] < a[orderBy] ? -1 : b[orderBy] > a[orderBy] ? 1 : 0

const getSorting = (order, orderBy) =>
  order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy)

const stableSort = (array, cmp) => {
  const stabilizedThis = array.map((element, index) => [element, index])
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map(element => element[0])
}

const CustomCell = ({ item }) => (
  typeof item === 'boolean' 
    ? <StyledBoolItem item={item}>{item.toString()}</StyledBoolItem>
    : item
)

const TableBody = ({ tableRows, currentPage, tableOrder, tableOrderBy, tableRowsPerPage, selectRow }) => (
  <CustomTableBody>
    {
      stableSort(tableRows, getSorting(tableOrder, tableOrderBy))
      .slice(currentPage * tableRowsPerPage, currentPage * tableRowsPerPage + tableRowsPerPage)
      .map(item => (
        <CustomTableRow key={item.allObject.id} hover onClick={() => selectRow(item)}>
          {
            Object.entries(item)
            .map(([key, value]) => key !== 'allObject' && 
              <MuiTableCell key={key}>
                <CustomCell item={value} />
              </MuiTableCell>
            )
          }
          <MuiTableCell key='options'>
          
          </MuiTableCell>
        </CustomTableRow>
      ))
    }
  </CustomTableBody>
)

TableBody.propTypes = {
  tableRows: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  tableOrder: PropTypes.string,
  tableOrderBy: PropTypes.string,
  tableRowsPerPage: PropTypes.number,
  selectRow: PropTypes.func,
}

export default TableBody
