import { CART_ADD_ITEM } from "./cartConstant";

function cartReducer(state={cartItems:[]}, action){
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload;
            const product = state.cartItems.find(x=>x.product === item.product);
            if(product){
                return {cartItems:
                     state.cartItems.map(x=>x.product === product.product?product: x)}; /// el segundo product del product.product en realidad es el ID del product
            }
            else {
                return {cartItems:
                     [...state.cartItems, item]}
            }
            default:
                return state
    }
}

export { cartReducer }