import React from 'react'
import ReactLoading from 'react-loading'

import Flex from 'components/atoms/Flex'

import theme from 'app/theme'

const Loading = () => (
  <Flex height='100vh'>
    <ReactLoading type='spinningBubbles' color={theme.palette.primary[500]} height='100px' width='100px' />
  </Flex>
)

export default Loading
