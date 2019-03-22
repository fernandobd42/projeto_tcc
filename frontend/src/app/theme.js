import { createMuiTheme } from '@material-ui/core/styles'

import lightBlue from '@material-ui/core/colors/lightBlue'
import indigo from '@material-ui/core/colors/indigo'
import red from '@material-ui/core/colors/red'
import green from '@material-ui/core/colors/green'

const palette = {
  primary: indigo,
  secondary: lightBlue,
  danger: red,
  success: green,
  textPrimary: 'white',
}

const typography = {
  useNextVariants: true,
  fontFamily:   `'Roboto', 'Helvetica', 'Arial', 'sans-serif'`,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightMedium: 500,
  fontWeightHigh: 700
}

const direction = 'ltr'

const theme = createMuiTheme({
  palette,
  typography,
  direction
})

export default theme