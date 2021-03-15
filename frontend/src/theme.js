import { createMuiTheme } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0EED0E',
    },
    secondary: {
      main: '#FFFFFF',
    },
    background: {
      dark: '#191919',
      main: '#212121',
      light: '#333333'
    },
  },
});

export default theme