import React from "react";
import hInicio from "../components/css/headerInicio.module.css";
import SearchBarComponent from "../container/searchBarComponent";
import SideBar from "../container/sideBarComponent.js";
import { Link } from "react-router-dom";

function HeaderInicio() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <div>
      <div className={hInicio.header}>
        <button className={hInicio.brandButton} onClick={openMenu}>
          &#9776;
        </button>
        <a className={hInicio.brand} href="/">
          Asia Pilar Shoes
        </a>
        <Link
          to={{
            pathname: "/users/cart",
          }}
        >
          <div className={`${hInicio.botoncart}`}>
            <button className={hInicio.cartboton} type="submit">
              <img
                src={`/imagenes/carrito-de-compras.png`}
                className={hInicio.cartbotonimg}
              />
            </button>
          </div>
        </Link>
        <div className={hInicio.searchbar}></div>
        <div className={hInicio.searchbar}>
          <SearchBarComponent />
        </div>
      </div>
      <aside className="sidebar">
        <SideBar onclose={closeMenu} />
      </aside>
    </div>
  );
}

export default HeaderInicio;
