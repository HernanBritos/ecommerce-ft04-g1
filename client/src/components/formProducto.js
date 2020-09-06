import React, { useState } from "react";
import cComponent from "../components/css/formproducto.module.css";
// import { Link } from "react-router-dom";
import axios from "axios";

export default function FormProduct() {
  const [input, setInput] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    img: "",
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
      .post("http://localhost:3001/products", {
        name: `${input.name}`,
        description: `${input.description}`,
        category: `${input.category}`,
        price: `${input.price}`,
        img: `${input.img}`,
        stock: `${input.stock}`,
      })
      .then((data) => {
        return data;
      });
    return (window.location = "http://localhost:3000/admin/products");
  };

  return (
    <form className={cComponent.form} onSubmit={handleSubmit}>
      <h1 className={`my-3 ${cComponent.tituloForm}`}>Añadir Producto... </h1>
      <div className={cComponent.Fcontent}>
        <div className="form-group">
          <label htmlFor="productname">Nombre de producto: </label>
          <input
            name="name"
            value={input.name}
            type="text"
            onChange={handleInputChange}
            className="form-control"
            id="ProductName"
          />
        </div>
        <div className="form-group">
          <label htmlFor="productname">Categoria: </label>
          <input
            name="category"
            value={input.category}
            type="text"
            onChange={handleInputChange}
            className="form-control"
            id="ProductCategory"
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripcion: </label>
          <textarea
            className="form-control"
            rows="3"
            name="description"
            value={input.description}
            onChange={handleInputChange}
            id="Description"
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio: </label>
          <input
            name="price"
            value={input.price}
            type="real"
            onChange={handleInputChange}
            className="form-control"
            id="price"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stock">Cantidad: </label>
          <input
            name="stock"
            value={input.stock}
            type="number"
            onChange={handleInputChange}
            className="form-control"
            id="stock"
          />
        </div>
        {/* <div className="form-group">
          <label htmlFor="exampleFormControlFile1"></label>
          <input
            type="file"
            className="form-control-file"
            id="exampleFormControlFile1"
          />
        </div> */}
        <div className="form-group">
          <label htmlFor="img">Imagen: </label>
          <input
            name="img"
            value={input.img}
            type="text"
            onChange={handleInputChange}
            className="form-control"
            id="img"
          />
        </div>
        <button type="submit" className="btn-secondary">
          Añadir a Productos
        </button>
      </div>
    </form>
  );
}
