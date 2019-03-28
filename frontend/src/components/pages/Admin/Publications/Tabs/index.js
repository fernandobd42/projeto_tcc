import React, { useState, Suspense } from 'react'
import SwipeableViews from 'react-swipeable-views'

import { DRAFTS_QUERY, POSTS_QUERY } from './Query'

import theme from 'app/theme'

import MuiAppBar from '@material-ui/core/AppBar'
import MuiTabs from '@material-ui/core/Tabs'
import MuiTab from '@material-ui/core/Tab'

import Loading from 'components/atoms/Loading'
import TabContainer from 'components/atoms/TabContainer'
import TabContent from 'components/organisms/TabContent'

const handleChange = setTabIndex => (_, value) => {
  setTabIndex(value)
}

const handleChangeIndex = setTabIndex => index => {
  setTabIndex(index);
}

const Tabs = () => {
  const [tabIndex, setTabIndex] = useState(0);
  
  return (
    <Suspense fallback={<Loading height='auto' />}>
      <MuiAppBar position='static' color='default'>
        <MuiTabs
          value={tabIndex}
          onChange={handleChange(setTabIndex)}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
        >
          <MuiTab label='Meus Rascunhos' />
          <MuiTab label='Minhas Publicações' />
        </MuiTabs>
      </MuiAppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={tabIndex}
        onChangeIndex={handleChangeIndex(setTabIndex)}
      >
        <TabContainer dir={theme.direction}>
          <TabContent QUERY={DRAFTS_QUERY} queryName='drafts' tabIndex={tabIndex} />
        </TabContainer>
        <TabContainer dir={theme.direction}>
          <TabContent QUERY={POSTS_QUERY} queryName='posts' tabIndex={tabIndex} />
        </TabContainer>
      </SwipeableViews>
    </Suspense>
  )
}

export default Tabs