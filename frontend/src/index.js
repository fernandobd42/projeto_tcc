import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter } from 'react-router-dom'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from 'App';
import Loading from 'components/atoms/Loading'

import theme from './app/theme'

const client = new ApolloClient({
  uri: "http://localhost:4000"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter basename='/'>
        <Suspense fallback={<Loading />}>
          <CssBaseline />
          <App />
        </Suspense>
      </BrowserRouter>
    </MuiThemeProvider>
  </ApolloProvider>, 
  document.getElementById('root')
)
