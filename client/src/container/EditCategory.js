import React, { useState, useEffect } from "react";
import cComponent from "./css/formproducto.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editCategory } from "../Redux/Categories/Actions/categoryActions";
import { detailsCategory } from "../Redux/Categories/Actions/categoryActions";

// Formulario del producto

export default function EditCategory(props) {
  // Estados locales
  const categoryDetails = useSelector((state) => state.categoryDetails);
  const { categoryDet, loadingCatDet, errorCatDet } = categoryDetails;
  const dispatch = useDispatch();

  const [categoryInput, setCategoryInput] = useState({
    name: "",
  });

  // Eventos que se realizan

  const handleCategoryInputChange = function (e) {
    var Category = e.target.value;
    setCategoryInput({
      ...categoryInput,
      [e.target.name]: Category,
    });
  };

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(editCategory(categoryInput));
  };

  // Peticion de categoria
  useEffect(() => {
    dispatch(detailsCategory(props.category));
    setCategoryInput(categoryDet);
  }, [dispatch, props.category]);

  // Todo lo que voy a renderizar en la pagina
  return (
    <div className={cComponent.back}>
      <Link to="/admin">
        <button className="btn btn-primary">Volver al panel de admin</button>
      </Link>
      <form className={cComponent.form} onSubmit={handleSubmit}>
        <h1 className={`my-3 ${cComponent.tituloForm}`}>
          Modificar categoria{" "}
        </h1>
        <div className={cComponent.Fcontent}>
          {loadingCatDet ? (
            <div className="alert alert-success">Cargando...</div>
          ) : errorCatDet ? (
            <div className="alert alert-danger">
              Se produjo un error, por favor inténtelo de nuevo más tarde.
            </div>
          ) : (
            categoryInput && (
              <div className="form-group">
                <label htmlFor="categoryname">Nombre de categoria: </label>
                <input
                  name="name"
                  value={categoryInput.name}
                  type="text"
                  onChange={handleCategoryInputChange}
                  className="form-control"
                  id="CategoryName"
                />
              </div>
            )
          )}

          <button type="submit" className="btn-success">
            Modificar producto
          </button>
        </div>
      </form>
    </div>
  );
}
