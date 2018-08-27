import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import configureStore from './store';
import { Provider } from 'react-redux';
import AppRoutes from './routes';
const store = configureStore();

ReactDOM.render(<Provider store={store}><AppRoutes /></Provider>, document.getElementById('root'));

