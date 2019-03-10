import React, { useState } from 'react'
import SwipeableViews from 'react-swipeable-views'

import { DRAFTS, POSTS } from 'components/organisms/Tabs/Query'

import theme from 'app/theme'

import MuiAppBar from '@material-ui/core/AppBar'
import MuiTabs from '@material-ui/core/Tabs'
import MuiTab from '@material-ui/core/Tab'

import TabContainer from 'components/atoms/TabContainer'
import TabContent from 'components/molecules/TabContent'

const handleChange = setTabIndex => (_, value) => {
  setTabIndex(value)
}

const handleChangeIndex = setTabIndex => index => {
  setTabIndex(index);
}

const Tabs = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <>
      <MuiAppBar position="static" color="default">
        <MuiTabs
          value={tabIndex}
          onChange={handleChange(setTabIndex)}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <MuiTab label="Rascunhos" />
          <MuiTab label="Posts" />
        </MuiTabs>
      </MuiAppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex(setTabIndex)}
      >
        <TabContainer dir={theme.direction}>
          <TabContent QUERY={DRAFTS} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <TabContent QUERY={POSTS} />
        </TabContainer>
      </SwipeableViews>
    </>
  )
}

export default Tabs