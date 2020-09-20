import React, { useEffect, useState } from "react";
import oComponent from './css/orderComponent.module.css';
import cComponent from "./css/cartComponent.module.css";
import { useSelector, useDispatch, usegetState } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../Redux/Cart/Actions/cartActions";
import store from "../Redux/Store/store";

var placeholder = "/imagenes/Placeholder.png";

function OrderComponent(props) {

const state = store.getState();
const cart = useSelector((state) => state.cart);
const { cartItems } = cart;
const getOrders = useSelector((state) => state.getOrders);
const { orders } = getOrders;

const dispatch = useDispatch(); 

useEffect(() => {
   dispatch(fetchOrders(props.producto));
}, []);

console.log(orders)

  return (

    <div className={cComponent.actionpane} >
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
            <label htmlFor="stock">Cantidad: {el.qty} </label>
        </div>
        <div className={`${cComponent.cardPrice}`}>
                <h4>Precio</h4>
                <span>$ {el.price}</span>
        </div>
        </div>
        </div>
        ))
        )}
        <div className={oComponent.footer}>
         <a>
            Total: ({cartItems.reduce((a, c) => a + c.qty, 0)} items) : ${" "}
            {cartItems.reduce((a, c) => a + c.price * c.qty, 0)}
            </a>
        </div>
        <div className={oComponent.catalogo2} >
            
                        
            <table className= "table table-dark">
            <thead>
                    <tr key="0">
                    <th scope="col">Id de Orden</th>
                    <th scope="col">Fecha</th>
                    <th scope="col">Direccion</th>
                    <th scope="col">Envio</th>
                    <th scope="col">Forma de pago</th>
                    <th scope="col">Status</th>
                    <th scope="col">Precio Total</th>
                   </tr>
                </thead>
                <tbody>
                {orders && orders.filter(order => order.id === orders.length).map(order=>  
             
                        <tr key={order.id}>
                            <td>{order.id} </td>
                            <td>{order.date}</td>
                            <td>{order.address} </td>
                            <td>{order.shipping}</td>
                            <td>{order.paymentmethod}</td>
                            <td>{order.status}</td>
                            <td>${order.priceTotal}</td>
                       </tr>
                  )}
                </tbody>
                </table>
                </div>
                <div className={oComponent.catalogo2}>
                <table className= "table table-dark">
                
            </table>
            <div className={oComponent.catalogo2} >
            <Link to={{
                pathname: "/users/:id/orders/historial",
                }} 
                >
                <button
                className="btn btn-success"
                >
                Historial de Ordenes
                </button>
                    </Link>
            </div>
            </div>
        </div>



    );
}




export default OrderComponent;