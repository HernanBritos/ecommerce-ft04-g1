import React from "react";
import hInicio from "../components/css/headerInicio.module.css";
import SearchBarComponent from "../container/searchBarComponent";
import SideBar from "../container/sideBarComponent.js";
import { Link } from "react-router-dom";
import navBar from './navBar'
import CnavBar from './css/navBar.module.css'

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
        <div  className= {navBar}>
        <navBar >
          <div style={{ left: "0px",display: "flex", top: "90px", justifyContent: 'center' }} className={CnavBar.navbar}>
            <a className={CnavBar.navbar_a} href="http://localhost:3000/">Inicio</a>
            <a className={CnavBar.navbar_a}  href="http://localhost:3000/products">Productos</a>
            <a className={CnavBar.navbar_a}  href="http://localhost:3000/categories">Categorias</a>
            <a className={CnavBar.navbar_a} href="http://localhost:3000/contact">Contacto</a> {/* Falta hacer */}
          </div>
          </navBar>
        </div>
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
                alt=" "
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
