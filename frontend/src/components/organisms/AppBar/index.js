import React from 'react'
import styled, { css } from 'styled-components'
import { withRouter } from 'react-router-dom'

import theme from 'app/theme'

import MuiAppBar from '@material-ui/core/AppBar'
import MuiToolbar from '@material-ui/core/Toolbar'
import MuiTypography from '@material-ui/core/Typography'
import MuiButton from '@material-ui/core/Button'

import DropdownMenu from 'components/molecules/DropdownMenu'
import Flex from 'components/atoms/Flex'

const CustomButton = styled(MuiButton)`
  && {
    ${props =>
      props.disabled &&
      css`
        background-color: ${theme.palette.primary[300]};
        cursor: not-allowed !important;
        pointer-events: initial !important;

        &:hover {
          background-color: ${theme.palette.primary[300]} !important;
        }
    `};
  }
`

const ButtonText = styled(MuiTypography)`
  && {
    color: ${theme.palette.textPrimary};
    font-weight: ${theme.typography.fontWeightMedium};
  }
`

const AppBar = ({ history }) => {
  const redirectToFeed = () => history.push('/admin/feed')
  const redirectToPublications = () => history.push('/admin/publications')
  const route = history.location.pathname.split('/').pop()

  return (
    <MuiAppBar position='fixed'>
      <MuiToolbar>
        <Flex height='auto' justify='flex-start' flex={1}>
          <CustomButton onClick={redirectToFeed} disabled={route === 'feed'}>
            <ButtonText variant='subtitle1'>
              Página Inicial
            </ButtonText>
          </CustomButton>
          <CustomButton id="publicacoes" onClick={redirectToPublications} disabled={route === 'publications'}>
            <ButtonText variant='subtitle1'>
              Publicações
            </ButtonText>
          </CustomButton>

        </Flex>
        <DropdownMenu />
      </MuiToolbar>
    </MuiAppBar>
  )
}

export default withRouter(AppBar)