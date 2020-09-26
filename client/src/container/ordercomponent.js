import React, { useEffect } from "react";
import oComponent from "./css/orderComponent.module.css";
import cComponent from "./css/adminAddCategory.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders, fetchOrderProducts,  removeFromCart, cancelOrder} from "../Redux/Cart/Actions/cartActions";


function OrderComponent(props) {

const dispatch = useDispatch();
const cart = useSelector((state) => state.cart);
const { cartItems } = cart;
const items = cartItems;
const getOrders = useSelector((state) => state.getOrders);
const { orders } = getOrders;

  
useEffect(() =>  {
    dispatch(fetchOrders(props.producto.match.params.id));
  dispatch(fetchOrderProducts())
  dispatch(fetchOrders(props.producto.match.params.id));
  }, []);

const handleSubmit = () => {
cartItems.map((el) => dispatch(removeFromCart(el.product)));

};

const handleCancelSubmit = (e) => {
  if(orders && orders.length) {
    const idUser = orders[orders.length-1].idUser;
    const idOrder = orders[orders.length-1].id
    dispatch(cancelOrder(idUser, idOrder));
    cartItems.map((el) => dispatch(removeFromCart(el.product)));
    dispatch(fetchOrders(idUser));
  } 
  };

console.log(orders)

  return (
    <div className={cComponent.actionpane}>
      <div className={cComponent.actionpane}>
        <Link to="/">
          <button className="btn btn-info">Volver a Home</button>
        </Link>
        <center>
          <h2 className={`${cComponent.titulo}`}>Detalle de su carrito</h2>
        </center>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info">El carrito está vacío</div>
      ) : (
       items && items.map((el) => (
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
        <h4>
          Total: ({items.reduce((a, c) => a + c.qty, 0)} item) : ${" "}
          {items.reduce((a, c) => a + c.price * c.qty, 0)}
        </h4>
      </div>
      <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
      <md-content layout-padding>
        <div className="tables">
          <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
            <thead>
              <tr>
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
                    {orders &&
              orders
                .filter((order) => order === orders[orders.length-1])
                .map((order) => (
                  <tr key={order.id}>
                    <td>{order.id} </td>
                    <td>{order.date}</td>
                    <td>{order.address} </td>
                    <td>{order.shipping}</td>
                    <td>{order.paymentmethod}</td>
                    <td>{order.status}</td>
                    <td>${order.priceTotal}</td>
                  </tr>
                ))}
                   
            </tbody>
          </table>
        </div>
      </md-content>
    </div>
      <div className={cComponent.footerdos}>
          <Link
            to={{
              pathname: `/`,
            }}
          >
            <button 
            type="button" className="btn btn-primary btn-lg btn-block"
            onClick={handleSubmit}
            >Confirmar Pedido</button>
          </Link>
          <Link
            to={{
              pathname: `/`,
            }}
          >
            <button 
            type="button" className="btn btn-secondary btn-lg btn-block"
            onClick={handleCancelSubmit}
            
            >Cancelar Pedido</button>
          </Link>
        </div>
        <div className={oComponent.footer}>
          <Link
            to={{
              pathname: `/users/${props.producto.match.params.id}/orders/historial`,
            }}
          >
            <button className="btn btn-success">Historial de Ordenes</button>
          </Link>
        </div>
     </div>
  );
}

export default OrderComponent;
