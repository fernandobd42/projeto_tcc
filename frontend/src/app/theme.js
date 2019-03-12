import { createMuiTheme } from '@material-ui/core/styles'

import lightBlue from '@material-ui/core/colors/lightBlue'
import indigo from '@material-ui/core/colors/indigo'

const palette = {
  primary: lightBlue,
  secondary: indigo,
  textPrimary: 'white'
}

const typography = {
  useNextVariants: true,
  fontFamily:   `'Roboto', 'Helvetica', 'Arial', 'sans-serif'`,
  fontSize: 14,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500
}

const direction = 'ltr'

const theme = createMuiTheme({
  palette,
  typography,
  direction
})

export default theme