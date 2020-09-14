import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import cComponent from "./css/adminAddProduct.module.css";
import { addTocCart } from "../Redux/Cart/Actions/cartActions";
import {useSelector, useDispatch} from 'react-redux';



function CartComponent(props) {
const cartDetail = useSelector(state => state.cartDetail);
const {cartItems, loading, error} = cartDetail;
const dispatch = useDispatch();


useEffect(() => {
    dispatch(addTocCart(props.c.location.state));
    },[]);

console.log(cartItems);

return ( 
    <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
    <md-content layout-padding>
    <div className={cComponent.actionpane}>
    <Link to="/">
        <button className="btn btn-success">Volver a Home</button>
    </Link>
    <center>
        <h2>Detalle de su Carrito</h2>
    </center>
    </div>

    <div className="tables">
    
    <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
        <thead>
        <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoria</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Imagen</th>
            <th>Accion</th>
        </tr>
        </thead>
        
        <tbody>
        {
        loading? (<div>Loading...</div>):
        error? (<div>{error}</div>): 
        ( 
            cartItems.map ((i) => (
        <tr >
            <td>{i.id}</td>
            <td>
            <span className={cComponent.name}>{i.name}</span>
            </td>
            <td>{i.category}</td>
            <td>{i.price}</td>
            <td>{i.stock}</td>
            <td>{i.img}</td>
        </tr>
         )))
        }
        </tbody>
       
    </table>
     
    <a>Sub Total: $</a>
    <h4>Total: $</h4>
    
    </div>
    
</md-content>
</div>
)
} 

export default CartComponent;
