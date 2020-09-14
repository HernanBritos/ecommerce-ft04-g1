import React, { useState, useEffect } from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProduct } from "../Redux/Products/Actions/productActions";
import { detailsProduct } from "../Redux/Products/Actions/productActions";
import { listCategory } from "../Redux/Categories/Actions/categoryActions";

// Formulario del producto

export default function EditProduct(props) {
  // Estados locales
  const productDetails = useSelector((state) => state.productDetails);
  const { productDet, loadingDet, errorDet } = productDetails;
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loadingCat, errorCat } = categoryList;
  const dispatch = useDispatch();

  const [productInput, setProductInput] = useState({
    name: "",
    category: "",
    description: "",
    stock: "",
    price: "",
    img: "",
  });

  // Eventos que se realizan

  const handleProductInputChange = function (e) {
    var Product = e.target.value;
    setProductInput({
      ...productInput,
      [e.target.name]: Product,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(editProduct(productInput));
  };

  // Peticion de producto y categoria
  useEffect(() => {
    dispatch(detailsProduct(props.producto));
    dispatch(listCategory());
    setProductInput(productDet);
  }, [dispatch, props.producto]);

  // Todo lo que voy a renderizar en la pagina
  return (
    <div className={cComponent.page}>
      <div className={cComponent.back}>
        <Link to="/admin">
          <button className="btn btn-primary">Volver al panel de admin</button>
        </Link>
      </div>
      <form className={cComponent.form} onSubmit={handleSubmit}>
        <h1 className={`my-3 ${cComponent.tituloForm}`}>Modificar producto </h1>

        {loadingDet ? (
          <div className="alert alert-success">Cargando...</div>
        ) : errorDet ? (
          <div className="alert alert-danger">
            Se produjo un error, por favor inténtelo de nuevo más tarde.
          </div>
        ) : (
          productDet !== {} && (
            <div className={cComponent.Fcontent}>
              <div className="form-group">
                <label htmlFor="productname">Nombre de producto: </label>
                <input
                  name="name"
                  value={productInput.name}
                  type="text"
                  onChange={handleProductInputChange}
                  className="form-control"
                  id="ProductName"
                />
              </div>
              <div className="form-group">
                <label htmlFor="productcategory">Categoria: </label>
                <fieldset name="productcategory">
                  <div id="choicelist">
                    {loadingCat ? (
                      <div className="alert alert-success">Cargando...</div>
                    ) : errorCat ? (
                      <div className="alert alert-danger">
                        Se produjo un error, por favor inténtelo de nuevo más
                        tarde.
                      </div>
                    ) : categories.length > 0 ? (
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
                      ))
                    ) : (
                      <div
                        className={`alert alert-warning ${cComponent.alerta}`}
                      >
                        Oops! Parece que no hay categorías, intenta creando una.
                      </div>
                    )}
                  </div>
                </fieldset>
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripcion: </label>
                <textarea
                  className="form-control"
                  rows="3"
                  name="description"
                  value={productInput.description}
                  onChange={handleProductInputChange}
                  id="Description"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="price">Precio: </label>
                <input
                  name="price"
                  value={productInput.price}
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
                  value={productInput.stock}
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
                  value={productInput.img}
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
          )
        )}
      </form>
    </div>
  );
}
