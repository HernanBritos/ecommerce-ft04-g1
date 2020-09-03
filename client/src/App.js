import React from "react";
import SearchBarComponent from "./components/searchBarComponent";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import CatalogComponent from "./components/catalogComponent";

function App() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  return (
    <BrowserRouter>
      <div className="homepage">
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
      <main className="main">
        <div className="content">
          <CatalogComponent />
        </div>
      </main>
    </BrowserRouter>
  );
}
export default App;
