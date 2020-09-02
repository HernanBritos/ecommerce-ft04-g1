import React from "react";
import HomeScreen from "./components/HomeScreen";
import SearchBarComponent from "./components/searchBarComponent";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
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
        <a className="home" href="/">
          <p className="brand">Asia Shoes</p>
        </a>
        <div className="searchbar">
          <SearchBarComponent />
        </div>
      </div>
      <aside className="sidebar">
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
          <Route path="/" exact={true} component={HomeScreen} />
        </div>
      </main>
    </BrowserRouter>
  );
}
export default App;
