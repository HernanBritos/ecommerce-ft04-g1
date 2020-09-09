import React from "react";
import pComp from "./css/productComponent.module.css";
// import { Link } from "react-router-dom";
import axios from "axios";
var placeholder = require('./img/Placeholder.png');
class ProductComponent extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.state = { producto: {} };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:3001/products/${this.props.producto}`)
      .then((data) => {
        this.setState({ producto: data.data });
      });
  }

  render() {
    if (this.props.producto) {
      return (
        <div className={pComp.card}>
          <div className={pComp.image}>
            {console.log(this.state.producto)}
            {/* <img className="imagen" id='imagen' src='' alt="productCardImage"></img> */}
            {this.props.img.includes("jpg") ? (
              <img
                src={require(`${"./img/" + this.props.img}`)}
                alt="productCardImage"
              ></img>
            ) : (
              <img src={require(`${placeholder}`)} alt="productCardImage"></img>
            )}
          </div> 
          <div className={pComp.productData}>
            <span className={pComp.name}>{this.state.producto.name}</span>
            <span className={pComp.description}>
              {this.state.producto.description}
            </span>
            <span className={pComp.price}> $ {this.state.producto.price}</span>
            <span className={pComp.stock}>
              {this.state.producto.stock}
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
}
export default ProductComponent;
