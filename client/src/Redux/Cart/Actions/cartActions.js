import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDERPRODUCT_LIST_REQUEST,
  ORDERPRODUCT_LIST_SUCCESS
} from "../constantes/cartConstant";
import Cookie from "js-cookie";

const addToCart = (productId, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      `http://localhost:3001/products/${productId}`
    );
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data.id,
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        stock: data.stock,
        img: data.img,
        qty,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};
const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const fetchOrders = (id) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_LIST_REQUEST });
    const { data } = await axios.get(
      `http://localhost:3001/users/${id}/orders`
    );
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {}
};

const fetchOrderProducts = () => async (dispatch) => {
  try {
    dispatch({ type: ORDERPRODUCT_LIST_REQUEST});
    const {data } = await axios.get(
      `http://localhost:3001/orders/`
      );
      dispatch({
        type: ORDERPRODUCT_LIST_SUCCESS,
        payload: data,
      });
  } catch (error) {}
};

const getOrders = (orders) => {
  return {
    type: ORDER_LIST_SUCCESS,
    orders,
  };
};

export { addToCart, removeFromCart, getOrders, fetchOrders, fetchOrderProducts };
