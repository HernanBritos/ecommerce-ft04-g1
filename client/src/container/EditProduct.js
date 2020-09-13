import React, { useState, useEffect } from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {useSelector, useDispatch} from 'react-redux';
import { editProduct } from "../Redux/Products/Actions/productActions";

// Formulario del producto

export default function FormProduct(props) {
  // Estados locales
  // const editProduct = useSelector(state => state.editProduct);
  // const {product, loading, error} = editProduct;
  // const dispatch = useDispatch();

  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState([]);

  // Eventos que se realizan

  const handleProductInputChange = function (e) {
    var Product = e.target.value;
    setProduct({
      ...product,
      [e.target.name]: Product,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    axios
      .put(`http://localhost:3001/products/${props.producto}`, {
        name: `${product.name}`,
        description: `${product.description}`,
        category: `${product.category}`,
        price: `${product.price}`,
        img: `${product.img}`,
        stock: `${product.stock}`,
      })
      .then((data) => {
        return data;
      });
    return (window.location = "http://localhost:3000/admin");
  };

  // Peticion de producto y categoria
  useEffect(() => {
    axios
      .get("http://localhost:3001/products/" + props.producto)
      .then((response) => {
        setProduct(response.data);
      });
    axios.get("http://localhost:3001/categories/").then((response) => {
      setCategories(response.data);
    });
  }, [props.producto]);

  // Todo lo que voy a renderizar en la pagina
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
            <fieldset aria-labelledby="lblDBXP">
              <div id="choicelist">
                {categories &&
                  categories.map((cat) => (
                    <div key={cat.id}>
                      <input
                        name="category"
                        value={cat.name}
                        type="radio"
                        id={cat.id}
                        onChange={handleProductInputChange}
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
            Modificar producto
          </button>
        </div>
      </form>
    </div>
  );
}
