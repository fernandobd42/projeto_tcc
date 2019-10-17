import React from 'react'
import styled from 'styled-components'

import Flex from 'components/atoms/Flex'
import Paper from 'components/atoms/Paper'
import Tabs from './Tabs'


const CustomFlex = styled(Flex)`
  && {
    max-height: 100vh;
  }
`

const Publications = () => (
  <CustomFlex direction='column' justify='start' height='auto'>
    <Paper elevation={7}>
      <Tabs />
    </Paper>
  </CustomFlex>
)

export default Publications