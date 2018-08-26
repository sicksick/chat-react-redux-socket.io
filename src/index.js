import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './containers/app/App';
import configureStore from './utils/stor';
import { Provider } from 'react-redux';

const store = configureStore();

ReactDOM.render(<div><Provider store={store}><App /></Provider> </div>, document.getElementById('root'));

