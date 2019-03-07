import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import { ContextAPI } from 'app/store'

const ProtectedRoute = ({ component: Component }) => {
  const [user] = useContext(ContextAPI)

  return (
    <Route render={props =>
      !user
        ? <Redirect to="/auth/login" />
        : <Component {...props} />
      }
    />
  )
}

export default ProtectedRoute
