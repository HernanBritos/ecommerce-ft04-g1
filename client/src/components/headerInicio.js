import React from "react";
import hInicio from "../components/css/headerInicio.module.css";
import SearchBarComponent from "../container/searchBarComponent";
import SideBar from "./sideBarComponent.js";

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
          <SideBar onclose={closeMenu} />
        </aside>
      </div>
    );
  }
}

export default HeaderInicio;
