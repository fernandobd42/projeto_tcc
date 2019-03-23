import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useQuery } from 'react-apollo-hooks'
import styled from 'styled-components'
import * as R from 'ramda'

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

const formatObjectRows = (queryData, setRows, setTmpRows) => {
  const rowsWithAllObject = queryData.map(element => (element = { ...element, allObject: element }))
  const rowsFormated = rowsWithAllObject.map(R.omit(['__typename', 'id', 'content']))
  setRows(rowsFormated)
  setTmpRows(rowsFormated)
}

const pressEnter = (value, rows, setTmpRows) => event => {
  if (event.keyCode === 13) {
    search(value, rows, setTmpRows)()
  }
}

const search = (value, rows, setTmpRows) => _ => {
  const newRows = rows.filter(row => row.title.toLowerCase().includes(value))
  setTmpRows(newRows)
}

const TabContent = ({ QUERY, queryName, tabIndex }) => {
  const [filterValue, setFilterValue] = useState('')
  const [tmpRows, setTmpRows] = useState(undefined)
  const [rows, setRows] = useState(undefined)
  const {data, loading, refetch} = useQuery(QUERY)

  useEffect(() => {
    if (!filterValue && !!rows) {
      setTmpRows(rows)
    }

    if (!!data.drafts) {
      formatObjectRows(data[`${queryName}`], setRows, setTmpRows)
    }

    if (tabIndex === 1) {
      refetch()
      formatObjectRows(data[`${queryName}`], setRows, setTmpRows)
    }

    if (!!rows) {
      search(filterValue, rows, setTmpRows)
    }
  }, [filterValue, data, tabIndex])

  if (loading) {
    return <Loading height='auto' /> 
  }

  if (!rows) {
    formatObjectRows(data[`${queryName}`], setRows, setTmpRows)
    return <Loading height='auto' /> 
  }

  return (
    <>
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
          queryName === 'drafts' &&
          <MuiButton variant="contained" color="primary" onClick={() => console.log('novo')}>Novo</MuiButton>
        }
      </CustomFlex>

      {
        !tmpRows.length
        ? <MuiTypography variant='h6'>Nenhum item encontrado</MuiTypography>
        : <Table
            headers={headers}
            rows={tmpRows}
            refetchQuery={refetch}
          />
      }
    </>
  )
}

TabContent.propTypes = {
  QUERY: PropTypes.object.isRequired,
}

export default TabContent