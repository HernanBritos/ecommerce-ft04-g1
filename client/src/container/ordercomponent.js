import React, { useEffect, useState } from "react";
import oComponent from './css/orderComponent.module.css';
import { useSelector, useDispatch, usegetState } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../Redux/Cart/Actions/cartActions";
import store from "../Redux/Store/store"
var placeholder = "/imagenes/Placeholder.png";

function OrderComponent(props) {

const state = store.getState();
const cart = useSelector((state) => state.cart);
const { cartItems } = cart;

const dispatch = useDispatch(); 

useEffect(() => {
   dispatch(fetchOrders(props.producto));
}, []);

const getOrders = useSelector((state) => state.getOrders);
const { orders } = getOrders;

console.log(state);

  return (

    <div className={oComponent.catalogo} >
        <div className={oComponent.catalogo2} >
            <table className= "table table-dark">
                <thead>
                    <tr key="0">
                    <th scope="col">Id Producto</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                   

                    
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map(prod=>
                        <tr key={prod.product}>
                           <td>{prod.product}</td>
                            <td><Link to={'/product/'+ prod.product}>{prod.name}</Link></td>
                            <td>${prod.price}</td>
                            <td>{prod.qty}</td>
                        
                           
                        </tr>
                    )} 
                </tbody>
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
                    {orders && orders.map(order=>
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
        </div>



    );
}

export default OrderComponent;