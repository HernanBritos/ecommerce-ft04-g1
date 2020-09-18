import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart, createOrder, fetchOrders } from "../Redux/Cart/Actions/cartActions";
import cComponent from "./css/cartComponent.module.css";
import { get } from "js-cookie";
import store from "../Redux/Store/store"

function CartComponent(props) {

const cart = useSelector((state) => state.cart);
const { cartItems } = cart;
const getOrders = useSelector((state) => state.getOrders);
const { orders } = getOrders;
const state = store.getState(getOrders);
const productId = props.c.match.params.id;
const qty = props.c.location.search

const [input, setInput] = useState({
idUser: "",
priceTotal: "",
status: "",
address: "",
description: "",
paymentmethod: "",
shipping: "",
products: cartItems,

})
console.log(state.getOrders)


const dispatch = useDispatch();

const removeFromCartHandler = (productId) => {
dispatch(removeFromCart(productId));
};

var subtotal = cartItems.reduce((a, c) => a + c.price * c.qty, 0)

useEffect(() => {
if (productId) {
dispatch(addToCart(productId, qty));
}
dispatch(fetchOrders(1));
}, []);

const checkoutHandler = () => {
dispatch(createOrder(input));
};

const handleInputChange = function (e) {
setInput({
...input,
[e.target.name]: e.target.value,
});
}

return (
<div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
<div className={cComponent.actionpane}>
<Link to="/">
<button className="btn btn-info">Volver a Home</button>
</Link>
<center>
<h2 className={`${cComponent.titulo}`}>Detalle de su carrito</h2>
</center>
</div>

{cartItems.length === 0 ? (
<div className="alert alert-info">El carrito está vacío</div>
) : (
cartItems.map((el) => (
<div key={el.product} className={`${cComponent.carritoPage}`}>
<div className={`${cComponent.cards}`}>
<img
className={`${cComponent.cardImage}`}
src={`/imagenes/uploads/${el.img}`}
alt="fotoCarrito"
/>
<div className={`${cComponent.cardDet}`}>
<Link to={`/product/${el.product}`}>{el.name}</Link>
</div>
<div className={`${cComponent.qty}`}>
<label htmlFor="stock">Cantidad: </label>
<input
name="stock"
type="number"
className="form-control"
id="stock"
value={el.qty}
onChange={(e) =>
dispatch(addToCart(el.product, e.target.value))
}
/>
<button
onClick={() => removeFromCartHandler(el.product)}
className={` btn-danger ${cComponent.button}`}
>
Eliminar
</button>
</div>
<div className={`${cComponent.cardPrice}`}>
<h4>Precio</h4>
<span>$ {el.price}</span>
</div>
</div>
</div>
))
)}
<div className={`${cComponent.footer}`}>
<form>
<div className={cComponent.name}>
<label htmlFor="idUser">Id User: </label>
<input
placeholder="Nombre"
name="idUser"
value={input.idUser}
type="text"
onChange={handleInputChange}
/>
</div>
{/* <div className={cComponent.name}>
<label htmlFor="date">fecha </label>
<input
placeholder="Nombre"
name="date"
value={input.date}
type="text"
onChange={handleInputChange}
/>
</div> */}
<div className={cComponent.name}>
<label htmlFor="priceTotal">Precio total </label>
<input
placeholder="Nombre"
name="priceTotal"
value={input.priceTotal}
type="text"
onChange={handleInputChange}
/>
</div>
<div className={cComponent.name}>
<label htmlFor="status">Starus: </label>
<input
placeholder="Nombre"
name="status"
value={input.status}
type="text"
onChange={handleInputChange}
/>
</div>
<div className={cComponent.name}>
<label htmlFor="address">Direccion: </label>
<input
placeholder="Nombre"
name="address"
value={input.address}
type="text"
onChange={handleInputChange}
/>
</div>
<div className={cComponent.name}>
<label htmlFor="description">description: </label>
<input
placeholder="Nombre"
name="description"
value={input.description}
type="text"
onChange={handleInputChange}
/>
</div>
<div className={cComponent.name}>
<label htmlFor="paymentmethod">Forma de pago: </label>
<input
placeholder="Nombre"
name="paymentmethod"
value={input.paymentmethod}
type="text"
onChange={handleInputChange}
/>
</div>
<div className={cComponent.name}>
<label htmlFor="shipping">Envio: </label>
<input
placeholder="Nombre"
name="shipping"
value={input.shipping}
type="text"
onChange={handleInputChange}
/>
</div>
</form>
<a>
Subtotal: ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
{cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
</a>
<Link to={{
pathname: "/user/id/order",
}} 
>
<button
onClick={checkoutHandler}
className="btn btn-success"
disabled={cartItems.length === 0}
>
Continuar con la compra
</button>
</Link>
</div>
</div>
);
}

export default CartComponent;