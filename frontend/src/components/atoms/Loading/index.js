import React from 'react'
import ReactLoading from 'react-loading'

import Flex from 'components/atoms/Flex'

import theme from 'app/theme'

const Loading = () => (
  <Flex>
    <ReactLoading type='spinningBubbles' color={theme.palette.primary.main} height='100px' width='100px' />
  </Flex>
)

export default Loading
