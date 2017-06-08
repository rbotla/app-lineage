import { combineReducers } from 'redux';
import nodes from './nodes/nodes';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({ nodes, routing: routerReducer, form: formReducer });