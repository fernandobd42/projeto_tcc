import React, { useEffect } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'

import apolloClient from 'app/apolloClient'
import { UserContextAPI, getToken } from 'app/store'
import USER from './Query'

import Loading from 'components/atoms/Loading'

const AuthPage = React.lazy(() => import('components/pages/Auth'))
const AdminPage = React.lazy(() => import('components/pages/Admin'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const App = () => {
  const {user, setUser} = UserContextAPI()
  
  useEffect(() => {
    if (!!getToken() && getToken().length > 154) {
      apolloClient
      .query({ query: USER })
      .then(({ data }) => setUser(data.me))
      .catch(() => setUser(null))
    } else {
      setUser(null)
    }
  }, [setUser])
  
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