import React from "react";
import pCard from "./css/productCard.module.css";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component"
import AgregarReview from "../container/agregarreview";
var placeholder = "/imagenes/Placeholder.png";


class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }


  render() {
    console.log(this.props.producto.id)
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
            <ReactStars count={5} edit={false} size={15} />
            <Link
                  to={{
                    pathname:
                    "/products/" + this.props.producto.id + "/review",
                  }}
                >
             <div className="AgregarReview"><AgregarReview id={this.props.producto.id} /> </div>
             {/* <button type="button" className="btn btn-primary"  value="Agregar Review">Agregar Review</button> */}
            
            </Link>
            <span className={pCard.price}> $ {this.props.producto.price}</span>
              {this.props.producto.stock !== 0 ? (
              <span className={pCard.carrito}>
                <Link
                  to={{
                    pathname:
                      "/users/cart/" + this.props.producto.id + "?qty=" + 1,
                    state: this.props.producto.id,
                  }}
                >
                 <img
                    alt="carrito"
                    src="/imagenes/carrito-de-compras.png"
                  ></img>
                </Link>
              </span>
            ) : (
              <div className="alert-danger"> Sin Stock!</div>
            )}
          </div>
        </div>
      </Link>
    );
  }
}

export default ProductCard;
