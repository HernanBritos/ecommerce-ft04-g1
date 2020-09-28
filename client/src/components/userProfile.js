import React from 'react';
import uP from "./css/userProfile.module.css";
import { Link } from "react-router-dom";
import { editUser, getUserDetails } from "../Redux/Users/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import OrderComponent from '../container/ordercomponent';




const UserProfile = (props) => {

  // Estados 
  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { userDet, loadingUserDet, errorUserDet } = userDetails;
  const [userInput, setUserInput] = useState({
    name: '',
    lastname:'' ,
    email: '',
    password: '',
    phone: '',
    address:'',
  });
  const user = JSON.parse(localStorage.getItem("user"));
  // Acciones de middleware
  
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

  // useEffect(() => {
  //   dispatch(getUserDetails(user.id));
  //   setUserInput(userDet);
  // }, []);

 
  return (
    <div className={`row ${uP.profile}`}>
      <div className="col-3">
        <div
          className="nav flex-column nav-pills"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <a
            className="nav-link"
            id="v-pills-profile-tab"
            data-toggle="pill"
            href="#v-pills-profile"
            role="tab"
            aria-controls="v-pills-profile"
            aria-selected="false"
          >
            Perfil
          </a>
          <a
            className="nav-link"
            id="v-pills-messages-tab"
            data-toggle="pill"
            href="#v-pills-messages"
            role="tab"
            aria-controls="v-pills-messages"
            aria-selected="false"
          >
            Mis Ordenes
          </a>
          <a
            className="nav-link"
            id="v-pills-settings-tab"
            data-toggle="pill"
            href="#v-pills-settings"
            role="tab"
            aria-controls="v-pills-settings"
            aria-selected="false"
          >
            Privacidad
          </a>
        </div>
      </div>
      <div className="col-9">
        <div className="tab-content" id="v-pills-tabContent">
          <div
            className="tab-pane fade"
            id="v-pills-profile"
            role="tabpanel"
            aria-labelledby="v-pills-profile-tab"
          >
          <form  onSubmit={handleSubmit}>
            <h3 className='my-3'>
                {" "} Mis datos{" "}
            </h3>
            <div className="form-group">
                <label htmlFor="name"> Nombre: </label>
                <input
                  className='form-control'
                  name="name"
                  value={user.name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastname"> Apellido: </label>
                <input
                  name="lastname"
                  className='form-control'
                  value={user.lastname}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email"> Email: </label>
                <input
                  name="email"
                  className='form-control'
                  value={user.email}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className="form-group">
                <label htmlFor="price"> Contraseña: </label>
                <input
                  name="password"
                  className='form-control'
                  value={user.password}
                  type="password"
                  onChange={handleInputChange}
                />
              </div> */}
              <div className="form-group">
                <label htmlFor="phone"> Telefono </label>
                <input
                  name="phone"
                  className='form-control'
                  value={user.phone}
                  type="text"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Direccion: </label>
                <input
                  name="address"
                  className='form-control mx-sm-3 mb-2'
                  value={user.address}
                  onChange={handleInputChange}
                />
              </div>
              <button type="submit" className="btn-success">
                Guardar cambios
              </button>
          </form> 
          </div>
          <div
            className="tab-pane fade"
            id="v-pills-messages"
            role="tabpanel"
            aria-labelledby="v-pills-messages-tab"
          >
            <a className='btn btn-info'  href={`/users/${user.id}/orders/historial`} >
              Ver mis Ordenes
            </a>
          </div>
          <div
            className="tab-pane fade" 
            id="v-pills-settings"
            role="tabpanel"
            aria-labelledby="v-pills-settings-tab"
          >
            <h3> Desea cambiar su contraseña? </h3>
            <div>
              <label> Contraseña Nueva </label>
              <input className= 'col-md-4' 
                onChange={handleInputChange}>
              </input>
            </div>
            <button class="btn btn-primary" type="submit">Cambiar contraseña</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
