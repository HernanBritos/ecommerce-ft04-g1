import React from "react";
import oComponent from "./css/orderComponent.module.css";
import cComponent from "./css/adminAddCategory.module.css";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function OrdenesCompra(props) {
  const getOrders = useSelector((state) => state.getOrders);
  const { orders } = getOrders;

  return (

    <div className={oComponent.options} >
    <div>
      <div className={oComponent.catalogo2}>
        <button
          onClick={() => window.history.back()}
          className={oComponent.botonBack}
        >
          <ArrowBackIcon />
        </button>
      </div>
      <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
        <md-content layout-padding>
          <div className="tables">
            <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
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
                {orders &&
                  orders.map((order) => (
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
    </div>
  );
}

export default OrdenesCompra;
