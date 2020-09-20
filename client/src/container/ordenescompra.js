import React, { useEffect, useState } from "react";
import oComponent from './css/orderComponent.module.css';
import { useSelector, useDispatch, usegetState } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../Redux/Cart/Actions/cartActions";
import store from "../Redux/Store/store";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

var placeholder = "/imagenes/Placeholder.png";

function OrdenesCompra(props) {

const state = store.getState();
const getOrders = useSelector((state) => state.getOrders);
const { orders } = getOrders;



  return (

                <div  >
                <div className={oComponent.options}>
                    <Link to="/">
                <button className={oComponent.botonBack}>
                <ArrowBackIcon />
                </button>
                </Link>  
            </div>
                <div className={oComponent.catalogo2}>
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

export default OrdenesCompra;