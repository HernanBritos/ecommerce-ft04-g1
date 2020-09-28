import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { userForm } from "../container/css/userForm.module.css";
import axios from "axios";
axios.defaults.withCredentials = true;
function LoginContainer(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginUser = async (email, password) => {
    return await axios
      .post("http://localhost:3001/users/login", {
        email,
        password,
      })
      .then((data) => {
        console.log(data);
        if (data.data.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
          return (window.location = `/`);
        } 
        return data;
      });
  };

  const checkoutHandler = async () => {
    await axios
      .post(
        `http://localhost:3001/users/${
          JSON.parse(localStorage.getItem("user")).id
        }/orders`,
        {
          idUser: JSON.parse(localStorage.getItem("user")).id,
          date: props.u.location.state.formCart.date,
          priceTotal: props.u.location.state.subtotal,
          status: props.u.location.state.formCart.status,
          address: props.u.location.state.formCart.address,
          description: props.u.location.state.formCart.description,
          paymentmethod: props.u.location.state.formCart.paymentmethod,
          shipping: props.u.location.state.formCart.shipping,
        }
      )
      .then((data) => {
        console.log(data.data.id);
        props.u.location.state.cartItems.map(async (product) => {
          await axios
            .post(`http://localhost:3001/orders`, {
              idOrder: data.data.id,
              idProduct: product.product,
              price: product.price,
              ammount: product.qty,
            })
            .then((res) => console.log(res));
        });
        return data;
      });
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(user.email, user.password)
      .then((data) => {
        console.log(data);
        if (!data.data.success) {
          setError(data.data.message);
        } else {
          setMessage(data.data.message);
          if (props.u.location.state.redCart) {
            checkoutHandler();
            return (window.location = `/users/${
              JSON.parse(localStorage.getItem("user")).id
            }/orders`);
          }
          return (window.location = `/`);
        }
      })
      .catch((err) => err);
  };

  return (
    <div style={{ paddingTop: "170px" }} className={userForm}>
      {message ? (
        <div className="alert alert-success">{message}</div>
      ) : (
        error && <div className="alert alert-danger">{error}</div>
      )}
      <form className="mx-auto form-signin col-md-3" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Login</h1>
        <label htmlFor="inputEmail" className="sr-only">
          Email address
        </label>
        <input
          type="email"
          id="inputEmail"
          name="email"
          className="form-control"
          placeholder="Email address"
          required
          onChange={handleChange}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          name="password"
          className="form-control"
          placeholder="Password"
          required
          onChange={handleChange}
        />
        <p className="text-danger mt-3"></p>
        <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">
          Iniciar Sesion 
        </button>
        <h6> No estas registrado? Registrate </h6>
        <Link to={{ pathname: "/users/signup",}}>
        <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">
          Registrarse
        </button>
        </Link>
      </form>
    </div>
  );
}

export default LoginContainer;