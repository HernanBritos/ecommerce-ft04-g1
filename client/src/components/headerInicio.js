import React from "react";
import hInicio from "../components/css/headerInicio.module.css";
import SearchBarComponent from "../container/searchBarComponent";
import SideBar from "../container/sideBarComponent.js";
import { Link } from "react-router-dom";
import navBar from './navBar'
import CnavBar from './css/navBar.module.css'
import { useSelector } from "react-redux";

function HeaderInicio() {
  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  };
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;


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
                alt=" "
              />
              { cartItems.length !== 0 ?  (
              <span className={hInicio.badge}>{cartItems.length}</span>): (null) 
            }
            </button>
          </div>
        </Link>
        <div className={hInicio.searchbar}></div>
        <div className={hInicio.searchbar}>
          <SearchBarComponent />
        </div>
      </div>
      <aside style= {{zIndex: 1}}className="sidebar">
        <SideBar onclose={closeMenu} />
      </aside>
    </div>
  );
}

export default HeaderInicio;
