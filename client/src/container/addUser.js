import React, { useState } from "react";
import cComponent from "./css/formUser.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

function FormUser(props) {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleInputChange = function (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users", {
        name: `${user.name}`,
        lastname: `${user.lastname}`,
        email: `${user.email}`,
        password: `${user.password}`,
        phone: `${user.phone}`,
        address: `${user.address}`,
      })
      .then((data) => {
        return data;
      });
    return (window.location = "http://localhost:3000/");
  };

  return (
    <div className={cComponent.formPage}>
      <div className={cComponent.container}>
        <div className={cComponent.options}>
          <Link to="/admin">
            <button className={cComponent.botonBack}>
              <ArrowBackIcon />
            </button>
          </Link>
        </div>
        <div className={cComponent.upload}>
          <h3>Registrarse</h3>
        </div>
        <form className={cComponent.form} onSubmit={handleSubmit}>
          <div className={cComponent.name}>
            <label htmlFor="name">Nombre: </label>
            <input
              placeholder="Nombre"
              name="name"
              value={user.name}
              type="text"
              onChange={handleInputChange}
            />
          </div>

          <div className={cComponent.price}>
            <span>Apellido: </span>
            <input
              placeholder="Apellido"
              name="lastname"
              value={user.lastname}
              type="text"
              onChange={handleInputChange}
              id="price"
            />
          </div>
          <div className={cComponent.price}>
            <span>Email: </span>
            <input
              placeholder="Email"
              name="email"
              value={user.email}
              type="text"
              onChange={handleInputChange}
              id="price"
            />
          </div>
          <div className={cComponent.price}>
            <span>Contraseña: </span>
            <input
              placeholder="Contraseña"
              name="password"
              value={user.password}
              type="password"
              onChange={handleInputChange}
              id="price"
            />
          </div>
          <div className={cComponent.price}>
            <span>Teléfono: </span>
            <input
              placeholder="Telefono"
              name="phone"
              value={user.phone}
              type="text"
              onChange={handleInputChange}
              id="price"
            />
          </div>
          <div className={cComponent.stock}>
            <span>Direccion: </span>
            <input
              placeholder="Direccion"
              name="address"
              value={user.address}
              type="text"
              onChange={handleInputChange}
              id="stock"
            />
          </div>
          <button className={cComponent.botonAdd} type="submit">
            Crear cuenta
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormUser;
