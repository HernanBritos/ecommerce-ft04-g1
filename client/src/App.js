import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import CatalogComponent from "./components/catalogComponent";
import ProductComponent from "./container/productComponent";
import HeaderInicio from "./components/headerInicio";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact={true} render={() => <HeaderInicio />} />
      <main className="main">
        <div className="content">
          <Route path="/" exact={true} render={() => <CatalogComponent />} />
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
