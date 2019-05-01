import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Mutation } from 'react-apollo'
import styled, { css } from 'styled-components'

import theme from 'app/theme'
import { PUBLISH, DELETE_POST } from './Mutation'

import MuiTableBody from '@material-ui/core/TableBody'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import MuiButton from '@material-ui/core/Button'
import MuiIconDelete from '@material-ui/icons/Delete'
import MuiIconEdit from '@material-ui/icons/Edit'

import Flex from 'components/atoms/Flex'
import Alert from 'components/atoms/Alert'
import AlertConfirm from 'components/atoms/AlertConfirm'
import { ContextAPI } from 'components/organisms/TabContent'

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

    ${props => 
      props.disabled && css`
        cursor: not-allowed;
      `
    }
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
    color: ${theme.palette.textPrimary} !important;
    background-color: ${props => props.btncolor} !important;
    right: ${props => props.right || 0}px;

    &:hover {
      opacity: 0.75;
      transition: all .3s ease-in-out;
    }

    ${props => 
      props.disabled && css`
        background-color: gray !important;
      `
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

const publishDeleteItem = (mutation, item, refetchRows, string) => async () => {
  const id = item.allObject.id

  try {
    const { data } = await mutation({
      variables: 
      {
        id
      }
    })

    if (data) {
      refetchRows()
    }
  } catch (error) {
    if (!!error.networkError) {
      Alert('error', `Error', 'Erro ao ${string} item!`)
    }
  }
}

const CustomCell = ({ item }) => (
  typeof item === 'boolean' 
    ? <StyledBoolItem item={item}>{item ? 'Sim' : 'Não'}</StyledBoolItem>
    : item
)

const TableBody = ({ tableRows, currentPage, tableOrder, tableOrderBy, tableRowsPerPage, history }) => {
  const redirectToEditItem = id => e => history.push('/admin/editItem/'+ id)

  return ( 
    <ContextAPI.Consumer>
      {refetch => (
      <CustomTableBody>
        {
          stableSort(tableRows, getSorting(tableOrder, tableOrderBy))
          .slice(currentPage * tableRowsPerPage, currentPage * tableRowsPerPage + tableRowsPerPage)
          .map(item => (
            <CustomTableRow key={item.allObject.id} id='table-row'>
              {
                Object.entries(item)
                .map(([key, value]) => key !== 'allObject' && 
                  <MuiTableCell key={key}>
                    <CustomCell item={value} />
                  </MuiTableCell>
                )
              }
              <Mutation mutation={PUBLISH}>
                {(publish, { loading: loadingPublish }) => (
                <Mutation mutation={DELETE_POST}>
                  {(deletePost, { loading: loadingDeletePost }) => (
                  <CustomTableCell key='options' align='right' disabled={loadingPublish || loadingDeletePost}>
                    <Flex height='auto' justify='flex-end'>
                      { 
                        !item.published && 
                          <CustomButton size='small' disabled={loadingPublish || loadingDeletePost} right={12} btncolor={theme.palette.success[700]} onClick={() =>
                            AlertConfirm(
                              'Rascunho publicado com sucesso.',
                              publishDeleteItem(publish, item, refetch, 'publicar'),
                          )}>
                            Publicar
                          </CustomButton>
                      }
                      <CustomButton size='small' id={!item.published ? 'editar-rascunho' : 'editar-publicao'} disabled={loadingPublish || loadingDeletePost} btncolor={theme.palette.primary.main} right={7} onClick={redirectToEditItem(item.allObject.id)}>
                        <MuiIconEdit fontSize='small' />
                        Editar
                      </CustomButton>
                      <CustomButton size='small' disabled={loadingPublish || loadingDeletePost} btncolor={theme.palette.danger[700]} onClick={() => 
                        AlertConfirm(
                          'Item excluído com sucesso.',
                          publishDeleteItem(deletePost, item, refetch, 'excluir'),
                      )}>
                        <MuiIconDelete fontSize='small' />
                        Excluir
                      </CustomButton>
                    </Flex>
                  </CustomTableCell>
                  )}
                </Mutation>
                )}
              </Mutation>
            </CustomTableRow>
          ))
        }
      </CustomTableBody>
      )}
    </ContextAPI.Consumer>
  )
}

TableBody.propTypes = {
  tableRows: PropTypes.array.isRequired,
  currentPage: PropTypes.number,
  tableOrder: PropTypes.string,
  tableOrderBy: PropTypes.string,
  tableRowsPerPage: PropTypes.number,
}

export default withRouter(TableBody)
