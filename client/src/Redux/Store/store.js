import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {
    productListReducer,
    productDetailsReducer,
  } from '../Products/reducers/productReducers';

import { cartReducer } from '../Cart/reducers/cartReducer'
import thunk from 'redux-thunk'

const initialState = {};
const reducer = combineReducers({
    productList: productListReducer,    
    productDetails: productDetailsReducer,
    cartDetail: cartReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));

export default store;