import React from 'react'
import PropTypes from 'prop-types'

import ReactLoading from 'react-loading'

import Flex from 'components/atoms/Flex'

import theme from 'app/theme'

const Loading = ({ height }) => (
  <Flex height={height}>
    <ReactLoading type='spinningBubbles' color={theme.palette.primary.main} height='100px' width='100px' />
  </Flex>
)

Loading.propTypes = {
  height: PropTypes.string
}

export default Loading
