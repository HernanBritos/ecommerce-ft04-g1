import React from 'react';
import { useState, useEffect } from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

export default function EditUserForm(props) {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
   
  });
  console.log(props)
  const handleInputChange = function (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    // setErrors(
    //   validate({
    //     ...input,
    //     [e.target.name]: e.target.value,
    //   })
    // );
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/users/${props.usuario}`, {
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
    return (window.location = "http://localhost:3000");
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/users/${props.usuario}`).then((response) => {
      setUser(response.data);
    });
  }, []);

  return (
    <div className={cComponent.back}>
      <Link to="/">
        <button className="btn btn-primary">Volver al panel de admin</button>
      </Link>
      <form className={cComponent.form} onSubmit={handleSubmit}>
        <h1 className={`my-3 ${cComponent.tituloForm}`}> Editar informacion </h1>
        <div className={cComponent.Fcontent}>
          <div className="form-group">
            <label htmlFor="name"> Nombre </label>
            <input
              name="name"
              value={user.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastname"> Apellido: </label>
            <input
              name="lastname"
              value={user.lastname}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email"> email: </label>
            <input
              name="email"
              value={user.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="price"> password: </label>
            <input
              name="password"
              value={user.password}
              type="password"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone"> Telefono </label>
            <input
              name="phone"
              value={user.phone}
              type="text"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Direccion: </label>
            <input
              name="address"
              value={user.address}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn-success">
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
}

