import { CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS, CART_ADD_ITEM_FAIL } from "../constantes/cartConstant";

function cartReducer(state={cartItems:[]}, action){
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
          return { loading: true };
        case CART_ADD_ITEM_SUCCESS:
          return { loading: false, cartItems: [action.payload] };
        case CART_ADD_ITEM_FAIL:
          return { loading: false, error: action.payload };
        default:
          return state;
}
}

export { cartReducer }