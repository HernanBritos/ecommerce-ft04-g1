import React from "react";
import pComp from "./css/productComponent.module.css";
// import { Link } from "react-router-dom";

class ProductComponent extends React.Component {
  render() {
    return (
      <div className={pComp.prodComp}>
        <div>
          <img src=""></img>
        </div>
        <div>
          <span>Zapato Prueba</span>
          <span>Categoria Prueba </span>
          <span role="img">Rating prueba &#11088;</span>
          <span> Precio producto prueba</span>
        </div>
      </div>
    );
  }
}

export default ProductComponent;
