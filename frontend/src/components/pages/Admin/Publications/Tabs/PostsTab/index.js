import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks' 
import * as R from 'ramda'

import POSTS_QUERY from './Query'

import Loading from 'components/atoms/Loading'
import TabContent from 'components/organisms/TabContent'

const formatObjectRows = (rows, setRows) => {
  const rowsWithAllObject = rows.map(element => (element = { ...element, allObject: element }))
  const rowsFormated = rowsWithAllObject.map(R.omit(['__typename', 'id', 'content']))
  setRows(rowsFormated)
}

const PostsTab = ({ tabIndex }) => {
  const { data, loading, refetch } = useQuery(POSTS_QUERY, { notifyOnNetworkStatusChange: true })
  const [rows, setRows] = useState(undefined)

  useEffect(() => {
    if (!loading && !!data.posts) {
      formatObjectRows(data.posts, setRows)
    }

    if (tabIndex === 1) {
      refetch()
    }
  }, [tabIndex, data])

  if (loading) {
    return <Loading height='618px' />
  }

  if (!!Object.keys(data).length && !rows)  {
    formatObjectRows(data.posts, setRows)
  }

  return <TabContent rows={rows} refetch={refetch} />
}

export default PostsTab