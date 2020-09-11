import React from "react";
import cComponent from "./css/catalogComponent.module.css";
import ProductCard from "../components/productCard";

function SearchComponent(props) {
  console.log(props);

  return (
    <div className={cComponent.catalog}>
      <div>
        {props.producto.map((el) => {
          return <ProductCard producto={el} />;
        })}
      </div>
    </div>
  );
}
export default SearchComponent;
