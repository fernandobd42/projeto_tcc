import React, { useState } from 'react'
import styled from 'styled-components'

import theme from 'app/theme'

import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Lock from '@material-ui/icons/Lock'

import Flex from 'components/atoms/Flex'
import Paper from 'components/atoms/Paper'
import PersonalTab from './PersonalTab'
import PasswordTab from './PasswordTab'

const CustomFlex = styled(Flex)`
  && {
    margin: ${theme.spacing.unit * 4}px 0;
  }
`

const CustomList = styled(List)`
  {
    padding: ${theme.spacing.unit * 3}px 0 !important;
    width: 150px;
  }
`

const handleTab = (tab, setTab) => () => {
  setTab(tab)
}

const Settings = () => {
  const [tab, setTab] = useState(0)
  
  return (
    <CustomFlex direction='column' justify='start' height='auto'>
      <Paper elevation={7}>
        <Flex justify='start' alignItems='start' height='auto'>
          <CustomList component='nav'>
            <ListItem button onClick={handleTab(0, setTab)} selected={tab === 0}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary='Pessoais' />
            </ListItem>
            <ListItem id='change-password' button onClick={handleTab(1, setTab)} selected={tab === 1}>
              <ListItemIcon>
                <Lock />
              </ListItemIcon>
              <ListItemText primary='Senha' />
            </ListItem>
          </CustomList>
          {
            tab === 0 && <PersonalTab />
          }
          {
            tab === 1 && <PasswordTab />
          }
        </Flex>
      </Paper>
    </CustomFlex>
  )
}

export default Settings