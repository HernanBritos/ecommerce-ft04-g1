import React, { useState } from "react";
import { userForm } from "../container/css/userForm.module.css";
import axios from "axios";
function LoginContainer() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const getUser = async () => {
    await axios
      .get("http://localhost:3001/users", {
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/users/signin", {
        email: user.email,
        password: user.password,
        withCredentials: true,
      })
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div style={{ paddingTop: "170px" }} className={userForm}>
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
          Login
        </button>
      </form>
      <form onSubmit={getUser}>
        <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">
          Get User
        </button>
      </form>
    </div>
  );
}

export default LoginContainer;
