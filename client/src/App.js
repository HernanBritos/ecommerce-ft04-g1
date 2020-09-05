import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CatalogComponent from "./components/catalogComponent";
import FormProduct from "./components/formProducto.js";
import FormCategory from "./components/formCategory.js";
import AdminAddProduct from "./components/adminAddProduct.js";
import AdminAddCategory from "./components/adminAddCategory.js";
import ProductComponent from "./container/productComponent";
import HeaderInicio from "./components/headerInicio";
import "./bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} render={() => <HeaderInicio />} />
      <main className="main">
        <div className="content">
          <Route path="/" exact={true} render={() => <CatalogComponent />} />
          <Route
            path="/admin/products"
            exact={true}
            render={() => <AdminAddProduct />}
          />
          <Route
            path="/admin/categories"
            exact={true}
            render={() => <AdminAddCategory />}
          />
          <Route
            path="/admin/products/add"
            exact={true}
            render={() => <FormProduct />}
          />
          <Route
            path="/admin/categories/add"
            exact={true}
            render={() => <FormCategory />}
          />
          <Route
            path="/product/:id"
            exact={true}
            render={() => <ProductComponent />}
          />
        </div>
      </main>
    </BrowserRouter>
  );
}
export default App;
