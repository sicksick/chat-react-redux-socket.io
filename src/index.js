import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import configureStore from './store';
import {Provider} from 'react-redux';
import AppRoutes from './routes';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const store = configureStore();

ReactDOM.render(<Provider
    store={store}><MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}><AppRoutes/></MuiThemeProvider></Provider>, document.getElementById('root'));

