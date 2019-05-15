import React, { useState, Fragment } from 'react'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'

import theme from 'app/theme'
import { UserContextAPI, setToken } from 'app/store'

import MuiButton from '@material-ui/core/Button'
import MuiPopper from '@material-ui/core/Popper'
import MuiGrow from '@material-ui/core/Grow'
import MuiPaper from '@material-ui/core/Paper'
import MuiClickAwayListener from '@material-ui/core/ClickAwayListener'
import MuiMenuList from '@material-ui/core/MenuList'
import MuiMenuItem from '@material-ui/core/MenuItem'
import MuiIconPersonOutline from '@material-ui/icons/PersonOutline'
import MuiTypography from '@material-ui/core/Typography'

const UserName = styled(MuiTypography)`
  && {
    color: ${theme.palette.textPrimary};
    margin-right: ${theme.spacing.unit}px;
    font-weight: ${theme.typography.fontWeightMedium};
    text-transform: capitalize;
  }
`

const UserIcon = styled(MuiIconPersonOutline)`
  && {
    color: ${theme.palette.textPrimary};
  }
`

const CustomPopper = styled(MuiPopper)`
  && {
    max-width: 140px;
  }
`

const profileToggle = (openMenu, setOpenMenu, redirect) => () => {
  setOpenMenu(!openMenu)

  if (!!redirect) {
    redirect()
  }
}

const profileClose = (profileAnchorEl, setOpenMenu) => event => {
  if (profileAnchorEl && profileAnchorEl.contains(event.target)) {
    return
  }

  setOpenMenu(false)
}

const logout = (setUser, redirectToLogin) => () => {
  setToken(null)
  setUser(null)
  redirectToLogin()
}

const DropdownMenu = ({ history }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  
  const {user, setUser} = UserContextAPI()

  const closePopper = () => profileClose(profileAnchorEl, setOpenMenu)
  const redirectToLogin = () => history.push('/auth/login')
  const redirectToSettings = () => history.push('/admin/settings')

  return (
    <Fragment>  
      <MuiButton 
        id='dropdown'
        onClick={profileToggle(openMenu, setOpenMenu)} 
        buttonRef={setProfileAnchorEl}
      >
        <UserName variant='subtitle1'>
          {!!user && user.name.split(' ')[0]}
        </UserName>
        <UserIcon />
      </MuiButton>
      <CustomPopper open={openMenu} anchorEl={profileAnchorEl} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <MuiGrow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <MuiPaper>
              <MuiClickAwayListener onClickAway={closePopper()}>
                <MuiMenuList>
                  <MuiMenuItem id='settings' onClick={profileToggle(openMenu, setOpenMenu, redirectToSettings)}>Configurações</MuiMenuItem>
                  <MuiMenuItem onClick={logout(setUser, redirectToLogin)}>Sair</MuiMenuItem>
                </MuiMenuList>
              </MuiClickAwayListener>
            </MuiPaper>
          </MuiGrow>
        )}
      </CustomPopper>
    </Fragment>
  )
}

export default withRouter(DropdownMenu)