import React from "react";
import "./headerInicio.css";
import SearchBarComponent from "./searchBarComponent";

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
        <div className="header">
          <button className="brand-button" onClick={openMenu}>
            &#9776;
          </button>
          <a className="brand" href="/">
            Asia Shoes
          </a>
          <div className="searchbar">
            <SearchBarComponent />
          </div>
        </div>
        <aside className="sidebar">
          <a href="#">Iniciar Sesion</a>
          <a href="#">Registrarse</a>
          <h3>Categorias de Compra</h3>
          <button className="close-button" onClick={closeMenu}>
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
