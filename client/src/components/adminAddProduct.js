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
          <div className={cComponent.actionpane}>
            <Link to="/admin/products/add">
              <button className="btn btn-success">Nuevo Producto</button>
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
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.state.products.map((product) => {
                  var pId = product.id;
                  const filter = (el) => {
                    return el === this.state.products[pId];
                  };
                  const editar = () => {
                    console.log("editar");
                  };
                  const borrar = async () => {
                    console.log(pId);
                    this.setState({
                      products: this.state.products.filter(filter),
                    });
                    await axios
                      .delete(`http://localhost:3001/products/${pId}`, {
                        params: pId,
                      })
                      .then((res) => {
                        return res;
                      });
                  };
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
                      <span className={cComponent.botones}>
                        <button onClick={editar} className="btn btn-primary">
                          Editar
                        </button>
                        <button onClick={borrar} className="btn btn-danger">
                          Eliminar
                        </button>
                      </span>
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
