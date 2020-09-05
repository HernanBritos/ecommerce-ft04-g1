import React, { useState } from "react";
import cComponent from "../components/css/formCategory.module.css";
// import { Link } from "react-router-dom";
import axios from "axios";

export default function FormCategory() {
  const [input, setInput] = useState({
    name: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleInputChange = function (e) {
    setInput({
      ...input,
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
      .post("http://localhost:3001/category", {
        name: `${input.name}`,
      })
      .then((data) => {
        return data;
      });
  };

  return (
    <form className={cComponent.form} onSubmit={handleSubmit}>
      <h1 className={`my-3 ${cComponent.tituloForm}`}>Añadir Categoria... </h1>
      <div className={cComponent.Fcontent}>
        <div className="nose">
          <label htmlFor="productname">Nombre de Categoria: </label>
          <input
            name="name"
            value={input.name}
            type="text"
            onChange={handleInputChange}
            class="form-control"
            id="CategoryName"
          />
        </div>
        <button type="submit" className="btn-secondary">
          Añadir a Categorias
        </button>
      </div>
    </form>
  );
}
