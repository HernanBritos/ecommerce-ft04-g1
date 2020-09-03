import React from "react";
import "./catalogComponent.css";
import ProductCard from "./productCard";
import data from "./data";

function CatalogComponent() {
  return (
    <div className="catalog">
      {data.products.map((product) => {
        return (
          <div className="pcard">
            <ProductCard producto={product} />
          </div>
        );
      })}
    </div>
  );
}

export default CatalogComponent;
