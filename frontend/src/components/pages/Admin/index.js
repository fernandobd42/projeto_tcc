import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute from 'components/molecules/ProtectedRoute'

import Page from 'components/templates/Page'
import AppBar from 'components/organisms/AppBar'

const FeedPage = React.lazy(() => import('components/pages/Admin/Feed'))
const PublicationsPage = React.lazy(() => import('components/pages/Admin/Publications'))
const NewEditItemPage = React.lazy(() => import('components/pages/Admin/NewEditItem'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const Admin = () => (
  <Page header={<AppBar />}>
    <Switch>
      <ProtectedRoute path='/admin/feed' exact component={FeedPage} />
      <ProtectedRoute path='/admin/publications' exact component={PublicationsPage} />
      <ProtectedRoute path='/admin/newDraft' exact component={NewEditItemPage} />
      <Route path='/admin' exact render={() => <Redirect to='/admin/feed' />} />
      <ProtectedRoute component={NotFoundPage} />
    </Switch>
  </Page>
)

export default Admin

