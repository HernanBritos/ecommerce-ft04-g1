import React from "react";
import { userForm } from "../container/css/userForm.module.css";

export default function Login(props) {
  return (
    <div style={{ paddingTop: "170px" }} className={userForm}>
      <form className="mx-auto form-signin col-md-3" onSubmit={props.onSubmit}>
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
          onChange={props.onChange}
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
          onChange={props.onChange}
        />
        <p className="text-danger mt-3"></p>
        <button className="btn btn-lg btn-primary btn-block mb-3" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
