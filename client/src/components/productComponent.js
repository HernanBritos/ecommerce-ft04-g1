import React from "react";
import "./productComponent.css";
// import { Link } from "react-router-dom";

class ProductComponent extends React.Component {
  render() {
    return (
      <div className="card">
        <div className="image">
          <img src=""></img>
        </div>
        <div className="productData">
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
