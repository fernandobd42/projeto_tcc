import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import MuiTableBody from '@material-ui/core/TableBody'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiButton from '@material-ui/core/Button'
import MuiIconDelete from '@material-ui/icons/Delete'
import MuiIconEdit from '@material-ui/icons/Edit'

import Flex from 'components/atoms/Flex'

import theme from 'app/theme'

const CustomTableBody = styled(MuiTableBody)`
  && {
    overflow-x: auto;
  }
`

const CustomTableRow = styled(MuiTableRow)`
  && {
    &:nth-child(odd) {
      background-color: ${theme.palette.grey[100]};
    }

    &:hover {
      cursor: pointer;
    }
  }
`

const StyledBoolItem = styled.strong`
  && {
    color: ${props => props.item ? `${theme.palette.primary.main}` : `${theme.palette.danger[700]}`};
  }
`

const CustomButton = styled(MuiButton)`
  && {
    min-width: auto;
    padding 4px;
    color: ${props => props.btncolor};
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
    ? <StyledBoolItem item={item}>{item ? 'Sim' : 'Não'}</StyledBoolItem>
    : item
)

const TableBody = ({ tableRows, currentPage, tableOrder, tableOrderBy, tableRowsPerPage }) => (
  <CustomTableBody>
    {
      stableSort(tableRows, getSorting(tableOrder, tableOrderBy))
      .slice(currentPage * tableRowsPerPage, currentPage * tableRowsPerPage + tableRowsPerPage)
      .map(item => (
        <CustomTableRow key={item.allObject.id}>
          {
            Object.entries(item)
            .map(([key, value]) => key !== 'allObject' && 
              <MuiTableCell key={key}>
                <CustomCell item={value} />
              </MuiTableCell>
            )
          }
          <MuiTableCell key='publishPost' align='center'>
            <CustomButton size='small' btncolor={theme.palette.primary.main} onClick={() => console.log('publicar')}>
              { !item.published && 'Publicar' }
            </CustomButton>
          </MuiTableCell>
          <MuiTableCell key='options' align='right'>
            <Flex direction='column' height='auto' alignItems='flex-end'>
              <CustomButton size='small' btncolor={theme.palette.primary.main} onClick={() => console.log('editar')}>
                <MuiIconEdit fontSize='small' />
                Editar
              </CustomButton>
              <CustomButton size='small' btncolor={theme.palette.danger[700]} onClick={() => console.log('excluir')}>
                <MuiIconDelete fontSize='small' />
                Excluir
              </CustomButton>
            </Flex>
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
