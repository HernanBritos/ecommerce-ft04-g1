import React, {useState, useEffect} from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import axios from "axios";

function FormUser(props) {

    const [user,setUser]= useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        address: '',
    })

    const handleInputChange = function (e) {
        setUser({
          ...user,
          [e.target.name]: e.target.value,
        });
    }    

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
    <div className={cComponent.back}>
      <Link to="/">
        <button className="btn btn-primary">Volver al panel de admin</button>
      </Link>
      <form className={cComponent.form} onSubmit={handleSubmit} >
        <h1 className={`my-3 ${cComponent.tituloForm}`}>Registrarse </h1>
        <div className={cComponent.Fcontent}>
          <div className="form-group">
            <label htmlFor="productname">Nombre  </label>
            <input
              name="name"
              onChange={handleInputChange}
              value={user.name}
              type="text"
            />
          </div>
          <div className="form-group">
            <label htmlFor="apellido">Apellido </label>
            <input
            name="lastname"
            onChange={handleInputChange}
            value={user.lastname}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Email </label>
            <input
            name="email"
            onChange={handleInputChange}
            value={user.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password </label>
            <input
              name="password"
              onChange={handleInputChange}
              value={user.password}
              type="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone </label>
            <input
              name="phone"
              onChange={handleInputChange}
              value={user.phone}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address </label>
            <input
              name="address"
              onChange={handleInputChange}
              value={user.address}
            />
          </div>
          <button type="submit" className="btn-success">
            Registrarse
          </button>
        </div>
      </form>
    </div>
    )
}


export default FormUser; 