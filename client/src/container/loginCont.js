import React, { useState } from "react";
import Login from "../components/Login";

function LoginContainer(props) {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:3001/users/getuser").then((data) => {
      console.log(data);
    });
  };

  return <Login onChange={onChange} state={user} onSubmit={onSubmit} />;
}

export default LoginContainer;
