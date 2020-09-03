import React from "react";
import "./productCard.css";

function ProductCard(props) {
  return (
    <a href="#">
      <div className="card">
        <div className="image">
          <img src={require(`${props.producto.image}`)}></img>
        </div>
        <div className="productData">
          <span>{props.producto.name}</span>
          <span>{props.producto.categoria}</span>
          <span> {props.producto.rating} &#11088;</span>
          <span> $ {props.producto.price}</span>
        </div>
      </div>
    </a>
  );
}

export default ProductCard;
