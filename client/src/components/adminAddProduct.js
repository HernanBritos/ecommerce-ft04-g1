import React from "react";
import cComponent from "../components/css/adminAddProduct.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default class AdminAddProduct extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
  }
  componentDidMount() {
    axios.get("http://localhost:3001/products").then((data) => {
      this.setState({ products: data.data });
    });
  }
  render() {
    return (
      <div class={cComponent.products} ng-app="app" ng-controller="AppCtrl">
        <md-content layout-padding>
          <div className="actionpane">
            <Link to="/admin/products/add">
              <button className="btn btn-secondary">Nuevo Producto</button>
            </Link>
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
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((product) => {
                  return (
                    <tr>
                      <td>{product.id}</td>
                      <td>
                        <span className={cComponent.name}>{product.name}</span>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.price}</td>
                      <td>{product.stock}</td>
                      <td>{product.img}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </md-content>
      </div>
    );
  }
}
