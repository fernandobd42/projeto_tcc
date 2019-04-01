import React, { useState } from 'react'
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
  const { data, loading } = useQuery(ALL_POSTS_QUERY)
  const [rows, setRows] = useState(undefined)

  if (!!Object.keys(data).length && !rows)  {
    formatObjectRows(data.allPosts, setRows)
  }

  if (loading || !rows) {
    return <Loading/>
  }

  return(
    <CustomFlex direction='column' height='auto'>
      {
        rows.map(row => (
          <PostCard 
            key={row.id}
            title={row.title} 
            content={row.content}
            date='30/03/2019 05:30'
          />
        ))
      }
    </CustomFlex>
  )
}

export default Feed