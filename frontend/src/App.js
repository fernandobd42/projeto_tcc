import React, { useContext, useEffect } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'

import apolloClient from 'app/apolloClient'
import { ContextAPI } from 'app/store'

import USER from './Query'

import Loading from 'components/atoms/Loading'

const AuthPage = React.lazy(() => import('components/pages/Auth'))
const AdminPage = React.lazy(() => import('components/pages/Admin'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const App = () => {
  const [user, setUser] = useContext(ContextAPI)
  
  useEffect(() => {
    apolloClient
    .query({ query: USER })
    .then(({ data }) => setUser(data.me))
    .catch(() => setUser(null))
  }, [])
  
  if (user === undefined) {
    return <Loading />
  }

  return (
    <Switch>
      <Route path='/auth' component={AuthPage} />
      <Route path='/admin' component={AdminPage} />
      <Route path='/' exact render={() => <Redirect to='/auth' />} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}

export default App