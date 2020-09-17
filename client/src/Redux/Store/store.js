import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  productListReducer,
  productDetailsReducer,
} from "../Products/reducers/productReducers";
import {
  categoryListReducer,
  categoryDetailsReducer,
} from "../Categories/reducers/categoryReducers";
import Cookie from "js-cookie";
import { cartReducer } from "../Cart/reducers/cartReducer";
import {
  userListReducer,
  userDetailsReducer,
} from "../Users/reducers/userReducer";
import thunk from "redux-thunk";
import {addReviewReducer, getReviewReducer} from "../Review/Reducers/reviewReducer"

const cartItems = Cookie.getJSON("cartItems") || [];

const initialState = { cart: { cartItems } };
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  productEdit: initialState,
  userList: userListReducer,
  userDetails: userDetailsReducer,
  categoryList: categoryListReducer,
  categoryEdit: initialState,
  categoryDetails: categoryDetailsReducer,
  userEdit: initialState,
  addReview: addReviewReducer,
  getReviews: getReviewReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
