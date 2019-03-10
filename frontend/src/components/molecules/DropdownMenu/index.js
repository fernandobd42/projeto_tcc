import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { withRouter } from 'react-router-dom'

import theme from 'app/theme'

import { ContextAPI, setToken } from 'app/store'

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
    width: 120px;
  }
`

const profileToggle = (openMenu, setOpenMenu) => () => (
  setOpenMenu(!openMenu)
)

const profileClose = (profileAnchorEl, setOpenMenu) => event => {
  if (profileAnchorEl && profileAnchorEl.contains(event.target)) {
    return
  }

  return setOpenMenu(false)
}

const logout = (setUser, redirectToLogin) => {
  setToken(null)
  setUser(null)
  redirectToLogin()
}

const DropdownMenu = ({ history }) => {
  const [openMenu, setOpenMenu] = useState(false)
  const [profileAnchorEl, setProfileAnchorEl] = useState(null)
  
  const [user, setUser] = useContext(ContextAPI)

  const closePopper = () => profileClose(profileAnchorEl, setOpenMenu)
  const redirectToLogin = () => history.push('/auth/login')

  return (
    <>  
    <MuiButton 
      onClick={profileToggle(openMenu, setOpenMenu)} 
      buttonRef={setProfileAnchorEl}
    >
      <UserName variant="subtitle1">
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
            <MuiClickAwayListener onClickAway={closePopper}>
              <MuiMenuList>
                <MuiMenuItem onClick={event => 
                  {
                    closePopper(event)
                    logout(setUser, redirectToLogin)
                  }
                }>Sair</MuiMenuItem>
              </MuiMenuList>
            </MuiClickAwayListener>
          </MuiPaper>
        </MuiGrow>
      )}
    </CustomPopper>
  </>
  )
}

export default withRouter(DropdownMenu)