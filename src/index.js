import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import configureStore from './store';
import AppRoutes from './routes';

const store = configureStore();

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Roboto',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Arial',
      'sans-serif'
    ].join(','),
    useNextVariants: true
  },
  palette: {
    primary: indigo,
    secondary: pink,
    error: red,
    contrastThreshold: 3,
    tonalOffset: 0.2
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <AppRoutes />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);
