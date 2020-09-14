import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "../Products/reducers/productReducers";
import {
  categoryListReducer,
  categoryDetailsReducer,
} from "../Categories/reducers/categoryReducers";

import { cartReducer } from "../Cart/reducers/cartReducer";
import {
  userListReducer,
  userDetailsReducer,
} from "../Users/reducers/userReducer";
import thunk from "redux-thunk";

const initialState = {};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cartDetail: cartReducer,
  productEdit: initialState,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  categoryList: categoryListReducer,
  categoryEdit: initialState,
  categoryDetails: categoryDetailsReducer,
  userEdit: initialState,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
