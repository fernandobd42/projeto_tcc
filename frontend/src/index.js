import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom'

import CssBaseline from '@material-ui/core/CssBaseline'
import { MuiThemeProvider } from '@material-ui/core/styles'

import App from 'App';
import Loading from 'components/atoms/Loading'

import theme from './app/theme'

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <CssBaseline />
          <App />
      </Suspense>
    </BrowserRouter>
  </MuiThemeProvider>, 
  document.getElementById('root')
);
