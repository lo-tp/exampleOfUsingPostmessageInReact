import React from 'react';
import ReactDOM from 'react-dom';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

import { default as Iframe } from './iframe';

import reducer from './reducer';

require('./client.scss');

const logger = createLogger();
const middlewares = [logger];
const store = createStore(reducer, applyMiddleware(...middlewares));

ReactDOM.render(
  (
     <Provider
       store = {store}
     > 
       <Iframe />
     </Provider>
),
     document.getElementById('root')
);
