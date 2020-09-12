import axios from 'axios'
import { CART_ADD_ITEM } from './cartConstant'

const addTocCart = (idProducto, qty) => async (dispatch) => { 
    try {
        const {data} = await axios.get("http://localhost:3001/products/" + idProducto); //agarra el producto de la db
        dispatch({type: CART_ADD_ITEM, payload:{ //ahora que tenemos la data añade el producto al carrito
            product: data._id,
            name: data.name,
            img: data.img,
            price: data.price,
            stock: data.stock,
            qty
        }}) //manda la acción al reducer
    }
    catch (error) {

    }
}
export { addTocCart }