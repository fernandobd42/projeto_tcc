import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute from 'components/molecules/ProtectedRoute'

import Page from 'components/templates/Page'
import AppBar from 'components/organisms/AppBar'

const HomePage = React.lazy(() => import('components/pages/Admin/Home'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const Admin = () => (
  <Page header={<AppBar />}>
    <Switch>
      <ProtectedRoute path='/admin/home' exact component={HomePage} />
      <Route path='/admin' exact render={() => <Redirect to='/admin/home' />} />
      <Route component={NotFoundPage} />
    </Switch>
  </Page>
)

export default Admin

