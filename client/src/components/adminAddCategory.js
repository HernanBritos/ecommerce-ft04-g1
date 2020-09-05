import React from "react";
import cComponent from "../components/css/adminAddCategory.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default class AdminAddCategory extends React.Component {
  constructor() {
    super();
    this.state = { categories: [] };
  }
  componentDidMount() {
    axios.get("http://localhost:3001/category").then((data) => {
      this.setState({ categories: data.data });
    });
  }
  render() {
    return (
      <div class={cComponent.products} ng-app="app" ng-controller="AppCtrl">
        <md-content layout-padding>
          <div className={cComponent.actionpane}>
            <Link to="/admin/categories/add">
              <button className="btn btn-success">Nueva Categoria</button>
            </Link>
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
                          <label class="btn btn-primary">
                            <input
                              type="radio"
                              name="options"
                              id="option1"
                              autocomplete="off"
                              checked
                            />{" "}
                            Editar
                          </label>
                          <label class="btn btn-danger">
                            <input
                              type="radio"
                              name="options"
                              id="option2"
                              autocomplete="off"
                            />{" "}
                            Eliminar
                          </label>
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
