import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import MuiPaper from '@material-ui/core/Paper'

const CustomPaper = styled(MuiPaper)`
&& {
  width: 1200px;
  margin: 50px 0px;
  transition: all ease-in-out .5s;

  @media (max-width: 1300px) {
    width: 800px;
  }

  @media (max-width: 1000px) {
    width: 700px;
  }

  @media (max-width: 800px) {
    width: 500px;
  }

  @media (max-width: 600px) {
    width: 350px;
  }
}
`

const Paper = ({ children, elevation }) => (
  <CustomPaper elevation={elevation}>
    { children }
  </CustomPaper>
)

Paper.propTypes = {
  children: PropTypes.any,
  elevation: PropTypes.number
}

export default Paper;