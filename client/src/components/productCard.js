import React from "react";
import pCard from "./css/productCard.module.css";
import { Link } from "react-router-dom";
var placeholder = "/imagenes/Placeholder.png";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
}

  render() {
    return (
      <Link
        to={{
          pathname: "/product/" + this.props.producto.id,
          state: this.props.producto,
        }}
      >
        <div className={pCard.card}>
          <div className={pCard.image}>
            {this.props.producto.img.includes("jpg") ? (
              <img
                src={`/imagenes/${this.props.producto.img}`}
                alt="productCardImage"
              ></img>
            ) : (
              <img src={`${placeholder}`} alt="productCardImage"></img>
            )}
            
          </div>
          <div className={pCard.productData}>
            <span className={pCard.name}>{this.props.producto.name}</span>
            <span className={pCard.category}>
              {this.props.producto.category}
            </span>
            <span className={pCard.price}> $ {this.props.producto.price}</span>
            <span className={pCard.carrito}>
            <Link 
            to={{ 
            pathname: "/users/cart",
            state: this.props.producto.id,
            }}
            >
              <img alt="carrito" src="/imagenes/carrito-de-compras.png"></img>
            </Link>
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
