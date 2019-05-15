import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { UserContextAPI } from 'app/store'

const ProtectedRoute = ({ component: Component }) => {
  const {user} = UserContextAPI()
  return (
    <Route render={props =>
      !user
        ? <Redirect to='/auth/login' />
        : <Component {...props} />
      }
    />
  )
}

export default ProtectedRoute
