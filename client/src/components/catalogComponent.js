import React from "react";
import "./catalogComponent.css";
import ProductCard from "./productCard";
import data from "./data";
import { Route } from "react-router-dom";

class CatalogComponent extends React.Component {
  render() {
    return (
      <div className="catalog">
        {data.products.map((product) => {
          return (
            <div className="pcard">
              <Route
                path="/"
                render={() => (
                  <div>
                    <ProductCard producto={product} />
                  </div>
                )}
              />
              {/* <ProductCard producto={product} /> */}
            </div>
          );
        })}
      </div>
    );
  }
}

export default CatalogComponent;
