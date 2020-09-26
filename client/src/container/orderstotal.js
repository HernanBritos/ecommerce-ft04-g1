import oComponent from "./css/orderComponent.module.css";
import cComponent from "./css/adminAddCategory.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect } from "react";
import axios from "axios";
import { fetchOrderProducts, fetchAllOrders, statusconfirm} from "../Redux/Cart/Actions/cartActions";

function OrdenesCompra(props) {

const dispatch = useDispatch();

const getAllOrders = useSelector((state) => state.getAllOrders);
const { allorders } = getAllOrders;

useEffect(() =>  {
  dispatch(fetchOrderProducts())
  dispatch(fetchAllOrders());
  }, [dispatch]);
console.log(allorders)



  return (
    <div className={oComponent.options} >
      <div className={oComponent.catalogo2}>
        <Link to="/">
          <button className={oComponent.botonBack}>
            <ArrowBackIcon />
          </button>
        </Link>
      </div>
     <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
      <md-content layout-padding>
        <div className="tables">
          <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
          <thead>
            <tr key="0">
              <th scope="col">Id de Orden</th>
              <th scope="col">Id de Usuario</th>
              <th scope="col">Fecha</th>
              <th scope="col">Direccion</th>
              <th scope="col">Envio</th>
              <th scope="col">Forma de pago</th>
              <th scope="col">Status</th>
              <th scope="col">Precio Total</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {allorders &&
            allorders.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
            .map((allorder) => {
              const statusquo = () => {
                const id = allorder.idUser;
                const idOrder = allorder.id;
                
                if(allorder.status === "pendiente") {
                  axios
                  .put(`http://localhost:3001/users/${id}/orders/${idOrder}`, {
                    date: allorder.date,
                    priceTotal: allorder.priceTotal,
                    status: "confirmado",
                    address: allorder.address,
                    description: allorder.description,
                    paymentmethod: allorder.paymentmethod,
                    shipping: allorder.shipping,
                    
                  })
                  .then((data) => {
                    dispatch(statusconfirm(idOrder));
                  });
                 } else {
                  axios
                  .put(`http://localhost:3001/users/${id}/orders/${idOrder}`, {
                    date: allorder.date,
                    priceTotal: allorder.priceTotal,
                    status: "pendiente",
                    address: allorder.address,
                    description: allorder.description,
                    paymentmethod: allorder.paymentmethod,
                    shipping: allorder.shipping,
                  })
                  .then((data) => {
                    dispatch(statusconfirm(idOrder));
                  }); 
                  
                 }
                 return (window.location = "http://localhost:3000/admin/orders");
              };
              return (
                <tr key={allorder.id}>
                  <td>{allorder.id} </td>
                  <td>{allorder.idUser} </td>
                  <td>{allorder.date}</td>
                  <td>{allorder.address} </td>
                  <td>{allorder.shipping}</td>
                  <td>{allorder.paymentmethod}</td>
                  <td>{allorder.status}</td>
                  <td>${allorder.priceTotal}</td>
                  <td className={cComponent.botones}>
                <Link to={{
                    pathname: ("/admin/orders/" + `${allorder.id}` + "/detail"),
                    state: {
                        id : allorder.id
                    }
                    }}
                >
                    <button className={cComponent.editar}
                    state={allorder.id}
                    >Detalles</button>
                </Link> 
                <button 
                className={cComponent.borrar}
                onClick={statusquo}
                >
                    Pend/Conf
                </button>
                </td>
                </tr>
              )})}
          </tbody>
        </table>
      </div>
      </md-content>
    </div>
    </div>
  );
}


export default OrdenesCompra;