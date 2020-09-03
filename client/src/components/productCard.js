import React from "react";
import "./productCard.css";
import { Link } from "react-router-dom";

class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    return (
      <Link to={"/product/" + this.props.producto._id}>
        <div className="card">
          <div className="image">
            <img src={require(`${this.props.producto.image}`)}></img>
          </div>
          <div className="productData">
            <span>{this.props.producto.name}</span>
            <span>{this.props.producto.categoria}</span>
            <span> {this.props.producto.rating} &#11088;</span>
            <span> $ {this.props.producto.price}</span>
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
