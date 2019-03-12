import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'
import * as R from 'ramda'

import Loading from 'components/atoms/Loading'
import Table from 'components/molecules/Table'

const headers = [
  { id: 'title', label: 'Título', align: 'left', reorder: true },
  { id: 'published', label: 'Publicado', align: 'left', reorder: false },
  { id: 'publishPost', label: '', align: 'center', reorder: false },
  { id: 'options', label: 'Opções', align: 'right', reorder: false },
]

const formatObjectRows = rows => {
  const rowsWithAllObject = rows.map(element => (element = { ...element, allObject: element }))
  const rowsFormated = rowsWithAllObject.map(R.omit(['__typename', 'id', 'content']))
  return rowsFormated
}

const TabContent = ({ QUERY, queryName }) => (
  <Query query={QUERY}>
    {({ data, loading }) => (
      loading 
        ? <Loading height='auto'/> 
        : <Table
            headers={headers}
            rows={formatObjectRows(data[`${queryName}`])}
          />
    )}
  </Query>
)

TabContent.propTypes = {
  QUERY: PropTypes.object.isRequired,
}

export default TabContent