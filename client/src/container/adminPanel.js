import React from "react";
import AddProduct from "./adminAddProduct";
import AddCategory from "./adminAddCategory";
import aPanel from "./css/adminPanel.module.css";
import { Link } from "react-router-dom";

class AdminPanel extends React.Component {
  render() {
    return (
      <div>
        <Link to="/">
          <button className="btn btn-primary">
            Volver a la página principal
          </button>
        </Link>
        <div className="container">
          <h2 className={aPanel.centrar}>Admin Panel</h2>
          <AddCategory />
          <AddProduct />
        </div>
      </div>
    );
  }
}

export default AdminPanel;
