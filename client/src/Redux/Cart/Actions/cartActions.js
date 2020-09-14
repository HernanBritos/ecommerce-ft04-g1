import axios from 'axios'
import { CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS, CART_ADD_ITEM_FAIL  } from '../constantes/cartConstant'

const addTocCart = (idProducto) => async (dispatch) => { 
        try {
            dispatch({ type: CART_ADD_ITEM_REQUEST, payload: idProducto });
            const { data } = await axios.get(
              "http://localhost:3001/products/" + idProducto
            );
            dispatch({ type: CART_ADD_ITEM_SUCCESS, payload: data });
          } catch (error) {
            dispatch({ type: CART_ADD_ITEM_FAIL, payload: error.message });
          }
};


export { addTocCart }