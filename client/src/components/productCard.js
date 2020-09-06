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
      <Link to={"/product/" + this.props.producto.id}>
        <div className={pCard.card}>
          <div className={pCard.image}>
            <img
              src={require(`${"./img/"+this.props.producto.img}`)}
              alt="productCardImage"
            ></img>
          </div>
          <div className={pCard.productData}>
            <span className={pCard.name}>{this.props.producto.name}</span>
            <span className={pCard.category}>
              {this.props.producto.category}
            </span>
            <span className={pCard.price}> $ {this.props.producto.price}</span>
            <span className={pCard.stock}>
              {this.props.producto.stock}
              <span className={pCard.stockIcon} role="img">
                &#9921;
              </span>
            </span>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
