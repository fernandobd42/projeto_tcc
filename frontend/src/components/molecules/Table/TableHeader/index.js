import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import MuiTableHead from '@material-ui/core/TableHead'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiTooltip from '@material-ui/core/Tooltip'
import MuiTableSortLabel from '@material-ui/core/TableSortLabel'

import theme from 'app/theme'

const CustomTableHeader = styled(MuiTableHead)`
  && {
    background: ${theme.palette.primary.main};
  }
`

const CustomMuiTableSortLabel = styled(MuiTableSortLabel)`
  && {
    color: ${theme.palette.textPrimary} !important;
    font-weight: ${theme.typography.fontWeightHigh};
    font-size: ${theme.typography.fontSize}px;

    &:hover {
      color: ${theme.palette.textPrimary};
    }
  }
`

const createSortHandler = (property, onRequestSort) => event => onRequestSort(event, property)

const TableHeader = ({ headers, order, orderBy, onRequestSort }) => (
  <CustomTableHeader>
    <MuiTableRow>
      {
        headers
        .map(row => 
          <MuiTableCell key={row.id} align={row.align} variant='head' sortDirection={orderBy === row.id ? order : false}>
            <MuiTooltip title='Reordenar' placement={row.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
              <CustomMuiTableSortLabel active={orderBy === row.id} direction={order} onClick={createSortHandler(row.id, onRequestSort)}>
                {row.label}
              </CustomMuiTableSortLabel>
            </MuiTooltip>
          </MuiTableCell>
        )
      }
      <MuiTableCell key='options'>
      
      </MuiTableCell>
    </MuiTableRow>
  </CustomTableHeader>
)

TableHeader.propTypes = {
  headers: PropTypes.array.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  onRequestSort: PropTypes.func.isRequired
}

export default TableHeader
