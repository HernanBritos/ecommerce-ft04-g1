import React, { useState, useEffect } from "react";
import cComponent from "./css/adminAddProduct.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AdminAddProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/products").then((data) => {
      setProducts(data.data);
    });
  }, []);

  return (
    <div className={cComponent.products} ng-app="app" ng-controller="AppCtrl">
      <md-content layout-padding>
        <div className={cComponent.actionpane}>
          <Link to="/admin/products/add">
            <button className={cComponent.buttonNew}>Nuevo Producto</button>
          </Link>
          <center>
            <h2>Productos</h2>
          </center>
        </div>

        <div className="tables">
          <table className="table-responsive-xl col-xl mx-auto table-striped table-bordered table-hover table-checkable order-column dataTable">
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
              {products.map((product) => {
                var pId = product.id;
                const filter = (el) => {
                  return el.id !== pId;
                };
                const borrar = async () => {
                  console.log(pId);
                  setProducts(products.filter(filter));
                  await axios
                    .delete(`http://localhost:3001/products/${pId}`, {
                      params: pId,
                    })
                    .then((res) => {
                      return res;
                    });
                };
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>
                      <span className={cComponent.name}>{product.name}</span>
                    </td>
                    <td>{product.category}</td>
                    <td>{product.price}</td>
                    <td>{product.stock}</td>
                    <td>
                      {product.img && (
                        <img
                          className={cComponent.image}
                          src={`/imagenes/uploads/${product.img}`}
                          alt=" "
                        ></img>
                      )}
                    </td>
                    <td className={cComponent.botones}>
                      <Link
                        to={{
                          pathname: `/admin/products/edit/${product.id}`,
                          state: product,
                        }}
                      >
                        <button className={cComponent.editar}>Editar</button>
                      </Link>
                      <button onClick={borrar} className={cComponent.borrar}>
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
