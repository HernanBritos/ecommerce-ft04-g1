import oComponent from "./css/orderComponent.module.css";
import cComponent from "./css/adminAddCategory.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import React, { useEffect } from "react";
import { fetchOrderProducts} from "../Redux/Cart/Actions/cartActions";

function OrderDetail(props) {
const dispatch = useDispatch();
const getOrderProduct = useSelector((state) => state.getOrderProduct);
const { orderproducts } = getOrderProduct;


useEffect(() =>  {
  dispatch(fetchOrderProducts())
  
  }, [dispatch]);

console.log(props.id.location.state.id)
console.log(orderproducts)

  return (
    <div className={oComponent.options} >
      <div className={oComponent.catalogo2}>
        <Link to="/admin/orders">
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
              <th scope="col">Id de Producto</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {orderproducts &&
              orderproducts
                .filter((orderproduct) => orderproduct.idOrder === props.id.location.state.id)
                .map((orderproduct) =>
              (
                <tr key={orderproduct.id}>
                  <td>{orderproduct.idOrder} </td>
                  <td>{orderproduct.idProduct}</td>
                  <td>{orderproduct.price} </td>
                  <td>{orderproduct.ammount}</td>
                  <td>{orderproduct.createdAt}</td>
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

export default OrderDetail;
