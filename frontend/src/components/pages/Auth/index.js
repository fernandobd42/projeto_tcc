import React from 'react'

import { Switch, Route, Redirect } from 'react-router-dom'

const LoginPage = React.lazy(() => import('components/pages/Auth/Login'))
const RegisterPage = React.lazy(() => import('components/pages/Auth/Register'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const Auth = () => (
  <Switch>
    <Route path="/auth/login" exact component={LoginPage} />
    <Route path="/auth/register" exact component={RegisterPage} />
    <Route path="/auth" exact render={() => <Redirect to="/auth/login" />} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default Auth

