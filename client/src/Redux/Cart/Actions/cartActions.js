import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from "../constantes/cartConstant";
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

const createOrder = (order) => {
  axios.post(`http://localhost:3001/users/${order.idUser}/orders`, {
    idUser: order.idUser,
    date: order.date,
    priceTotal: order.priceTotal,
    status: order.status,
    address: order.address,
    description: order.description,
    paymentmethod: order.paymentmethod,
    shipping: order.shipping
    }) 
    .then((data) => {
      return data;
    });
  return (window.location = (`http://localhost:3000/users/${order.idUser}/orders`));

}

  const fetchOrders = (id) => async (dispatch) => {
    try {
      dispatch({ type: ORDER_LIST_REQUEST });
      const { data } = await axios.get(`http://localhost:3001/users/${1}/orders`);
      dispatch({ 
        type: ORDER_LIST_SUCCESS, 
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


export { addToCart, removeFromCart, createOrder, getOrders, fetchOrders };
