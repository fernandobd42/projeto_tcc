import React from 'react'
import PropTypes from 'prop-types'

import MuiTypography from '@material-ui/core/Typography'

const TabContainer = ({ children, dir }) => (
  <MuiTypography component='div' dir={dir} style={{ padding: 8 * 3 }}>
    {children}
  </MuiTypography>
)

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
}

export default TabContainer 
