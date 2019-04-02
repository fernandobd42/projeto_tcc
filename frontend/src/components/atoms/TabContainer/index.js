import React from 'react'
import PropTypes from 'prop-types'

import MuiTypography from '@material-ui/core/Typography'

const TabContainer = ({ children, direction }) => (
  <MuiTypography component='div' dir={direction} style={{ padding: 8 * 3 }}>
    {children}
  </MuiTypography>
)

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  direction: PropTypes.string,
}

export default TabContainer 
