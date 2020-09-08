 import React, { useState, useEffect } from "react";
 import cComponent from "./css/formproducto.module.css";
 import { Link } from "react-router-dom";
 import axios from "axios";

    // Formulario del producto 
    
    export default function FormProduct(props) {
    const [input, setInput] = useState({
      name: "",
      category: "",
      description: "",
      price: "",
      stock: "",
      img: "",
    });

    // Estados locales 

    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});
  
    // Eventos que se realizan

    const handleInputChange = function (e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleProductInputChange = function (e) {
  
        var Product = {};
        setProduct({
          ...product,
          [e.target.name]: e.target.value,
        });
      };
    

    const handleCategoryInputChange = function (e) {
  
      var categories = [];
      categories.push(e.target.id)
      setInput({
        ...input,
        nameCat: categories,
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
  
    
    // Peticion de producto y categoria 
    useEffect(() => {
       axios.get("http://localhost:3001/products/" + props.producto). then((response) => {
           setProduct(response.data);
       })
       axios.get("http://localhost:3001/categories/").then((response) => {
          setCategories(response.data);
       });
    },product,categories)
  
    // Todo lo que voy a renderizar en la pagina 
    console.log(product);
    return (
      <div className={cComponent.back}>
        <Link to="/admin">
          <button className="btn btn-primary">Volver al panel de admin</button>
        </Link>
        <form className={cComponent.form} onSubmit={handleSubmit}>
          <h1 className={`my-3 ${cComponent.tituloForm}`}>Modificar producto </h1>
          <div className={cComponent.Fcontent}>
            <div className="form-group">
              <label htmlFor="productname">Nombre de producto: </label>
              {console.log(product.name)}
              <input
                name="name"
                value={product.name}
                type="text"
                onChange={handleProductInputChange}
                className="form-control"
                id="ProductName"
              />
            </div>
            <div className="form-group">
              <label htmlFor="productname">Categoria: </label>
          <button id="selectedDBXP" aria-expanded="false" aria-labelledby="lblDBXP DBXPList" onclick="return DBXPclick();">
            <span id="DBXPList"></span>
              <i class="fa fa-chevron-down" aria-hidden="true"></i>
              </button>
              <fieldset aria-labelledby="lblDBXP">
                <div id="choicelist">
                {categories && categories.map(cat => (
                  <div>
                    <input name="DBXP" type="checkbox" id={cat.id} onChange={handleProductInputChange} />
                    <label for={cat.id} aria-label="categories">{cat.name}</label>
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
                value={product.description}
                onChange={handleProductInputChange}
                id="Description"
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="price">Precio: </label>
              <input
                name="price"
                value={product.price}
                type="real"
                onChange={handleProductInputChange}
                className="form-control"
                id="price"
              />
            </div>
            <div className="form-group">
              <label htmlFor="stock">Cantidad: </label>
              <input
                name="stock"
                value={product.stock}
                type="number"
                onChange={handleProductInputChange}
                className="form-control"
                id="stock"
              />
            </div>
            <div className="form-group">
              <label htmlFor="img">Imagen: </label>
              <input
                name="img"
                value={product.img}
                type="text"
                onChange={handleProductInputChange}
                className="form-control"
                id="img"
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