import React, { useState } from "react";
import cComponent from "./css/addUser.module.css";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { addUser } from "../Redux/Users/actions/userActions";
import { useDispatch } from "react-redux";
import axios from "axios";

function FormUser(props) {
  const [user, setUser] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = function (e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      user.name &&
      user.lastname &&
      user.address &&
      user.phone &&
      user.password &&
      user.email
    ) {
      await axios
        .post(
          "http://localhost:3001/users/signup",

          {
            name: `${user.name}`,
            lastname: `${user.lastname}`,
            email: `${user.email}`,
            password: `${user.password}`,
            phone: `${user.phone}`,
            address: `${user.address}`,
            withCredentials: true,
          }
        )
        .then((data) => {
          if (!data.data.success) {
            setErrors([...errors, data.data.message]);
          }
          if (data.data.success) {
            setSuccess(true);
          }

          console.log(data.data.message);
          console.log(data.data.success);
        });
    } else {
      setErrors([
        ...errors,
        "Por favor, complete todos los campos para continuar",
      ]);
    }
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
          {success && (
            <div className={"mx-auto"}>
              <div className={"alert alert-info"}>Registro exitoso!</div>
              <a className={"mx-auto btn btn-success"} href="/users/signin">
                Iniciar sesión
              </a>
            </div>
          )}
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
          <ul>
            {errors &&
              errors.map((err) => (
                <li className="alert alert-danger alert-block">{err}</li>
              ))}
          </ul>
        </form>
      </div>
    </div>
  );
}

export default FormUser;
