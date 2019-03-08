import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import theme from 'app/theme'

import Flex from 'components/atoms/Flex'

const Redirect = styled(Link)`
  && {
    margin-top: 50px;
    font-size: ${theme.typography.fontSize * 2}px;
    text-decoration: none;
    color: ${theme.palette.primary.main};
  }
`

const NotFound = () => (
  <Flex height='100vh' direction='column'>
    <h1>Página nao existe!</h1>
    <Redirect to='/auth'>Ir para página inicial</Redirect>
  </Flex>
)

export default NotFound
