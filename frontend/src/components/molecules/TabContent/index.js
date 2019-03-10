import React from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo'

import Loading from 'components/atoms/Loading'

const TabContent = ({ QUERY }) => {

  return (
    <Query query={QUERY}>
      {({ data, loading }) => (
        <>
          {
            loading 
              ? <Loading height="auto"/> 
              : JSON.stringify(data)
          }
        </>
      )}
    </Query>
  )
}

TabContent.propTypes = {
  QUERY: PropTypes.object.isRequired,
}

export default TabContent