import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CatalogComponent from "./container/catalogComponent";
import FormProduct from "./container/formProducto.js";
import FormCategory from "./container/formCategory.js";
import ProductComponent from "./container/productComponent";
import HeaderInicio from "./components/headerInicio";
import AdminPanel from "./container/adminPanel";
import EditProduct from "./container/EditProduct";
import "./bootstrap.min.css";
import ProductCategory from "./container/productCategory";
import SearchComponent from "./container/SearchComponent";
import FormUser from "./container/addUser";
import EditUserForm from "./container/EditUser";
import CartComponent from "./container/cartcomponent";
import EditCategory from "./container/EditCategory";
import Login from "./container/loginCont";
import AddReviewContainer from "./container/addReviewcontainer";
import EditReviewContainer from "./container/editReview";
import OrderComponent from "./container/ordercomponent";
import OrdenesCompra from "./container/ordenescompra";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" render={() => <HeaderInicio />} />
      <main className="main">
        <div className="content">
          <Route path="/" exact={true} render={() => <CatalogComponent />} />
          <Route
            path="/admin"
            exact={true}
            render={() =>
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <AdminPanel />
              ) : (
                (window.location = "/")
              )
            }
          />
          <Route
            path="/products/search"
            exact={true}
            render={(p) => {
              return <SearchComponent producto={p.location.state} />;
            }}
          />
          <Route
            path="/admin/products/add"
            exact={true}
            render={() =>
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <FormProduct />
              ) : (
                (window.location = "/")
              )
            }
          />
          <Route
            path="/admin/categories/add"
            exact={true}
            render={() =>
              JSON.parse(localStorage.getItem("user")) &&
              JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <FormCategory />
              ) : (
                (window.location = "/")
              )
            }
          />
          <Route
            path="/product/:id"
            exact={true}
            render={(p) => {
              return <ProductComponent producto={p} />;
            }}
          />
          <Route
            path="/admin/products/edit/:id"
            exact={true}
            render={(p) => {
              return JSON.parse(localStorage.getItem("user")) &&
                JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <EditProduct producto={p.match.params.id} />
              ) : (
                (window.location = "/")
              );
            }}
          />
          <Route
            path="/admin/categories/edit/:id"
            exact={true}
            render={(p) => {
              return JSON.parse(localStorage.getItem("user")) &&
                JSON.parse(localStorage.getItem("user")).rol === "admin" ? (
                <EditCategory category={p} />
              ) : (
                (window.location = "/")
              );
            }}
          />
          <Route
            path="/products/categoria/:nombreCat"
            exact={true}
            render={(c) => {
              return <ProductCategory nombrecat={c.match.params.nombreCat} />;
            }}
          />
          <Route
            path="/users/signup"
            exact={true}
            render={() => {
              return <FormUser />;
            }}
          />
          <Route
            path="/users/edit/:id"
            exact={true}
            render={(u) => {
              return <EditUserForm usuario={u.match.params.id} />;
            }}
          />
          <Route
            path="/users/cart/:id?"
            exact={true}
            render={(c) => {
              return <CartComponent c={c} />;
            }}
          />
          <Route
            path="/users/login"
            exact={true}
            render={(u) => {
              return <Login u={u} />;
            }}
          />
          <Route
            path="/products/:id/review"
            exact={true}
            render={(p) => {
              return <AddReviewContainer producto={p.match.params.id} />;
            }}
          />
          <Route
            path="/products/:id/review/:idreview/edit"
            exact={true}
            render={(p) => {
              return <EditReviewContainer props={p} />;
            }}
          />
          <Route
            path="/users/:id/orders"
            exact={true}
            render={(p) => {
              return <OrderComponent producto={p} />;
            }}
          />
          <Route
            path="/users/:id/orders/historial"
            exact={true}
            render={(p) => {
              return <OrdenesCompra props={p} />;
            }}
          />
        </div>

      </main>
    </BrowserRouter>
  );
}
export default App;
