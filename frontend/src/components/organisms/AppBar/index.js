import React from 'react'
import styled from 'styled-components'

import theme from 'app/theme'

import DropdownMenu from 'components/molecules/DropdownMenu'

import MuiAppBar from '@material-ui/core/AppBar'
import MuiToolbar from '@material-ui/core/Toolbar'
import MuiTypography from '@material-ui/core/Typography'

const Title = styled(MuiTypography)`
  && {
    color: ${theme.palette.textPrimary};
    flex-grow: 1;
  }
`

const AppBar = () => (
  <MuiAppBar position='absolute'>
    <MuiToolbar>
      <Title variant='h6'>
        Publicações
      </Title>
      <DropdownMenu />
    </MuiToolbar>
  </MuiAppBar>
)

export default AppBar