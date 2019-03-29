import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks' 
import * as R from 'ramda'

import DRAFTS_QUERY from './Query'

import Loading from 'components/atoms/Loading'
import TabContent from 'components/organisms/TabContent'

const formatObjectRows = (rows, setRows) => {
  const rowsWithAllObject = rows.map(element => (element = { ...element, allObject: element }))
  const rowsFormated = rowsWithAllObject.map(R.omit(['__typename', 'id', 'content']))
  setRows(rowsFormated)
}

const DraftsTab = ({ tabIndex }) => {
  const { data, loading, refetch } = useQuery(DRAFTS_QUERY)
  const [rows, setRows] = useState(undefined)

  useEffect(() => {
    if (!loading && data) {
      formatObjectRows(data.drafts, setRows)
    }

    if (tabIndex === 0) {
      refetch()
    }
  }, [tabIndex, data])

  if (loading) {
    return <Loading height='auto' />
  }

  if (!!Object.keys(data).length && !rows)  {
    formatObjectRows(data.drafts, setRows)
  }

  return <TabContent rows={rows} refetch={refetch} showPublishButton={true} />
}

export default DraftsTab