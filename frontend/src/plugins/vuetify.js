// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Vuetify
import { createVuetify } from 'vuetify'

// The dialog is the one Vuetify surface left in the app. Its theme mirrors
// the Sticker tokens in src/styles/tokens.css so the overlay never flashes
// a framework default.
const sticker = {
  dark: false,
  colors: {
    background: '#f5f0e7',
    surface: '#fffdf8',
    primary: '#d3036a',
    'primary-darken-1': '#b30057',
    secondary: '#1b1813',
    'secondary-darken-1': '#312d27',
    error: '#a4342b',
    info: '#1b1813',
    success: '#cae649',
    warning: '#cae649',
    'on-background': '#1b1813',
    'on-surface': '#1b1813',
    'on-primary': '#fefdfb',
    'on-secondary': '#f5f0e7',
    'on-error': '#fefdfb',
    'on-info': '#f5f0e7',
    'on-success': '#1b1813',
    'on-warning': '#1b1813'
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'sticker',
    themes: { sticker }
  },
  defaults: {
    VDialog: {
      scrim: true,
      contentClass: 'sticker-dialog'
    }
  }
})
