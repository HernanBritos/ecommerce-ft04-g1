import React, { useState, useEffect } from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import FileUpload from "../components/utils/FileUpload";

export default function FormProduct() {
  const [input, setInput] = useState({
    name: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    img: "",
  });

  const [categories, setCategories] = useState([]);

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

  const handleCategoryInputChange = function (e) {
    var categories = "";
    categories = e.target.name;
    setInput({
      ...input,
      category: categories,
    });
    console.log(categories);
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
    return (window.location = "http://localhost:3000/admin");
  };

  useEffect(() => {
    axios.get("http://localhost:3001/categories/").then((response) => {
      setCategories(response.data);
    });
  }, []);

  const UpdateImages = (newImages) => {
    setInput({ img: newImages });
  };

  return (
    <div className={cComponent.back}>
      <Link to="/admin">
        <button className="btn btn-primary">Volver al panel de admin</button>
      </Link>
      <form className={cComponent.form} onSubmit={handleSubmit}>
        <div className={cComponent.upload}>
          <h1 className={`my-3 ${cComponent.tituloForm}`}>
            Añadir Producto...{" "}
          </h1>
          <FileUpload refreshFunction={UpdateImages} />
        </div>
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
            <fieldset aria-labelledby="lblDBXP">
              <div id="choicelist">
                {categories &&
                  categories.map((cat) => (
                    <div key={cat.id}>
                      <input
                        name={cat.name}
                        type="radio"
                        id={cat.id}
                        onChange={handleCategoryInputChange}
                      />
                      <label htmlFor={cat.id} aria-label="categories">
                        {cat.name}
                      </label>
                    </div>
                  ))}
              </div>
            </fieldset>
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
          <button type="submit" className="btn-success">
            Añadir a Productos
          </button>
        </div>
      </form>
    </div>
  );
}
