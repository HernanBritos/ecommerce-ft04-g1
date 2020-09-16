import React, { useEffect } from "react";
import sBar from "./css/sideBarComponent.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listCategory } from "../Redux/Categories/Actions/categoryActions";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";

function SideBarComponent(props) {
  const dispatch = useDispatch();
  const categoryList = useSelector((state) => state.categoryList);
  const { categories, loadingCat, errorCat } = categoryList;

  useEffect(() => {
    dispatch(listCategory());
  }, [dispatch]);

  return (
    <div>
      <div className={sBar.auth}>
        <button className={sBar.signIn} href="#">
          Iniciar Sesión
        </button>
        <Link to="/users/signup">
          <button className={sBar.signUp} href="#">
            Registrarse
          </button>
        </Link>
      </div>
      <button className={sBar.closeButton} onClick={props.onclose}>
        x
      </button>
      <label className={sBar.filtro}>Filtrar por categoria: </label>
      <div className={sBar.categories}>
        {loadingCat ? (
          <div className="alert alert-success">Cargando...</div>
        ) : errorCat ? (
          <div className="alert alert-danger">
            Se produjo un error, por favor inténtelo de nuevo más tarde.
          </div>
        ) : (
          categories.length > 0 &&
          categories.map((cat) => (
            <div key={cat.id}>
              <Link to={"/products/categoria/" + cat.name}>
                <button className={`${sBar.category}`}>
                  <p>{cat.name}</p>
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
      <Link to="/admin">
        <div className={sBar.admin}>
          <button className={`btn btn-secondary`}>
            <SupervisorAccountIcon />
          </button>
        </div>
      </Link>
    </div>
  );
}

export default SideBarComponent;
