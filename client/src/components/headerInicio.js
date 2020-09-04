import React from "react";
import hInicio from "../components/css/headerInicio.module.css";
import SearchBarComponent from "../container/searchBarComponent";

class HeaderInicio extends React.Component {
  render() {
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
            Asia Shoes
          </a>
          <div className={hInicio.searchbar}>
            <SearchBarComponent />
          </div>
        </div>
        <aside className="sidebar">
          <a href="#">Iniciar Sesion</a>
          <a href="#">Registrarse</a>
          <h3>Categorias de Compra</h3>
          <button className={hInicio.closeButton} onClick={closeMenu}>
            x
          </button>
          <ul>
            <li>
              <a href="index.html">Zapatos</a>
            </li>

            <li>
              <a href="index.html">Zapatillas</a>
            </li>
          </ul>
        </aside>
      </div>
    );
  }
}

export default HeaderInicio;
