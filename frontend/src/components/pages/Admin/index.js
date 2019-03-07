import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

import ProtectedRoute from 'components/molecules/ProtectedRoute'

const HomePage = React.lazy(() => import('components/pages/Admin/Home'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const Admin = () => (
  <Switch>
    <ProtectedRoute path="/admin/home" exact component={HomePage} />
    <Route path="/admin" exact render={() => <Redirect to="/admin/home" />} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Admin

