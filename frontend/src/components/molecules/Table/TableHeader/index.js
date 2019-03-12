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

const CustomTableCel = styled(MuiTableCell)`
  && {
    color: ${theme.palette.textPrimary} !important;
    font-weight: ${theme.typography.fontWeightHigh};
    font-size: ${theme.typography.fontSize}px;
  }
`

const CustomTableSortLabel = styled(MuiTableSortLabel)`
  && {
    color: ${theme.palette.textPrimary} !important;

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
          <CustomTableCel key={row.id} align={row.align} variant='head' sortDirection={orderBy === row.id ? order : false}>
            {
              row.reorder 
              ? <MuiTooltip title='Reordenar' placement={row.numeric ? 'bottom-end' : 'bottom-start'} enterDelay={300}>
                  <CustomTableSortLabel active={orderBy === row.id} direction={order} onClick={createSortHandler(row.id, onRequestSort)}>
                    {row.label}
                  </CustomTableSortLabel>
                </MuiTooltip>
              : row.label
            }
          </CustomTableCel>
        )
      }
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
