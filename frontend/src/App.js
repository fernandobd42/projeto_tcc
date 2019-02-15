import React from 'react';
import { Switch, Route, Redirect} from 'react-router-dom'

const AuthPage = React.lazy(() => import('components/pages/Auth'))
const HomePage = React.lazy(() => import('components/pages/Home'))
const NotFoundPage = React.lazy(() => import('components/pages/NotFound'))

const App = () => (
  <Switch>
    <Route path="/auth" component={AuthPage} />
    <Route path="/home" component={HomePage} />
    <Route path="/" exact render={() => <Redirect to="/auth" />} />
    <Route component={NotFoundPage} />
  </Switch>
)

export default App