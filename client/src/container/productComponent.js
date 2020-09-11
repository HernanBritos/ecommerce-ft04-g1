import React from "react";
import pComp from "./css/productComponent.module.css";
// import { Link } from "react-router-dom";
var placeholder = "/imagenes/Placeholder.png";

function ProductComponent(props) {
  // useEffect(() => {
  //   axios.get("http://localhost:3001/products").then((data) => {
  //     setProducts( data.data );
  //   });
  // }, products)

  if (props.producto) {
    return (
      <div className={pComp.card}>
        <div className={pComp.image}>
          {props.producto.img.includes("jpg") ? (
            <img
              src={`/imagenes/${props.producto.img}`}
              alt="productCardImage"
            ></img>
          ) : (
            <img src={`${placeholder}`} alt="productCardImage"></img>
          )}
        </div>
        <div className={pComp.productData}>
          <span className={pComp.name}>{props.producto.name}</span>
          <span className={pComp.category}>{props.producto.category}</span>
          <span className={pComp.description}>
            {props.producto.description}
          </span>
          <span className={pComp.price}> $ {props.producto.price}</span>
          <span className={pComp.stock}>
            {props.producto.stock}
            <span className={pComp.stockIcon} role="img">
              &#9921;
            </span>
          </span>
        </div>
      </div>
    );
  } else {
    return <div>Product Not Found</div>;
  }
}
export default ProductComponent;
