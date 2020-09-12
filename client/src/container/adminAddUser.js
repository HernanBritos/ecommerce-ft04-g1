import React, {useState, useEffect} from "react";
import cComponent from "./css/adminAddProduct.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminAddUser () {

     const [users, setUsers] = useState([]); 

  useEffect(() => {
    axios.get("http://localhost:3001/users").then((data) => {
      setUsers( data.data );
    });
  },[])

    return (
      <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
        <md-content layout-padding>
          <div className={cComponent.actionpane}>
            <center>
              <h2>Usuarios</h2>
            </center>
          </div>

          <div className="tables">
            <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  var pId = user.id;
                  const filter = (el) => {
                    return el.id !== pId;
                  };
                  const editar = () => {
                    console.log("editar");
                  };
                  const borrar = async () => {
                    console.log(pId);
                    setUsers(users.filter(filter));
                    await axios
                      .delete(`http://localhost:3001/users/${pId}`, {
                        params: pId,
                      })
                      .then((res) => {
                        return res;
                      });
                  };
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>
                        <span className={cComponent.name}>{user.name}</span>
                      </td>
                      <td>{user.lastname}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{user.address}</td>
                      <td className={cComponent.botones}>
                        <Link to={`/admin/users/edit/${user.id}`}>
                        <button onClick={editar} className="btn btn-primary">
                          Editar
                        </button>
                        </Link>
                        <button onClick={borrar} className="btn btn-danger">
                          Eliminar
                        </button>
                      </td>
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
