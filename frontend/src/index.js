import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import StoreProvider from 'app/store'
import apolloClient from 'app/apolloClient'

import { ApolloProvider } from 'react-apollo'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from 'App'
import Loading from 'components/atoms/Loading'

import theme from './app/theme'

ReactDOM.render(
  <StoreProvider>
    <ApolloProvider client={apolloClient}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter basename='/'>
          <Suspense fallback={<Loading />}>
            <CssBaseline />
            <App />
          </Suspense>
        </BrowserRouter>
      </MuiThemeProvider>
    </ApolloProvider>
  </StoreProvider>,
  document.getElementById('root')
)
