import React from 'react'
import styled from 'styled-components'

import theme from 'app/theme'

import Flex from 'components/atoms/Flex'
import Tabs from 'components/organisms/Tabs'

import MuiPaper from '@material-ui/core/Paper'


const CustomFlex = styled(Flex)`
  && {
   max-height: 100vh;
  }
`

const Title = styled.h1`
  && {
    color: ${theme.palette.primary.main};
    padding: ${theme.spacing.unit * 4}px 0;
  }
`

const Paper = styled(MuiPaper)`
  && {
    width: 1200px;
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

const Home = () => (
  <CustomFlex direction="column" justify="start" height="auto">
    <Title>
      Gerenciar Publicações
    </Title>

    <Paper elevation={7}>
      <Tabs />
    </Paper>
  </CustomFlex>
)

export default Home