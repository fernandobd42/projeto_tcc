import React, { useState, useEffect } from 'react'
import { useQuery } from 'react-apollo-hooks' 
import styled from 'styled-components'

import theme from 'app/theme'
import ALL_POSTS_QUERY from './Query'

import Loading from 'components/atoms/Loading'
import Flex from 'components/atoms/Flex'
import PostCard from 'components/atoms/PostCard'

const CustomFlex = styled(Flex)`
  && {
    margin: ${theme.spacing.unit * 4}px 0;
  }
`

const formatObjectRows = (rows, setRows) => {
  setRows(rows)
}

const Feed = () => {
  const { data, loading, refetch } = useQuery(ALL_POSTS_QUERY, { notifyOnNetworkStatusChange: true })
  const [fetchData, setFetchData] = useState(true)
  const [rows, setRows] = useState(undefined)

  useEffect(() => {
    if (!!Object.keys(data).length)  {
      formatObjectRows(data.allPosts, setRows)
    }

    if (fetchData) {
      refetch()
      setFetchData(false)
    }
  }, [data, refetch, fetchData])

  if (loading || !rows) {
    return <Loading/>
  }

  return(
    <CustomFlex direction='column' height='auto'>
      {
        rows.map(row => (
          <PostCard 
            key={row.id}
            row={row}
          />
        ))
      }
    </CustomFlex>
  )
}

export default Feed