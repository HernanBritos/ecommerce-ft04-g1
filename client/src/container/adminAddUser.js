import React, { useEffect } from "react";
import cComponent from "./css/adminAddUser.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getUser,
  deleteUser,
  makeAdmin,
} from "../Redux/Users/actions/userActions";
import axios from "axios";

export default function AdminAddUser() {
  const userList = useSelector((state) => state.userList);
  const { users, loading, error } = userList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
      <md-content layout-padding>
        <div className={cComponent.actionpane}>
          <center>
            <h2>Usuarios</h2>
          </center>
        </div>
        <div className="tables">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            <table className="table  table-striped table-bordered table-hover table-checkable order-column dataTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>Email</th>
                  <th>Telefono</th>
                  <th>Direccion</th>
                  <th>Rol</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  var uId = user.id;
                  const borrar = () => {
                    dispatch(deleteUser(uId));
                  };
                  const hacerAdmin = () => {
                    axios
                      .put(`http://localhost:3001/users/${uId}`, {
                        rol: "admin",
                      })
                      .then((data) => {
                        dispatch(makeAdmin(uId));
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
                      <td>{user.rol}</td>
                      <td className={cComponent.botones}>
                        {/* <Link to={`/users/edit/${user.id}`}>
                          <button className={cComponent.editar}>Editar</button>
                        </Link> */}
                        <button onClick={borrar} className={cComponent.borrar}>
                          Eliminar
                        </button>
                        <button
                          onClick={hacerAdmin}
                          className={cComponent.editar}
                        >
                          MakeAdmin
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </md-content>
    </div>
  );
}
