import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'

import PUBLISH from './Mutation'

import MuiTableBody from '@material-ui/core/TableBody'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiButton from '@material-ui/core/Button'
import MuiIconDelete from '@material-ui/icons/Delete'
import MuiIconEdit from '@material-ui/icons/Edit'

import Flex from 'components/atoms/Flex'
import Alert from 'components/atoms/Alert'
import AlertConfirm from 'components/atoms/AlertConfirm'

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

const CustomTableCell = styled(MuiTableCell)`
  && {
    padding-right: 16px !important;
  }
`

const StyledBoolItem = styled.strong`
  && {
    color: ${props => props.item ? `${theme.palette.success[700]}` : `${theme.palette.danger[700]}`};
  }
`

const CustomButton = styled(MuiButton)`
  && {
    min-width: auto;
    padding 4px 6px 4px 4px;
    color: ${theme.palette.textPrimary};
    background-color: ${props => props.btncolor} !important;
    right: ${props => props.right || 0}px;

    &:hover {
      opacity: 0.75;
      transition: all .3s ease-in-out;
    }
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

const publishItem = (mutation, item, refetchRows) => async () => {
  const id = item.allObject.id

  try {
    const { data } = await mutation({
      variables: 
      {
        id
      }
    })

    if (data.publish) {
      refetchRows()
    }
  } catch (error) {
    Alert('error', 'Error', 'Erro ao publicar post!')
  }

}

const CustomCell = ({ item }) => (
  typeof item === 'boolean' 
    ? <StyledBoolItem item={item}>{item ? 'Sim' : 'Não'}</StyledBoolItem>
    : item
)

const TableBody = ({ tableRows, currentPage, tableOrder, tableOrderBy, tableRowsPerPage, refetchRows }) => (
  <Mutation mutation={PUBLISH}>
   {(publish, { loading }) => (
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
              <CustomTableCell key='options' align='right'>
                <Flex height='auto' justify="flex-end">
                  { 
                    !item.published && 
                      <CustomButton size='small' disabled={loading} right={12} btncolor={theme.palette.primary.main} onClick={() =>
                        AlertConfirm(
                          'Atenção', 
                          'Após confirmar está ação não poderá ser desfeita.', 
                          'Rascunho publicado com sucesso.',
                          publishItem(publish, item, refetchRows),
                      )}>
                        Publicar
                      </CustomButton>
                  }
                  <CustomButton size='small' btncolor={theme.palette.primary.main} right={7} onClick={() => console.log('editar')}>
                    <MuiIconEdit fontSize='small' />
                    Editar
                  </CustomButton>
                  <CustomButton size='small' btncolor={theme.palette.danger[700]} onClick={() => console.log('excluir')}>
                    <MuiIconDelete fontSize='small' />
                    Excluir
                  </CustomButton>
                </Flex>
              </CustomTableCell>
            </CustomTableRow>
          ))
        }
      </CustomTableBody>
   )}
  </Mutation>
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
