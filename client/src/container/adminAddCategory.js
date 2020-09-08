import React from "react";
import cComponent from "./css/adminAddCategory.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default class AdminAddCategory extends React.Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }
  componentDidMount() {
    axios.get("http://localhost:3001/categories").then((data) => {
      this.setState({ categories: data.data });
    });
  }
  render() {
    return (
      <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
        <md-content layout-padding>
          <div className={cComponent.actionpane}>
            <Link to="/admin/categories/add">
              <button className="btn btn-success">Nueva Categoria</button>
            </Link>
            <center>
              <h2>Categorías</h2>
            </center>
          </div>

          <div className="tables">
            <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Fecha de creacion</th>
                  <th>Ultima modificacion</th>
                  <th>Accion</th>
                </tr>
              </thead>
              <tbody>
                {this.state.categories.map((category) => {
                  var cId = category.id;
                  const filter = (el) => {
                    return el.id !== cId;
                  };
                  const editar = () => {
                    console.log("editar");
                  };
                  const borrar = async () => {
                    console.log(cId);
                    this.setState({
                      categories: this.state.categories.filter(filter),
                    });
                    await axios
                      .delete(`http://localhost:3001/categories/${cId}`, {
                        params: cId,
                      })
                      .then((res) => {
                        return res;
                      });
                  };
                  return (
                    <tr>
                      <td>{category.id}</td>
                      <td>
                        <span className={cComponent.name}>{category.name}</span>
                      </td>
                      <td>{category.createdAt}</td>
                      <td>{category.updatedAt}</td>
                      <div class={cComponent.botones}>
                        <div
                          class="btn-group btn-group-toggle"
                          data-toggle="buttons"
                        >
                          <button onClick={editar} className="btn btn-primary">
                            Editar
                          </button>
                          <button onClick={borrar} className="btn btn-danger">
                            Eliminar
                          </button>
                        </div>
                      </div>
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
