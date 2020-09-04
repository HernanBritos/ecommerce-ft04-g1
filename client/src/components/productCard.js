import React from "react";
import pCard from "./css/productCard.module.css";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <Link to={"/product/" + this.props.producto.idProduct}>
        <div className={pCard.card}>
          <div className={pCard.image}>
            <img src={require(`${this.props.producto.img}`)}></img>
          </div>
          <div className={pCard.productData}>
            <span>{this.props.producto.name}</span>
            <span>{this.props.producto.category}</span>
            <span> {this.props.producto.rating} &#11088;</span>
            <span> $ {this.props.producto.price}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
