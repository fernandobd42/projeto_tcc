import React, { createContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import theme from 'app/theme'

import MuiTypography from '@material-ui/core/Typography'
import MuiButton from '@material-ui/core/Button'
import MuiIconButton from '@material-ui/core/IconButton'
import MuiTooltip from '@material-ui/core/Tooltip'
import MuiIconSearch from '@material-ui/icons/Search'

import Loading from 'components/atoms/Loading'
import Flex from 'components/atoms/Flex'
import Input from 'components/atoms/Input'
import Table from 'components/molecules/Table'

export const ContextAPI = createContext()

const headers = [
  { id: 'title', label: 'Título', align: 'left', reorder: true },
  { id: 'published', label: 'Publicado', align: 'left', reorder: false },
  { id: 'options', label: 'Opções', align: 'right', reorder: false },
]

const CustomFlex = styled(Flex)`
  && {
    padding-bottom: ${theme.spacing.unit * 2}px;

    > button {
      color: ${theme.palette.textPrimary};
      margin-left: ${theme.spacing.unit * 4}px;
    }
  }
`

const pressEnter = (value, rows, setTmpRows) => event => {
  if (event.keyCode === 13) {
    search(value, rows, setTmpRows)()
  }
}

const search = (value, rows, setTmpRows) => _ => {
  const newRows = rows.filter(row => row.title.toLowerCase().includes(value.toLowerCase()))
  setTmpRows(newRows)
}

const TabContent = ({ rows, refetch, showPublishButton, history }) => {
  const redirectToNewDraft = () => history.push('/admin/newDraft')
  const [filterValue, setFilterValue] = useState('')
  const [tmpRows, setTmpRows] = useState(undefined)
  
  useEffect(() => {
    if (!filterValue && !!rows) {
      setTmpRows(rows)
    }
    
    if (!!rows) {
      search(filterValue, rows, setTmpRows)
    }
  }, [filterValue, rows])  

  if (!tmpRows) {
    return <Loading height='auto' /> 
  }

  return (
    <ContextAPI.Provider value={refetch}>
      <CustomFlex height='auto'>
        <Input 
          value={filterValue}
          onChange={e => setFilterValue(e.target.value)}
          label='Filtro'
          placeholder='Busque por algum título'
          onKeyUp={pressEnter(filterValue, rows, setTmpRows)}
          endIcon={
            <MuiTooltip title='Pesquisar' aria-label='Pesquisar'>
              <MuiIconButton onClick={search(filterValue, rows, setTmpRows)}>
                <MuiIconSearch />
              </MuiIconButton>
            </MuiTooltip>
          }
        />
        {
          showPublishButton &&
          <MuiButton variant="contained" color="primary" onClick={redirectToNewDraft}>Novo</MuiButton>
        }
      </CustomFlex>

      {
        !tmpRows.length
        ? <MuiTypography variant='h6'>Nenhum item encontrado</MuiTypography>
        : <Table
            headers={headers}
            rows={tmpRows}
          />
      }
    </ContextAPI.Provider>
  )
}

TabContent.propTypes = {
  rows: PropTypes.array
}

export default withRouter(TabContent)