import React from "react";
import { useState, useEffect } from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import { editUser, getUserDetails } from "../Redux/Users/actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function EditUserForm(props) {
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { userDet, loadingUserDet, errorUserDet } = userDetails;

  const [userInput, setUserInput] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  const handleInputChange = function (e) {
    setUserInput({
      ...userInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(editUser(userInput));
  };

  useEffect(() => {
    dispatch(getUserDetails(props.usuario));
    setUserInput(userDet);
  }, [dispatch, props.usuario, userDet]);

  return (
    <div className={cComponent.page}>
      <div className={cComponent.back}>
        <Link to="/">
          <button className="btn btn-primary">Volver al panel de admin</button>
        </Link>
      </div>
      <form className={cComponent.form} onSubmit={handleSubmit}>
        <h1 className={`my-3 ${cComponent.tituloForm}`}>
          {" "}
          Editar informacion{" "}
        </h1>
        {loadingUserDet === true ? (
          <div className="alert alert-success">Cargando...</div>
        ) : errorUserDet ? (
          <div className="alert alert-danger">
            Se produjo un error, por favor inténtelo de nuevo más tarde.
          </div>
        ) : (
          userInput !== {} && (
            <div className={cComponent.Fcontent}>
              <div className="form-group">
                <label htmlFor="name"> Nombre: </label>
                <input
                  name="name"
                  value={userInput.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname"> Apellido: </label>
                <input
                  name="lastname"
                  value={userInput.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"> Email: </label>
                <input
                  name="email"
                  value={userInput.email}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="price"> Contraseña: </label>
                <input
                  name="password"
                  value={userInput.password}
                  type="password"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone"> Telefono </label>
                <input
                  name="phone"
                  value={userInput.phone}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Direccion: </label>
                <input
                  name="address"
                  value={userInput.address}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn-success">
                Guardar cambios
              </button>
            </div>
          )
        )}
      </form>
    </div>
  );
}
